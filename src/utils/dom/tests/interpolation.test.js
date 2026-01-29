// interpolation.test.js
// Minimal tests for template interpolation (legacy and preferred syntax)
import { interpolate } from '../component-utils.js';

describe('interpolate', () => {
  it('replaces [[prop]] with value', () => {
    const tpl = '<div>[[foo]]</div>';
    expect(interpolate(tpl, { foo: 'bar' })).toBe('<div>bar</div>');
  });

  it('replaces ${prop} with value (legacy)', () => {
    const tpl = '<div>${foo}</div>';
    expect(interpolate(tpl, { foo: 'bar' })).toBe('<div>bar</div>');
  });

  it('handles missing prop as empty string', () => {
    const tpl = '<div>[[missing]]</div>';
    expect(interpolate(tpl, {})).toBe('<div></div>');
  });

  it('supports nested properties', () => {
    const tpl = '<div>[[user.name]]</div>';
    expect(interpolate(tpl, { user: { name: 'Ada' } })).toBe('<div>Ada</div>');
  });

  it('sanitizes HTML by default', () => {
    const tpl = '<div>[[foo]]</div>';
    expect(interpolate(tpl, { foo: '<script>' })).toBe(
      '<div>&lt;script&gt;</div>',
    );
  });

  it('does not sanitize props ending with Html', () => {
    const tpl = '<div>[[iconHtml]]</div>';
    expect(interpolate(tpl, { iconHtml: '<b>ok</b>' })).toBe(
      '<div><b>ok</b></div>',
    );
  });
});
