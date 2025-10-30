// ============================================================================
// FAILED attempts and drafts for SAVED ROOM FUNCTIONALITY
// ============================================================================

// async function joinSavedRoom(savedRoomId) {
//   devDebug('joining saved room, id: ', savedRoomId);

//   roomId = savedRoomId;
//   updateStatus('Connecting to saved room...');

//   const success = await answerCall();
//   if (!success) {
//     updateStatus('Failed to connect to saved room');
//     roomId = null;
//   }
// }

// /**
//  * REJOIN WITH DIAGNOSTIC LOGS
//  *
//  * Strategic logging to identify:
//  * 1. Which step fails
//  * 2. Whether SDP exchange completes
//  * 3. Whether ICE candidates flow
//  * 4. Whether remote tracks arrive
//  * 5. Whether connection state progresses
//  */

// async function rejoinSavedRoom(savedRoomId) {
//   devDebug('=== REJOIN START ===');
//   roomId = savedRoomId;
//   updateStatus('Connecting to saved room...');

//   const localStream = getLocalStream();
//   if (!localStream) {
//     updateStatus('Error: Camera not initialized');
//     devDebug('❌ REJOIN FAIL: No local stream');
//     return false;
//   }
//   devDebug('✓ Local stream available');

//   // Clear stale data AND ICE candidates
//   try {
//     await update(ref(rtdb, `rooms/${roomId}`), {
//       offer: null,
//       answer: null,
//       offerCandidates: null, // ← CRITICAL: Clear old ICE
//       answerCandidates: null, // ← CRITICAL: Clear old ICE
//     });
//     devDebug('✓ Cleared stale offer/answer/ICE candidates');
//   } catch (err) {
//     console.warn('Could not clear stale data:', err);
//     devDebug('⚠ Could not clear stale data');
//   }

//   // Register in members
//   const membersRef = ref(rtdb, `rooms/${roomId}/members`);
//   const myMemberRef = ref(rtdb, `rooms/${roomId}/members/${peerId}`);

//   try {
//     await set(myMemberRef, { joinedAt: Date.now() });
//     devDebug('✓ Registered in members');
//   } catch (err) {
//     console.error('Failed to register member:', err);
//     devDebug('❌ REJOIN FAIL: Could not register member');
//     return false;
//   }

//   await new Promise((r) => setTimeout(r, 600));

//   // Determine role
//   let members = {};
//   try {
//     const snap = await get(membersRef);
//     if (snap.exists()) members = snap.val();
//   } catch (err) {
//     console.error('Failed to get members:', err);
//     devDebug('❌ REJOIN FAIL: Could not fetch members');
//     return false;
//   }

//   const memberIds = Object.keys(members);
//   const sortedByTime = memberIds.sort(
//     (a, b) => members[a].joinedAt - members[b].joinedAt
//   );
//   const isInitiator = sortedByTime[0] === peerId;
//   const myRole = isInitiator ? 'initiator' : 'joiner';

//   devDebug(`✓ Determined role: ${myRole} (Members: ${memberIds.join(', ')})`);

//   // Create PC
//   pc = new RTCPeerConnection(rtcConfig);
//   devDebug('✓ Created new RTCPeerConnection');

//   // Add local tracks
//   localStream.getTracks().forEach((track) => {
//     pc.addTrack(track, localStream);
//     devDebug(`  ✓ Added local track: ${track.kind}`);
//   });

//   // Setup remote stream (pc.ontrack handler)
//   if (!setupRemoteStream(pc, remoteVideoEl, mutePartnerBtn)) {
//     updateStatus('Error setting up remote stream');
//     devDebug('❌ REJOIN FAIL: setupRemoteStream failed');
//     return false;
//   }
//   devDebug('✓ Remote stream handler attached (pc.ontrack)');

//   // Setup ICE candidates
//   setupIceCandidates(pc, myRole, roomId);
//   devDebug(`✓ ICE candidates setup (role: ${myRole})`);

//   // Setup connection state monitoring
//   pc.onconnectionstatechange = () => {
//     devDebug(`  → Connection state: ${pc.connectionState}`);
//   };
//   setupConnectionStateHandlers(pc);
//   devDebug('✓ Connection state handler attached');

//   // Track SDP state changes
//   pc.onsignalingstatechange = () => {
//     devDebug(`  → Signaling state: ${pc.signalingState}`);
//   };

//   // ===== SDP EXCHANGE =====
//   if (isInitiator) {
//     devDebug('=== INITIATOR: Creating offer ===');
//     try {
//       const offer = await pc.createOffer();
//       devDebug('✓ Offer created');

//       await pc.setLocalDescription(offer);
//       devDebug(
//         `✓ Local description set (signaling state: ${pc.signalingState})`
//       );

//       const roomRef = ref(rtdb, `rooms/${roomId}`);
//       await update(roomRef, {
//         offer: { type: offer.type, sdp: offer.sdp },
//       });
//       devDebug('✓ Offer saved to Firebase');

//       // Listen for answer
//       const answerRef = ref(rtdb, `rooms/${roomId}/answer`);
//       let answerProcessed = false;

//       const answerCallback = async (snapshot) => {
//         const answer = snapshot.val();

//         if (answer && answer.sdp !== lastAnswerSdp) {
//           if (!answerProcessed) {
//             answerProcessed = true;
//             devDebug('=== INITIATOR: Answer received ===');
//             devDebug(
//               `  → Signaling state before remote desc: ${pc.signalingState}`
//             );
//           }

//           lastAnswerSdp = answer.sdp;

//           if (
//             pc.signalingState !== 'have-local-offer' &&
//             pc.signalingState !== 'stable'
//           ) {
//             devDebug(
//               `  ⚠ Wrong signaling state: ${pc.signalingState}, ignoring`
//             );
//             return;
//           }

//           try {
//             await pc.setRemoteDescription(new RTCSessionDescription(answer));
//             devDebug(`✓ Remote description set (answer)`);
//             devDebug(
//               `  → Signaling state after remote desc: ${pc.signalingState}`
//             );
//           } catch (error) {
//             devDebug(`❌ Failed to set remote description: ${error.message}`);
//             console.error('Failed to set remote description:', error);
//           }
//         }
//       };

//       onValue(answerRef, answerCallback);
//       trackFirebaseListener(answerRef, 'value', answerCallback);
//       devDebug('✓ Listening for answer from joiner');
//     } catch (err) {
//       devDebug(`❌ INITIATOR FAIL: ${err.message}`);
//       console.error('Failed to create offer:', err);
//       return false;
//     }
//   } else {
//     devDebug('=== JOINER: Waiting for offer ===');
//     try {
//       let offerReceived = false;
//       const offerRef = ref(rtdb, `rooms/${roomId}/offer`);

//       const offerCallback = async (snapshot) => {
//         const offer = snapshot.val();

//         if (offer && !offerReceived) {
//           offerReceived = true;
//           devDebug('=== JOINER: Offer received ===');
//           off(offerRef);

//           try {
//             devDebug(
//               `  → Signaling state before remote desc: ${pc.signalingState}`
//             );
//             await pc.setRemoteDescription(new RTCSessionDescription(offer));
//             devDebug(`✓ Remote description set (offer)`);
//             devDebug(
//               `  → Signaling state after remote desc: ${pc.signalingState}`
//             );

//             const answer = await pc.createAnswer();
//             devDebug('✓ Answer created');

//             await pc.setLocalDescription(answer);
//             devDebug(
//               `✓ Local description set (signaling state: ${pc.signalingState})`
//             );

//             const roomRef = ref(rtdb, `rooms/${roomId}`);
//             await update(roomRef, {
//               answer: { type: answer.type, sdp: answer.sdp },
//             });
//             devDebug('✓ Answer saved to Firebase');
//           } catch (err) {
//             devDebug(`❌ JOINER FAIL during answer: ${err.message}`);
//             console.error('Failed to handle offer:', err);
//           }
//         }
//       };

//       onValue(offerRef, offerCallback);
//       trackFirebaseListener(offerRef, 'value', offerCallback);
//       devDebug('✓ Listening for offer from initiator');

//       // Safety timeout
//       setTimeout(() => {
//         if (!offerReceived) {
//           off(offerRef);
//           updateStatus('Error: No offer received from partner');
//           devDebug('❌ JOINER TIMEOUT: No offer after 10 seconds');
//         }
//       }, 10000);
//     } catch (err) {
//       devDebug(`❌ JOINER SETUP FAIL: ${err.message}`);
//       console.error('Failed to setup offer listener:', err);
//       return false;
//     }
//   }

//   // Data channel setup
//   if (isInitiator) {
//     setupDataChannel();
//     devDebug('✓ Data channel created (initiator)');
//   } else {
//     pc.ondatachannel = (event) => {
//       devDebug('✓ Data channel received (joiner)');
//       dataChannel = event.channel;
//       messagesUI = initMessagesUI((msg) => dataChannel.send(msg));

//       dataChannel.onopen = () => {
//         messagesUI.showMessagesToggle();
//         messagesUI.appendChatMessage('💬 Chat reconnected');
//       };
//       dataChannel.onmessage = (e) => messagesUI.receiveMessage(e.data);
//     };
//   }

//   role = myRole;
//   setupWatchSync(roomId, role, peerId);
//   setupRoomMembers();

//   localStorage.setItem('lastRoomId', roomId);
//   updateStatus('Reconnected! Waiting for video...');
//   devDebug('=== REJOIN COMPLETE - Waiting for ICE and remote tracks ===');

//   return true;
// }

/**
 * ADD THIS TO stream.js setupRemoteStream() to log when tracks arrive:
 *
 * export function setupRemoteStream(pc, remoteVideoEl, mutePartnerBtn) {
 *   pc.ontrack = (event) => {
 *     devDebug(`🎬 REMOTE TRACK RECEIVED: ${event.track.kind}`);
 *     // ... rest of code
 * }
 */

/**
 * ADD THIS TO ice.js setupLocalCandidateSender() to log ICE:
 *
 * function setupLocalCandidateSender(pc, path, roomId) {
 *   pc.onicecandidate = (event) => {
 *     if (event.candidate) {
 *       devDebug(`❄ Local ICE candidate: ${path}`);
 *       // ... rest of code
 *     } else {
 *       devDebug(`❄ ICE gathering complete for ${path}`);
 *     }
 *   };
 * }
 *
 * ADD THIS TO ice.js setupRemoteCandidateListener():
 *
 * function setupRemoteCandidateListener(pc, path, roomId) {
 *   const remoteCandidatesRef = ref(rtdb, `rooms/${roomId}/${path}`);
 *   const callback = (snapshot) => {
 *     devDebug(`❄ Remote ICE candidate added: ${path}`);
 *     const candidate = snapshot.val();
 *     if (candidate && pc.remoteDescription) {
 *       pc.addIceCandidate(...)
 *     }
 *   };
 * }
 */
