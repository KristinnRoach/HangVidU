import { dispatchCommand } from '../../shared/events/index.js';
import ChatControls from './ChatControls.jsx';
import { useCallControls } from './useCallControls.js';
import { useMediaControls } from './useMediaControls.js';

export default function ChatControlsContainer() {
  const callControls = useCallControls();
  const mediaControls = useMediaControls();

  const hangUpCommand = () => {
    dispatchCommand('cmd:call:active:hangup');
  };

  return (
    <ChatControls
      callState={callControls.state}
      mediaState={mediaControls.state}
      onHangUp={hangUpCommand}
      onToggleMic={mediaControls.actions.toggleMic}
      onToggleCamera={mediaControls.actions.toggleCamera}
      onSwitchCamera={mediaControls.actions.switchCamera}
      onToggleRemoteMute={mediaControls.actions.toggleRemoteMute}
      // TODO: Add remote PiP toggle here
      onFullscreenRemote={mediaControls.actions.fullscreenRemote}
    />
  );
}
