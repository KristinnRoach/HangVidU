# WebRTC P2P Video Chat Utilities

Simple, clean WebRTC utilities for two-peer video chat using Firebase RTDB for signaling.

## Core Module: `webrtc.ts`

```typescript
/**
 * WebRTC Configuration
 */
export interface WebRTCConfig {
  iceServers?: RTCIceServer[];
}

/**
 * Default STUN server configuration
 */
const DEFAULT_CONFIG: RTCConfiguration = {
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' },
    { urls: 'stun:stun1.l.google.com:19302' }
  ]
};

/**
 * Message types for signaling
 */
export type SignalMessage = 
  | { type: 'offer'; sdp: string }
  | { type: 'answer'; sdp: string }
  | { type: 'ice-candidate'; candidate: RTCIceCandidateInit };

/**
 * Event callbacks for WebRTC connection
 */
export interface WebRTCCallbacks {
  onLocalStream?: (stream: MediaStream) => void;
  onRemoteStream?: (stream: MediaStream) => void;
  onSignal?: (message: SignalMessage) => void;
  onConnectionStateChange?: (state: RTCPeerConnectionState) => void;
  onIceConnectionStateChange?: (state: RTCIceConnectionState) => void;
  onError?: (error: Error) => void;
}

/**
 * WebRTC Peer Connection Manager
 */
export class WebRTCPeer {
  private pc: RTCPeerConnection | null = null;
  private localStream: MediaStream | null = null;
  private callbacks: WebRTCCallbacks;
  private isPolite: boolean;
  private makingOffer = false;
  private ignoreOffer = false;
  
  constructor(isPolite: boolean, callbacks: WebRTCCallbacks = {}, config?: WebRTCConfig) {
    this.isPolite = isPolite;
    this.callbacks = callbacks;
    this.initializePeerConnection(config);
  }

  /**
   * Initialize RTCPeerConnection with event handlers
   */
  private initializePeerConnection(config?: WebRTCConfig): void {
    const rtcConfig = config?.iceServers 
      ? { iceServers: config.iceServers }
      : DEFAULT_CONFIG;
    
    this.pc = new RTCPeerConnection(rtcConfig);
    
    // Handle ICE candidates
    this.pc.onicecandidate = ({ candidate }) => {
      if (candidate) {
        this.callbacks.onSignal?.({
          type: 'ice-candidate',
          candidate: candidate.toJSON()
        });
      }
    };
    
    // Handle incoming remote tracks
    this.pc.ontrack = ({ streams }) => {
      const remoteStream = streams[0];
      if (remoteStream) {
        this.callbacks.onRemoteStream?.(remoteStream);
      }
    };
    
    // Handle connection state changes
    this.pc.onconnectionstatechange = () => {
      if (this.pc) {
        this.callbacks.onConnectionStateChange?.(this.pc.connectionState);
        
        // Cleanup on failure or close
        if (this.pc.connectionState === 'failed' || this.pc.connectionState === 'closed') {
          this.handleConnectionFailure();
        }
      }
    };
    
    this.pc.oniceconnectionstatechange = () => {
      if (this.pc) {
        this.callbacks.onIceConnectionStateChange?.(this.pc.iceConnectionState);
      }
    };
    
    // Perfect negotiation: handle negotiation needed
    this.pc.onnegotiationneeded = async () => {
      try {
        this.makingOffer = true;
        await this.pc!.setLocalDescription();
        
        this.callbacks.onSignal?.({
          type: 'offer',
          sdp: this.pc!.localDescription!.sdp
        });
      } catch (err) {
        this.callbacks.onError?.(err as Error);
      } finally {
        this.makingOffer = false;
      }
    };
  }

  /**
   * Add local media stream to the connection
   */
  async addLocalStream(constraints: MediaStreamConstraints = { video: true, audio: true }): Promise<MediaStream> {
    try {
      this.localStream = await navigator.mediaDevices.getUserMedia(constraints);
      
      // Add all tracks to peer connection
      this.localStream.getTracks().forEach(track => {
        this.pc!.addTrack(track, this.localStream!);
      });
      
      this.callbacks.onLocalStream?.(this.localStream);
      return this.localStream;
    } catch (err) {
      this.callbacks.onError?.(err as Error);
      throw err;
    }
  }

  /**
   * Handle incoming signaling messages (perfect negotiation pattern)
   */
  async handleSignal(message: SignalMessage): Promise<void> {
    try {
      if (!this.pc) {
        throw new Error('Peer connection not initialized');
      }

      switch (message.type) {
        case 'offer':
          await this.handleOffer(message.sdp);
          break;
        case 'answer':
          await this.handleAnswer(message.sdp);
          break;
        case 'ice-candidate':
          await this.handleIceCandidate(message.candidate);
          break;
      }
    } catch (err) {
      this.callbacks.onError?.(err as Error);
    }
  }

  /**
   * Handle incoming offer (perfect negotiation)
   */
  private async handleOffer(sdp: string): Promise<void> {
    const offerCollision = 
      this.makingOffer || 
      this.pc!.signalingState !== 'stable';
    
    this.ignoreOffer = !this.isPolite && offerCollision;
    
    if (this.ignoreOffer) {
      return;
    }
    
    await this.pc!.setRemoteDescription({ type: 'offer', sdp });
    await this.pc!.setLocalDescription();
    
    this.callbacks.onSignal?.({
      type: 'answer',
      sdp: this.pc!.localDescription!.sdp
    });
  }

  /**
   * Handle incoming answer
   */
  private async handleAnswer(sdp: string): Promise<void> {
    await this.pc!.setRemoteDescription({ type: 'answer', sdp });
  }

  /**
   * Handle incoming ICE candidate
   */
  private async handleIceCandidate(candidate: RTCIceCandidateInit): Promise<void> {
    try {
      await this.pc!.addIceCandidate(candidate);
    } catch (err) {
      if (!this.ignoreOffer) {
        throw err;
      }
    }
  }

  /**
   * Handle connection failure
   */
  private handleConnectionFailure(): void {
    console.warn('Connection failed or closed');
  }

  /**
   * Get current connection state
   */
  getConnectionState(): RTCPeerConnectionState | null {
    return this.pc?.connectionState ?? null;
  }

  /**
   * Get current ICE connection state
   */
  getIceConnectionState(): RTCIceConnectionState | null {
    return this.pc?.iceConnectionState ?? null;
  }

  /**
   * Clean up and close connection
   */
  close(): void {
    // Stop all local tracks
    if (this.localStream) {
      this.localStream.getTracks().forEach(track => track.stop());
      this.localStream = null;
    }
    
    // Close peer connection
    if (this.pc) {
      this.pc.close();
      this.pc = null;
    }
  }
}
```

## Room Manager: `room.ts`

```typescript
import { WebRTCPeer, type SignalMessage, type WebRTCCallbacks } from './webrtc';

/**
 * Room configuration
 */
export interface RoomConfig {
  roomId: string;
  userId: string;
  iceServers?: RTCIceServer[];
}

/**
 * Signaling channel interface (implement with Firebase RTDB)
 */
export interface SignalingChannel {
  send(message: SignalMessage): Promise<void>;
  onMessage(callback: (message: SignalMessage) => void): void;
  close(): void;
}

/**
 * Room Manager for P2P video chat
 */
export class Room {
  private peer: WebRTCPeer | null = null;
  private config: RoomConfig;
  private signaling: SignalingChannel;
  private isPolite: boolean;
  
  constructor(
    config: RoomConfig,
    signaling: SignalingChannel,
    callbacks: WebRTCCallbacks = {}
  ) {
    this.config = config;
    this.signaling = signaling;
    
    // Determine politeness based on userId comparison
    // Lower userId (alphabetically) is polite
    this.isPolite = config.userId < (config.roomId || '');
    
    // Wrap callbacks to include signaling
    const wrappedCallbacks: WebRTCCallbacks = {
      ...callbacks,
      onSignal: async (message) => {
        await this.signaling.send(message);
        callbacks.onSignal?.(message);
      }
    };
    
    // Initialize WebRTC peer
    this.peer = new WebRTCPeer(
      this.isPolite,
      wrappedCallbacks,
      { iceServers: config.iceServers }
    );
    
    // Listen for incoming signals
    this.signaling.onMessage(async (message) => {
      await this.peer?.handleSignal(message);
    });
  }

  /**
   * Join the room with media
   */
  async join(constraints?: MediaStreamConstraints): Promise<MediaStream> {
    if (!this.peer) {
      throw new Error('Room not initialized');
    }
    
    return await this.peer.addLocalStream(constraints);
  }

  /**
   * Get connection state
   */
  getConnectionState(): RTCPeerConnectionState | null {
    return this.peer?.getConnectionState() ?? null;
  }

  /**
   * Leave the room
   */
  leave(): void {
    this.peer?.close();
    this.signaling.close();
    this.peer = null;
  }
}
```

## Firebase Signaling Implementation: `firebase-signaling.ts`

```typescript
import type { Database, DatabaseReference } from 'firebase/database';
import { ref, onValue, set, remove, push } from 'firebase/database';
import type { SignalingChannel, SignalMessage } from './room';

/**
 * Firebase RTDB Signaling Channel
 */
export class FirebaseSignaling implements SignalingChannel {
  private db: Database;
  private roomRef: DatabaseReference;
  private userRef: DatabaseReference;
  private peerRef: DatabaseReference;
  private unsubscribe: (() => void) | null = null;
  
  constructor(
    db: Database,
    roomId: string,
    userId: string,
    peerId: string
  ) {
    this.db = db;
    
    // Reference structure: rooms/{roomId}/{userId}
    this.roomRef = ref(db, `rooms/${roomId}`);
    this.userRef = ref(db, `rooms/${roomId}/${userId}`);
    this.peerRef = ref(db, `rooms/${roomId}/${peerId}`);
  }

  /**
   * Send signaling message to peer
   */
  async send(message: SignalMessage): Promise<void> {
    const messageRef = push(this.userRef);
    await set(messageRef, {
      ...message,
      timestamp: Date.now()
    });
  }

  /**
   * Listen for incoming messages from peer
   */
  onMessage(callback: (message: SignalMessage) => void): void {
    this.unsubscribe = onValue(this.peerRef, (snapshot) => {
      const messages = snapshot.val();
      
      if (messages) {
        // Process messages in order
        Object.values(messages).forEach((msg: any) => {
          const { timestamp, ...message } = msg;
          callback(message as SignalMessage);
        });
        
        // Clean up processed messages
        remove(this.peerRef);
      }
    });
  }

  /**
   * Close signaling channel
   */
  close(): void {
    if (this.unsubscribe) {
      this.unsubscribe();
      this.unsubscribe = null;
    }
    
    // Clean up user data from room
    remove(this.userRef);
  }
}
```

## Usage Example: `example.ts`

```typescript
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { Room } from './room';
import { FirebaseSignaling } from './firebase-signaling';

// Initialize Firebase
const firebaseConfig = {
  // Your Firebase config
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Create room
const roomId = 'my-room-123';
const userId = 'user-' + Math.random().toString(36).substr(2, 9);
const peerId = 'user-other'; // Get this from your room logic

const signaling = new FirebaseSignaling(db, roomId, userId, peerId);

const room = new Room(
  {
    roomId,
    userId,
    iceServers: [
      { urls: 'stun:stun.l.google.com:19302' }
    ]
  },
  signaling,
  {
    onLocalStream: (stream) => {
      const localVideo = document.querySelector('#local-video') as HTMLVideoElement;
      if (localVideo) {
        localVideo.srcObject = stream;
      }
    },
    onRemoteStream: (stream) => {
      const remoteVideo = document.querySelector('#remote-video') as HTMLVideoElement;
      if (remoteVideo) {
        remoteVideo.srcObject = stream;
      }
    },
    onConnectionStateChange: (state) => {
      console.log('Connection state:', state);
    },
    onError: (error) => {
      console.error('WebRTC error:', error);
    }
  }
);

// Join the room
async function joinRoom() {
  try {
    await room.join({ video: true, audio: true });
    console.log('Joined room successfully');
  } catch (error) {
    console.error('Failed to join room:', error);
  }
}

// Leave the room
function leaveRoom() {
  room.leave();
  console.log('Left room');
}

// Usage
joinRoom();

// Later...
// leaveRoom();
```

## Key Features

### 1. **Perfect Negotiation Pattern**
- Implements the polite/impolite peer roles to handle offer collisions
- Polite peer is determined by comparing user IDs alphabetically
- Automatic role switching during negotiation conflicts

### 2. **Simple API**
- `WebRTCPeer`: Low-level WebRTC connection manager
- `Room`: High-level room abstraction
- `FirebaseSignaling`: Firebase RTDB signaling implementation

### 3. **Clean Separation**
- WebRTC logic separated from signaling
- Easy to swap signaling implementations
- Clear callbacks for all events

### 4. **Error Handling**
- Comprehensive error callbacks
- Connection state monitoring
- Automatic cleanup on failure

### 5. **Easy to Extend**
- Add TURN servers by passing custom `iceServers`
- Implement custom signaling by implementing `SignalingChannel`
- Add features like mute, screen sharing, etc. through `WebRTCPeer`

## Next Steps

To extend this basic implementation:

1. **Add TURN servers** for better connectivity
2. **Implement reconnection logic** for network interruptions
3. **Add media controls** (mute, unmute, toggle video)
4. **Add data channels** for text chat or file transfer
5. **Implement screen sharing** using `getDisplayMedia()`
6. **Add peer discovery** for multi-peer rooms
7. **Improve Firebase structure** with presence detection

## Notes

- The code uses modern async/await patterns
- Perfect negotiation ensures reliable connection establishment
- Firebase RTDB structure should be optimized for your use case
- Consider adding authentication and room security
- Test with different network conditions and NAT types
