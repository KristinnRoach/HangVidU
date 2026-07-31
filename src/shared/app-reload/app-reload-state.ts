import { publish, subscribe } from '@shared/events/index.js';

type AppReloadState = {
  blockerCount: number;
};

let state: AppReloadState = { blockerCount: 0 };

function snapshot(): AppReloadState {
  return { ...state };
}

function setState(next: AppReloadState): void {
  const prev = snapshot();
  state = next;
  publish('evt:app-reload:state:changed', { state: snapshot(), prev });
}

export function getAppReloadAllowed(): boolean {
  return state.blockerCount === 0;
}

export function holdAppReload(): () => void {
  setState({ blockerCount: state.blockerCount + 1 });
  let released = false;

  return () => {
    if (released) return;
    released = true;
    setState({ blockerCount: state.blockerCount - 1 });
  };
}

export function whenAppReloadAllowed(): Promise<void> {
  if (getAppReloadAllowed()) return Promise.resolve();

  return new Promise((resolve) => {
    const unsubscribe = subscribe(
      'evt:app-reload:state:changed',
      ({ state: nextState }: { state: AppReloadState }) => {
        if (nextState.blockerCount !== 0) return;
        unsubscribe();
        resolve();
      },
    );
  });
}
