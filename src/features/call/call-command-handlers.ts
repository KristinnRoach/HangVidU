import { handleCommand } from '../../shared/events/index.js';

export type InitiateCallCommandDetails = {
  calleeId: string;
  calleeName: string;
  audioOnly: boolean;
};

type RegisterCallCommandHandlersOptions = {
  signal: AbortSignal;
  startOutgoingCall: (details: InitiateCallCommandDetails) => Promise<void>;
  exitActiveRoom: () => void;
};

export function registerCallCommandHandlers({
  signal,
  startOutgoingCall,
  exitActiveRoom,
}: RegisterCallCommandHandlersOptions) {
  handleCommand('cmd:room:initiate:call', startOutgoingCall, { signal });

  handleCommand(
    'cmd:room:exit:call',
    () => {
      exitActiveRoom();
    },
    { signal },
  );
}
