import type { JSX } from 'solid-js';

const URL_RE = /(https?:\/\/[^\s]+)/g;

/** Splits message text on URLs and renders them as clickable links. */
export function linkifyText(text: string): JSX.Element[] {
  return text.split(URL_RE).map((part, i) =>
    i % 2 === 1 ? (
      <a href={part} target="_blank" rel="noopener noreferrer">
        {part}
      </a>
    ) : (
      <>{part}</>
    ),
  );
}
