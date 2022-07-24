export type Duration = {
  years?: number;
  months?: number;
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
  milliseconds?: number;
};

type Concrete<Type> = {
  [Property in keyof Type]-?: Type[Property];
};

const factors: Concrete<Omit<Duration, "years">> = {
  months: 12,
  days: 30,
  hours: 24,
  minutes: 60,
  seconds: 60,
  milliseconds: 1000,
};

const order: Array<keyof typeof factors> = [
  "months",
  "days",
  "hours",
  "minutes",
  "seconds",
  "milliseconds",
];

export const normalizeDuration = (duration: Duration): Duration => {
  const { normalizedDuration, rest } = order.reduceRight(
    ({ normalizedDuration, rest }, key) => {
      const currentUnit = (duration[key] || 0) + rest;
      const currentFactor = factors[key];

      if (currentUnit > 0) {
        return {
          normalizedDuration: {
            ...normalizedDuration,
            [key]: currentUnit % currentFactor,
          },
          rest: Math.floor(currentUnit / currentFactor),
        };
      } else {
        return {
          normalizedDuration,
          rest: Math.floor(currentUnit / currentFactor),
        };
      }
    },
    { normalizedDuration: {}, rest: 0 }
  );

  if (rest > 0) {
    return {
      ...normalizedDuration,
      years: rest,
    };
  }

  return normalizedDuration;
};
