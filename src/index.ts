import { factors, sortedKeys } from "./constants";
import { Duration, Options } from "./types";

export const normalizeDuration = (
  duration: Duration,
  options?: Options
): Duration => {
  const { normalizedDuration } = sortedKeys.reduce(
    ({ normalizedDuration, rest }, key) => {
      const aggregatedValue = (duration[key] || 0) + rest; // Raw value + rest
      const currentFactor = factors[key]; // How many X in Y
      const currentValue = aggregatedValue % currentFactor; // Effective value
      const newRest = Math.floor(aggregatedValue / currentFactor); // Rest to be added to the next unit

      if (
        options?.customUnits?.includes(key) ||
        (!options?.customUnits && aggregatedValue > 0)
      ) {
        return {
          normalizedDuration: {
            ...normalizedDuration,
            [key]: currentValue,
          },
          rest: newRest,
        };
      } else {
        return {
          normalizedDuration,
          rest: newRest,
        };
      }
    },
    { normalizedDuration: {} as Duration, rest: 0 }
  );

  if (options?.stripZeroes) {
    (Object.keys(normalizedDuration) as Array<keyof Duration>).forEach(
      (key) => {
        if (normalizedDuration[key] === 0) {
          delete normalizedDuration[key];
        }
      }
    );
  }

  return normalizedDuration;
};
