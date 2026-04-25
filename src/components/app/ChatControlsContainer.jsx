import ChatControls from './ChatControls.jsx';
import { useCallControls } from './useCallControls.js';
import { useMediaControls } from './useMediaControls.js';
import {
  exitWatchModeCommand,
  hangUpCommand,
  startCallCommand,
} from '../../features/call/call-ui-commands.js';

export default function ChatControlsContainer() {
  const callControls = useCallControls();
  const mediaControls = useMediaControls();

  return (
    <ChatControls
      callState={callControls.state}
      mediaState={mediaControls.state}
      onStartCall={startCallCommand}
      onExitWatchMode={exitWatchModeCommand}
      onHangUp={hangUpCommand}
      onToggleMic={mediaControls.actions.toggleMic}
      onToggleCamera={mediaControls.actions.toggleCamera}
      onSwitchCamera={mediaControls.actions.switchCamera}
      onToggleRemoteMute={mediaControls.actions.toggleRemoteMute}
      onFullscreenRemote={mediaControls.actions.fullscreenRemote}
    />
  );
}
