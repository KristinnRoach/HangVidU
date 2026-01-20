import { describe, it, expect } from 'vitest';
import { linkifyToFragment, extractLinks } from '../../src/utils/linkify.js';

describe('linkify utility', () => {
  it('extracts multiple links and normalizes protocol-less URLs', () => {
    const text = 'Visit https://example.com and www.test.com!';
    const links = extractLinks(text);
    expect(links.length).toBe(2);
    expect(links[0].url).toBe('https://example.com');
    expect(links[1].url).toBe('http://www.test.com');
  });

  it('produces a fragment with anchor elements for links', () => {
    const frag = linkifyToFragment('hello https://example.com bye');
    const container = document.createElement('div');
    container.appendChild(frag);
    const anchors = container.querySelectorAll('a');
    expect(anchors.length).toBe(1);
    expect(anchors[0].href).toContain('https://example.com');
    expect(anchors[0].target).toBe('_blank');
  });
});
