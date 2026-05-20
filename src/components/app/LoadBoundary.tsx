import { Match, Switch } from 'solid-js';
import type { JSX } from 'solid-js';

type LoadBoundaryProps = {
  loading: boolean;
  fallback: JSX.Element;
  error?: unknown;
  errorFallback?: JSX.Element | ((error: unknown) => JSX.Element);
  empty?: boolean;
  emptyFallback?: JSX.Element;
  children: JSX.Element;
};

export function LoadBoundary(props: LoadBoundaryProps) {
  return (
    <Switch>
      <Match when={props.loading}>{props.fallback}</Match>
      <Match when={props.error}>
        {typeof props.errorFallback === 'function'
          ? props.errorFallback(props.error)
          : props.errorFallback}
      </Match>
      <Match when={props.empty}>{props.emptyFallback}</Match>
      <Match when>{props.children}</Match>
    </Switch>
  );
}
