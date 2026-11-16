import { createEffect, type JSX } from 'solid-js';

type Props = {
  checked: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  onChange: (checked: boolean) => void;
  children: JSX.Element;
};

export default function Checkbox(props: Props) {
  let input!: HTMLInputElement;
  createEffect(() => {
    input.indeterminate = props.indeterminate ?? false;
  });
  return (
    <label class='flex min-w-0 items-center gap-2 text-sm text-text-primary'>
      <input
        ref={input}
        type='checkbox'
        class='size-4 shrink-0 cursor-pointer accent-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-50'
        checked={props.checked}
        disabled={props.disabled}
        onChange={(event) => props.onChange(event.currentTarget.checked)}
      />
      {props.children}
    </label>
  );
}
