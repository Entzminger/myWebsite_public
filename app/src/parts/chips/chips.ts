import type { Chip, ChipColor } from '@/types/chips';

/**
 * Lifts a plain list of strings onto the chip model. The sections keep their
 * keywords as `string[]` - among other reasons because the structured data of
 * the CV needs them that way - so the mapping happens only where the list is
 * actually drawn.
 */
export const toChips = (texts: string[], color?: ChipColor): Chip[] =>
  texts.map((text) => ({ text, color }));
