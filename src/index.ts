import { factors, sortedKeys } from "./constants";
import { Duration, Options } from "./types";

export const normalizeDuration = (
  duration: Duration,
  options?: Options
): Duration => {
  const isKeyValid = (key: keyof Duration) =>
    !options?.customUnits || options?.customUnits?.includes(key);

  const { normalizedDuration } = sortedKeys.reduce(
    ({ normalizedDuration, rest }, key) => {
      const aggregatedValue = (duration[key] || 0) + rest; // Raw value + rest
      const currentFactor = factors[key]; // How many X in Y
      const currentValue = aggregatedValue % currentFactor; // Effective value
      const newRest = Math.floor(aggregatedValue / currentFactor); // Rest to be added to the next unit

      if (
        (options?.stripZeroes ? currentValue > 0 : aggregatedValue > 0) &&
        isKeyValid(key)
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
    { normalizedDuration: {}, rest: 0 }
  );

  return normalizedDuration;
};
