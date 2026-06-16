import { createEffect, onCleanup, type Accessor } from 'solid-js';
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
  // Re-bind listeners when `accept` changes so filtering stays reactive. The
  // effect tracks `value()`, so it also re-binds if the whole directive value
  // is swapped — but `onDrop` is read fresh on each drop (below), so handler
  // changes don't churn listeners; only `accept` does in practice.
  createEffect(() => {
    const { accept } = normalizeFileDropValue(value());
    const cleanup = onFileDrop(
      element,
      (files) => normalizeFileDropValue(value()).onDrop(files),
      { accept },
    );

    onCleanup(cleanup);
  });
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
