/**
 * Data model for the `Icon` component.
 */

/**
 * How an icon is drawn. The two are not interchangeable, which is why the
 * paths stand apart in `icon.data.ts` as well: a line icon is an outline and
 * needs `stroke`, a brand mark is a solid shape and needs `fill`. Drawn the
 * other way round, the first turns into a blot and the second disappears.
 */
export type IconVariant = 'stroke' | 'fill';
