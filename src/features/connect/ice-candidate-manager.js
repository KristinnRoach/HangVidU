// src/features/connect/ice-candidate-manager.js - Robust ICE candidate handling

/**
 * Manages ICE candidate queuing and processing for reliable WebRTC connections
 */
export class IceCandidateManager {
  constructor(peerConnection, roomRef, role) {
    this.peerConnection = peerConnection;
    this.roomRef = roomRef;
    this.role = role; // 'caller' or 'callee'

    // Queue for candidates received before remote description is set
    this.pendingCandidates = [];

    // Track state
    this.state = {
      remoteDescriptionSet: false,
      localCandidatesCount: 0,
      remoteCandidatesCount: 0,
      pendingCandidatesCount: 0,
      iceGatheringComplete: false,
    };

    this.setupICEHandling();
  }

  /**
   * Set up ICE candidate handling
   */
  setupICEHandling() {
    // Handle local ICE candidates
    this.peerConnection.onicecandidate = (event) => {
      this.handleLocalCandidate(event);
    };

    // Monitor ICE gathering state
    this.peerConnection.onicegatheringstatechange = () => {
      const state = this.peerConnection.iceGatheringState;

      if (import.meta.env.DEV) {
        console.log(`ICE gathering state (${this.role}):`, state);
      }

      if (state === 'complete') {
        this.state.iceGatheringComplete = true;
        this.onICEGatheringComplete?.();
      }
    };

    // Monitor ICE connection state
    this.peerConnection.oniceconnectionstatechange = () => {
      const state = this.peerConnection.iceConnectionState;

      if (import.meta.env.DEV) {
        console.log(`ICE connection state (${this.role}):`, state);
      }

      this.onICEConnectionStateChange?.(state);
    };

    // Listen for remote candidates
    this.listenForRemoteCandidates();
  }

  /**
   * Handle local ICE candidates
   */
  handleLocalCandidate(event) {
    if (event.candidate) {
      this.state.localCandidatesCount++;

      if (import.meta.env.DEV) {
        console.log(
          `Sending local ICE candidate (${this.role}):`,
          event.candidate.candidate
        );
      }

      // Send to Firebase
      const candidatesPath =
        this.role === 'caller' ? 'callerCandidates' : 'calleeCandidates';
      this.roomRef
        .child(candidatesPath)
        .push(event.candidate.toJSON())
        .catch((error) => {
          console.error('Failed to send ICE candidate to Firebase:', error);
        });
    } else {
      // null candidate indicates end of candidates
      if (import.meta.env.DEV) {
        console.log(`ICE candidate gathering complete (${this.role})`);
      }
    }
  }

  /**
   * Listen for remote ICE candidates
   */
  listenForRemoteCandidates() {
    const remoteCandidatesPath =
      this.role === 'caller' ? 'calleeCandidates' : 'callerCandidates';

    this.roomRef.child(remoteCandidatesPath).on('child_added', (snapshot) => {
      const candidateData = snapshot.val();

      if (!candidateData) return;

      try {
        const candidate = new RTCIceCandidate(candidateData);
        this.handleRemoteCandidate(candidate);
      } catch (error) {
        console.warn('Failed to create RTCIceCandidate:', error, candidateData);
      }
    });
  }

  /**
   * Handle remote ICE candidates
   */
  async handleRemoteCandidate(candidate) {
    this.state.remoteCandidatesCount++;

    if (import.meta.env.DEV) {
      console.log(
        `Received remote ICE candidate (${this.role}):`,
        candidate.candidate
      );
    }

    if (this.state.remoteDescriptionSet) {
      // Remote description is set, add candidate immediately
      try {
        await this.peerConnection.addIceCandidate(candidate);

        if (import.meta.env.DEV) {
          console.log(`Added remote ICE candidate (${this.role})`);
        }
      } catch (error) {
        console.warn('Failed to add ICE candidate:', error);
      }
    } else {
      // Queue candidate until remote description is set
      this.pendingCandidates.push(candidate);
      this.state.pendingCandidatesCount = this.pendingCandidates.length;

      if (import.meta.env.DEV) {
        console.log(
          `Queued ICE candidate (${this.role}). Queue size:`,
          this.pendingCandidates.length
        );
      }
    }
  }

  /**
   * Process queued candidates after remote description is set
   */
  async processQueuedCandidates() {
    if (!this.state.remoteDescriptionSet) {
      console.warn(
        'Cannot process queued candidates: remote description not set'
      );
      return;
    }

    if (this.pendingCandidates.length === 0) {
      if (import.meta.env.DEV) {
        console.log(`No queued candidates to process (${this.role})`);
      }
      return;
    }

    if (import.meta.env.DEV) {
      console.log(
        `Processing ${this.pendingCandidates.length} queued ICE candidates (${this.role})`
      );
    }

    const candidates = [...this.pendingCandidates];
    this.pendingCandidates.length = 0;
    this.state.pendingCandidatesCount = 0;

    for (const candidate of candidates) {
      try {
        await this.peerConnection.addIceCandidate(candidate);

        if (import.meta.env.DEV) {
          console.log(`Added queued ICE candidate (${this.role})`);
        }
      } catch (error) {
        console.warn('Failed to add queued ICE candidate:', error);
      }
    }

    if (import.meta.env.DEV) {
      console.log(`Finished processing queued ICE candidates (${this.role})`);
    }
  }

  /**
   * Notify that remote description has been set
   */
  async onRemoteDescriptionSet() {
    this.state.remoteDescriptionSet = true;

    if (import.meta.env.DEV) {
      console.log(
        `Remote description set (${this.role}). Processing queued candidates...`
      );
    }

    await this.processQueuedCandidates();
  }

  /**
   * Get current state for debugging
   */
  getState() {
    return {
      ...this.state,
      peerConnectionState: this.peerConnection.connectionState,
      iceConnectionState: this.peerConnection.iceConnectionState,
      iceGatheringState: this.peerConnection.iceGatheringState,
    };
  }

  /**
   * Clean up listeners and state
   */
  cleanup() {
    // Remove Firebase listeners
    const remoteCandidatesPath =
      this.role === 'caller' ? 'calleeCandidates' : 'callerCandidates';
    this.roomRef.child(remoteCandidatesPath).off();

    // Clear queued candidates
    this.pendingCandidates.length = 0;

    // Reset state
    this.state = {
      remoteDescriptionSet: false,
      localCandidatesCount: 0,
      remoteCandidatesCount: 0,
      pendingCandidatesCount: 0,
      iceGatheringComplete: false,
    };

    if (import.meta.env.DEV) {
      console.log(`ICE candidate manager cleaned up (${this.role})`);
    }
  }
}
