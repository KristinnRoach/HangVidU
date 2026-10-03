/** Native Canvas image styles; filter accepts standard CSS filter chains.
 * Browser support still determines which filters take effect.
 * Shadows/filters on the mask affect its source texture before mesh warping.
 * Layout, borders, and DOM styles are not Canvas image styles.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/filter#value
 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D#instance_properties
 */
export type FaceMaskRegionStyle = Partial<
  CanvasFilters & CanvasShadowStyles & Pick<CanvasCompositing, 'globalAlpha'>
>;

export const faceMaskStyle: {
  backgroundColor: string;
  outside: FaceMaskRegionStyle;
  inside: FaceMaskRegionStyle;
  mask: FaceMaskRegionStyle;
} = {
  backgroundColor: 'black',
  // A: Outside the tracked face. globalAlpha is 0–1.
  outside: { globalAlpha: 0.9, filter: 'blur(2px) brightness(90%)' },
  // B: Live face underneath the mask, visible through eyes/mouth.
  inside: {
    globalAlpha: 1,
    filter: 'brightness(150%) contrast(150%)', // invert(75%) hue-rotate(90deg) contrast(110%) saturate(110%) brightness(180%)
  },
  // C: Captured texture. Reducing alpha reveals B through the mask.
  mask: { globalAlpha: 1, filter: 'none' },
};
