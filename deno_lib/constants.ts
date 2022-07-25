import { Concrete, Duration } from "./types.ts";

export const factors: Concrete<Duration> = {
  years: Number.MAX_SAFE_INTEGER,
  months: 12,
  days: 30,
  hours: 24,
  minutes: 60,
  seconds: 60,
  milliseconds: 1000,
};

export const sortedKeys: (keyof typeof factors)[] = [
  "milliseconds",
  "seconds",
  "minutes",
  "hours",
  "days",
  "months",
  "years",
];
