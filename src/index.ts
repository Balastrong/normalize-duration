import { factors, order } from "./constants";
import { Duration } from "./types";

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
