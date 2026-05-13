import { dispatchCommand } from '../../../shared/events';

const hangUpCommand = () => {
  dispatchCommand('cmd:room:exit:call');
};

export default function ActiveCallControls() {
  return (
    <div class='chat-controls'>
      <button onClick={hangUpCommand}>End Call</button>
    </div>
  );
}
