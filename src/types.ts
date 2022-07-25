export type Duration = {
  years?: number;
  months?: number;
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
  milliseconds?: number;
};

export type Concrete<Type> = {
  [Property in keyof Type]-?: Type[Property];
};

export type Options = {
  customUnits?: Array<keyof Duration>;
  stripZeroes?: boolean;
};
