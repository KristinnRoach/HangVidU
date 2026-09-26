type SpinnerProps = {
  size?: string; // any CSS length; defaults to 1.5em so it scales with surrounding text
  label?: string;
};

/**
 * Spinner provides a visual cue that an action is being processed.
 */
export function Spinner(props: SpinnerProps) {
  const size = () => props.size ?? '1.5em';
  return (
    <div
      class='animate-spin rounded-full border-t-current border-r-transparent'
      style={{
        width: size(),
        height: size(),
        'border-width': `calc(${size()} / 10)`,
      }}
      role='status'
      aria-label={props.label || 'Loading'}
    />
  );
}
