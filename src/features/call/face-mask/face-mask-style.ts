/** Native Canvas image styles; filter accepts standard CSS filter chains.
 * Browser support still determines which filters take effect.
 * Filters on the mask affect its source texture before mesh warping.
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
  mask: Omit<FaceMaskRegionStyle, keyof CanvasShadowStyles>;
  vignette: { fadeStart: number; fadeEnd: number };
} = {
  backgroundColor: 'black',
  // Fade to backgroundColor starts at fadeStart and is solid at fadeEnd; fractions of the frame's half-diagonal.
  vignette: { fadeStart: 0.0, fadeEnd: 0.666 },
  // A: Outside the tracked face. globalAlpha is 0–1.
  outside: { globalAlpha: 0.0, filter: 'none' }, // grayscale(20%) blur(1px)
  // B: Live face underneath the mask, visible through eyes/mouth.
  inside: {
    globalAlpha: 1,
    filter: 'brightness(120%) contrast(110%) saturate(80%)', // invert(75%) hue-rotate(90deg) contrast(110%) saturate(110%) brightness(180%)
    // filter: 'grayscale(10%) blur(1px)', // testing same as outside
  },
  // C: Captured texture. Reducing alpha reveals B through the mask.
  mask: { globalAlpha: 1, filter: 'brightness(125%) saturate(90%)' },
};
