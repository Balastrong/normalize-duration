import { Concrete, Duration } from "./types";

export const factors: Concrete<Omit<Duration, "years">> = {
  months: 12,
  days: 30,
  hours: 24,
  minutes: 60,
  seconds: 60,
  milliseconds: 1000,
};

export const order: Array<keyof typeof factors> = [
  "months",
  "days",
  "hours",
  "minutes",
  "seconds",
  "milliseconds",
];
