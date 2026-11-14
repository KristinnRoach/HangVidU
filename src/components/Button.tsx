import { Button as KButton } from '@kobalte/core/button';
import { splitProps, type ComponentProps } from 'solid-js';

const variants = {
  primary: 'bg-primary text-white hover:bg-primary-hover',
  secondary:
    'border border-border-primary bg-bg-secondary text-text-primary hover:bg-bg-brighter',
  ghost: 'text-text-secondary hover:bg-bg-brighter hover:text-text-primary',
  danger: 'bg-danger text-white hover:bg-danger-hover',
};

type ButtonProps = ComponentProps<'button'> & {
  variant?: keyof typeof variants;
  /** Disables the button and announces it as busy. */
  loading?: boolean;
};

export default function Button(props: ButtonProps) {
  const [local, rest] = splitProps(props, [
    'variant',
    'loading',
    'class',
    'disabled',
  ]);

  return (
    <KButton
      type='button'
      {...rest}
      disabled={local.disabled || local.loading}
      aria-busy={local.loading || undefined}
      class={`inline-flex items-center justify-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-50 ${variants[local.variant ?? 'secondary']} ${local.class ?? ''}`}
    />
  );
}
