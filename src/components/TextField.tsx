import { TextField as KTextField } from '@kobalte/core/text-field';
import { splitProps, type JSX } from 'solid-js';

type InputAttributes = Pick<
  JSX.InputHTMLAttributes<HTMLInputElement>,
  | 'type'
  | 'name'
  | 'placeholder'
  | 'autocomplete'
  | 'autocapitalize'
  | 'onKeyDown'
>;

type TextFieldProps = InputAttributes & {
  class?: string;
  disabled?: boolean;
  required?: boolean;
  label: string;
  /** Visually hide the label; it still names the input for assistive tech. */
  hideLabel?: boolean;
  value: string;
  onChange: (value: string) => void;
  /** Shown below the input and marks it invalid when set. */
  error?: string;
};

export default function TextField(props: TextFieldProps) {
  const [local, input] = splitProps(props, [
    'label',
    'hideLabel',
    'value',
    'onChange',
    'error',
    'class',
    'disabled',
    'required',
  ]);

  return (
    <KTextField
      class={`flex min-w-0 flex-col gap-1 ${local.class ?? ''}`}
      value={local.value}
      onChange={local.onChange}
      validationState={local.error ? 'invalid' : 'valid'}
      disabled={local.disabled}
      required={local.required}
    >
      <KTextField.Label
        class={local.hideLabel ? 'sr-only' : 'text-sm text-text-secondary'}
      >
        {local.label}
      </KTextField.Label>
      <KTextField.Input
        {...input}
        class='min-w-0 w-full rounded-md border border-border-primary bg-transparent px-2.5 py-1.5 text-sm text-inherit focus-visible:border-primary focus-visible:outline-none data-invalid:border-danger'
      />
      <KTextField.ErrorMessage role='alert' class='text-sm text-danger'>
        {local.error}
      </KTextField.ErrorMessage>
    </KTextField>
  );
}
