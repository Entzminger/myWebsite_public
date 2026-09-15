/**
 * Data model for the CV (resume section).
 */

/** A point in time with a machine-readable value for `<time datetime>`. */
export interface ResumeDate {
  /** ISO 8601, e.g. `2017-10` or `2008`. */
  iso: string;
  /** Display form, e.g. `10.2017`. */
  label: string;
}

/** A period - without `to` it runs until today. */
export interface ResumePeriod {
  /** Optional prefix before the start date, e.g. `Seit`. */
  prefix?: string;
  from: ResumeDate;
  to?: ResumeDate;
}

/** A station of the CV (work, studies, training). */
export interface ResumeStation {
  id: string;
  period: ResumePeriod;
  /** Company, university or qualification. */
  title: string;
  /** Place, or an additional classification. */
  place?: string;
  description: string;
  /** Technologies used - purely informative. */
  tags?: string[];
}

/** An entry of the personal details, icon path (24×24 viewbox) included. */
export interface ResumeContact {
  id: string;
  label: string;
  value: string;
  /** Optional link (`mailto:`, `tel:` …). */
  href?: string;
  iconPath: string;
}

/** A group of core skills. */
export interface ResumeSkillGroup {
  id: string;
  label: string;
  items: string[];
}
