import { factors, sortedKeys } from "./constants";
import { Duration, Options } from "./types";

/**
 * @name normalizeDuration
 * @summary Normalizes a duration
 *
 * @param {Duration} duration Duration to normalize
 * @param {Options} options Options to customize the normalization process
 *
 * @returns the normalized object
 *
 * @example
 * normalizeDuration({ milliseconds: 5020 }); // { seconds: 5, milliseconds: 20 }
 */
export const normalizeDuration = (
  duration: Duration,
  options?: Options
): Duration => {
  const lastKey = [...sortedKeys]
    .reverse()
    .find((key) => options?.customUnits?.includes(key));

  const { normalizedDuration } = sortedKeys.reduce(
    ({ normalizedDuration, rest }, key) => {
      const aggregatedValue = (duration[key] || 0) + rest; // Raw value + rest
      const currentFactor =
        key === lastKey ? Number.MAX_SAFE_INTEGER : factors[key]; // How many X in Y
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
