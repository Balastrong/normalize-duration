import { normalizeDuration } from "../";

describe("normalize-duration", () => {
  it("converts milliseconds", () => {
    // No action required
    expect(normalizeDuration({ milliseconds: 10 })).toEqual({
      milliseconds: 10,
    });

    // Jumps on the next unit
    expect(normalizeDuration({ milliseconds: 1002 })).toEqual({
      milliseconds: 2,
      seconds: 1,
    });

    // Jumps on two units
    expect(normalizeDuration({ milliseconds: 121005 })).toEqual({
      milliseconds: 5,
      seconds: 1,
      minutes: 2,
    });

    // Jumps on three units + skip one
    const millisInDay = 24 * 60 * 60 * 1000;
    expect(
      normalizeDuration({ milliseconds: 121005 + millisInDay * 3 })
    ).toEqual({
      milliseconds: 5,
      seconds: 1,
      minutes: 2,
      hours: 0,
      days: 3,
    });
  });

  it("converts seconds skipping milliseconds", () => {
    // No action required
    expect(normalizeDuration({ seconds: 10 })).toEqual({
      seconds: 10,
    });

    // Jumps on the next unit
    expect(normalizeDuration({ seconds: 75 })).toEqual({
      seconds: 15,
      minutes: 1,
    });
  });

  it("correctly handles the last unit - years", () => {
    expect(normalizeDuration({ months: 25 })).toEqual({
      months: 1,
      years: 2,
    });
  });
});
