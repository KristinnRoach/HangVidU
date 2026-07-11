type SpinnerProps = {
  size?: number;
};

const DEFAULT_SIZE = 64;

export function Spinner(props: SpinnerProps) {
  return (
    <svg
      class='spinner'
      width={props.size ?? DEFAULT_SIZE}
      height={props.size ?? DEFAULT_SIZE}
      viewBox='0 0 50 50'
      role='status'
      aria-label='Loading'
    >
      <circle
        cx='25'
        cy='25'
        r='20'
        fill='none'
        stroke='currentColor'
        stroke-width='4'
        stroke-linecap='round'
        stroke-dasharray='80 40'
      />
    </svg>
  );
}
