import { onCleanup, type Accessor } from 'solid-js';
import { onFileDrop } from './onFileDrop.js';

export type FileDropHandler = (files: File[]) => void;

export type FileDropDirectiveOptions = {
  accept?: string;
  onDrop: FileDropHandler;
};

export type FileDropDirectiveValue = FileDropHandler | FileDropDirectiveOptions;

/**
 * Solid directive wrapper for onFileDrop().
 *
 * Usage:
 * <div use:fileDrop={{ accept: 'image/*', onDrop: (files) => handleFile(files[0]) }} />
 *
 * For simple cases without options:
 * <div use:fileDrop={(files) => handleFiles(files)} />
 */
export function fileDrop(
  element: HTMLElement,
  value: Accessor<FileDropDirectiveValue>,
) {
  const initialOptions = normalizeFileDropValue(value());
  const cleanup = onFileDrop(
    element,
    (files) => normalizeFileDropValue(value()).onDrop(files),
    { accept: initialOptions.accept },
  );

  onCleanup(cleanup);
}

function normalizeFileDropValue(
  value: FileDropDirectiveValue,
): FileDropDirectiveOptions {
  return typeof value === 'function' ? { onDrop: value } : value;
}

declare module 'solid-js' {
  namespace JSX {
    interface DirectiveFunctions {
      fileDrop: typeof fileDrop;
    }
  }
}
