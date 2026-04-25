import ChatControls from './ChatControls.jsx';
import { useMediaControls } from './useMediaControls.js';
import {
  exitWatchModeCommand,
  hangUpCommand,
  startCallCommand,
} from '../../features/call/call-ui-commands.js';

export default function ChatControlsContainer() {
  const mediaControls = useMediaControls();

  return (
    <ChatControls
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

