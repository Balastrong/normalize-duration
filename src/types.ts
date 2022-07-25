/**
 * @name Duration
 * @summary A type with all supported time units.
 */
export type Duration = {
  years?: number;
  months?: number;
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
  milliseconds?: number;
};

/**
 * @name Options
 * @summary Custom options.
 *
 * @property {Array<string>} customUnits - Only the selected units will be used.
 * @property {boolean} stripZeroes - Whether to strip zeroes in between.
 */
export type Options = {
  customUnits?: Array<keyof Duration>;
  stripZeroes?: boolean;
};

export type Concrete<Type> = {
  [Property in keyof Type]-?: Type[Property];
};
