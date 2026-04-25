import { createSignal, onCleanup, onMount } from 'solid-js';
import CallController from '../../features/call/call-controller.js';

export function useCallControls() {
  const [isInCall, setIsInCall] = createSignal(false);

  const syncCallState = () => {
    setIsInCall(CallController.isInCall());
  };

  onMount(() => {
    syncCallState();

    const offCallCreated = CallController.on(
      'evt:call:session:created',
      syncCallState,
    );
    const offCallAnswered = CallController.on(
      'evt:call:session:answered',
      syncCallState,
    );
    const offParticipantJoined = CallController.on(
      'evt:call:participant:joined',
      syncCallState,
    );
    const offCallFailed = CallController.on('evt:call:session:failed', () => {
      setIsInCall(false);
    });
    const offCallCleanup = CallController.on('evt:call:session:cleanup', () => {
      setIsInCall(false);
    });

    onCleanup(() => {
      offCallCreated();
      offCallAnswered();
      offParticipantJoined();
      offCallFailed();
      offCallCleanup();
    });
  });

  return {
    state: {
      isInCall,
    },
  };
}
