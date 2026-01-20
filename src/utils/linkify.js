// src/utils/linkify.js
// Simple, modular linkify utility shared across the app.
// - `linkifyToFragment(text)` returns a DocumentFragment containing
//   text nodes and <a> elements for detected URLs.
// - `extractLinks(text)` returns an array of link metadata for future use
//   (e.g., generating previews, sending metadata with messages).

// Normalize a raw URL-like string and ensure it uses a safe protocol.
// Returns a fully-qualified URL string for http/https URLs, or null if unsafe.
function normalizeSafeHref(raw) {
  if (!raw) return null;

  let href = String(raw).trim();
  if (!href) return null;

  // If there is no scheme (with //), default to http://
  if (!/^[a-zA-Z][a-zA-Z0-9+.-]*:\/\//.test(href)) {
    href = 'http://' + href;
  }

  // Use the browser's URL parser when available to robustly extract protocol.
  // Fallback to regex-based check if URL constructor fails.
  let protocol = '';
  let parsedUrl = null;
  try {
    parsedUrl = new URL(
      href,
      window.location && window.location.origin
        ? window.location.origin
        : undefined,
    );
    protocol = parsedUrl.protocol; // e.g., "http:", "https:", "javascript:"
  } catch (_) {
    const match = href.match(/^([a-zA-Z][a-zA-Z0-9+.-]*:)/);
    protocol = match ? match[1].toLowerCase() : '';
  }
  // If we successfully parsed the URL, require a non-empty hostname to
  // avoid turning obviously invalid strings into clickable links.
  if (parsedUrl && !parsedUrl.hostname) {
    return null;
  }


  const lowerProtocol = protocol.toLowerCase();
  if (lowerProtocol !== 'http:' && lowerProtocol !== 'https:') {
    return null;
  }

  return href;
}

export function linkifyToFragment(text) {
  const frag = document.createDocumentFragment();
  if (!text) return frag;

  // Basic URL regex: matches http(s)://... or www....
  // Intentionally simple so it's fast and easy to extend later.
  // Require at least one dot in the host part to reduce false positives.
  const urlRegex = /((?:https?:\/\/|www\.)[^\s<>]+\.[^\s<>]+)/g;
  let lastIndex = 0;
  let match;

  while ((match = urlRegex.exec(text)) !== null) {
    const urlText = match[0];
    const index = match.index;
    // Append preceding plain text
    if (index > lastIndex) {
      frag.appendChild(document.createTextNode(text.slice(lastIndex, index)));
    }
    // Trim common trailing punctuation from URL match (e.g., '.', ',', '!', '?', ':', ';', ')')
    // Keep the trailing punctuation as plain text after the link.
    const trimmedMatch = urlText.replace(/[.,!?:;\)\]\}]+$/g, '');
    const trailing = urlText.slice(trimmedMatch.length);

    // Normalize href and ensure it uses a safe protocol.
    const safeHref = normalizeSafeHref(trimmedMatch);

    if (!safeHref) {
      // Unsafe protocol — render the original matched text as plain text
      frag.appendChild(document.createTextNode(urlText));
    } else {
      const a = document.createElement('a');
      a.href = safeHref;
      a.textContent = trimmedMatch;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.className = 'message-link';

      frag.appendChild(a);
      if (trailing) frag.appendChild(document.createTextNode(trailing));
    }

    lastIndex = index + urlText.length;
  }

  // Append any remaining text
  if (lastIndex < text.length) {
    frag.appendChild(document.createTextNode(text.slice(lastIndex)));
  }

  return frag;
}

export function extractLinks(text) {
  const urlRegex = /((?:https?:\/\/|www\.)[^\s<>]+\.[^\s<>]+)/g;
  const links = [];
  let match;
  while ((match = urlRegex.exec(text)) !== null) {
    const raw = match[0];
    const trimmed = raw.replace(/[.,!?:;\)\]\}]+$/g, '');
    const safe = normalizeSafeHref(trimmed);
    if (!safe) continue;
    links.push({
      url: safe,
      text: trimmed,
      index: match.index,
      length: trimmed.length,
    });
  }
  return links;
}
