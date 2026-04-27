import CallController from './call-controller.js';
import { handleCommand } from '../../shared/events/index.js';

function setupCallCommandHandlers() {
  handleCommand('cmd:call:active:hangup', async () => {
    return await CallController.hangUp({
      emitCancel: true,
      reason: 'user_hung_up',
    });
  });
}

export default setupCallCommandHandlers;
