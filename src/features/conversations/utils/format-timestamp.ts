// Pure timestamp formatting + grouping helpers for the conversation view.

// Minimum gap between consecutive messages before a timestamp divider is shown.
export const TIMESTAMP_THRESHOLD_MS = 5 * 60 * 1000;

type TimestampFormatters = {
  time: Intl.DateTimeFormat;
  day: Intl.DateTimeFormat;
};

const timestampFormattersByLocale = new Map<string, TimestampFormatters>();

function isSameLocalDate(a: Date, b: Date) {
  return (
    a.getDate() === b.getDate() &&
    a.getMonth() === b.getMonth() &&
    a.getFullYear() === b.getFullYear()
  );
}

function getTimestampFormatters(locale: string) {
  const cached = timestampFormattersByLocale.get(locale);
  if (cached) return cached;

  const formatters = {
    time: new Intl.DateTimeFormat(locale, {
      hour: 'numeric',
      minute: '2-digit',
      // Product choice: keep message timestamps in 24-hour time for now.
      hour12: false,
    }),
    day: new Intl.DateTimeFormat(locale, {
      month: 'short',
      day: 'numeric',
    }),
  };

  timestampFormattersByLocale.set(locale, formatters);
  return formatters;
}

export function formatTimestamp(timestamp: number, locale: string) {
  const date = new Date(timestamp);
  const now = new Date();
  const formatters = getTimestampFormatters(locale);
  const time = formatters.time.format(date);

  if (isSameLocalDate(date, now)) return time;

  const day = formatters.day.format(date);

  return `${day} - ${time}`;
}
