// src/utils/linkify.js
// Simple, modular linkify utility shared across the app.
// - `linkifyToFragment(text)` returns a DocumentFragment containing
//   text nodes and <a> elements for detected URLs.
// - `extractLinks(text)` returns an array of link metadata for future use
//   (e.g., generating previews, sending metadata with messages).

export function linkifyToFragment(text) {
  const frag = document.createDocumentFragment();
  if (!text) return frag;

  // Basic URL regex: matches http(s)://... or www....
  // Intentionally simple so it's fast and easy to extend later.
  const urlRegex = /((?:https?:\/\/|www\.)[^\s<>]+)/g;
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

    // Normalize href (ensure protocol)
    let href = trimmedMatch;
    if (!/^https?:\/\//i.test(href)) {
      href = 'http://' + href;
    }

    const a = document.createElement('a');
    a.href = href;
    a.textContent = trimmedMatch;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.className = 'message-link';

    frag.appendChild(a);
    if (trailing) frag.appendChild(document.createTextNode(trailing));

    lastIndex = index + urlText.length;
  }

  // Append any remaining text
  if (lastIndex < text.length) {
    frag.appendChild(document.createTextNode(text.slice(lastIndex)));
  }

  return frag;
}

export function extractLinks(text) {
  const urlRegex = /((?:https?:\/\/|www\.)[^\s<>]+)/g;
  const links = [];
  let match;
  while ((match = urlRegex.exec(text)) !== null) {
    const raw = match[0];
    const trimmed = raw.replace(/[.,!?:;\)\]\}]+$/g, '');
    let url = trimmed;
    if (!/^https?:\/\//i.test(url)) url = 'http://' + url;
    links.push({
      url,
      text: trimmed,
      index: match.index,
      length: trimmed.length,
    });
  }
  return links;
}
