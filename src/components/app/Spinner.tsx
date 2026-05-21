type SpinnerProps = {
  size?: number;
};

export function Spinner(props: SpinnerProps) {
  return (
    <svg
      width={props.size ?? 32}
      height={props.size ?? 32}
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
      >
        <animateTransform
          attributeName='transform'
          type='rotate'
          from='0 25 25'
          to='360 25 25'
          dur='1s'
          repeatCount='indefinite'
        />
      </circle>
    </svg>
  );
}
