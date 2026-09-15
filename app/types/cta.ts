/**
 * Data model for the `Cta` component.
 */

/**
 * The element a call to action stands as: a link that leads somewhere, or the
 * button of a form.
 */
export type CtaElement = 'a' | 'button';

/**
 * The colour setting of a call to action.
 *
 * `primary` and `accent` come from the central tokens, `neutral` is the quiet
 * second path without a ground of its own. `brand` brings nothing with it:
 * sections that link to a foreign brand (foundation, GitHub) set its tones
 * through `--my-cta-from`, `--my-cta-to`, `--my-cta-glow` and
 * `--my-cta-glow-hover` themselves - those colours belong to the linked brand
 * and not to the design system.
 */
export type CtaColor = 'primary' | 'accent' | 'neutral' | 'brand';
