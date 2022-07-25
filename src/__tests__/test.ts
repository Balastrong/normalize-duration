import { normalizeDuration } from "..";

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

    // Jumps on three units + skip one (no stripZeroes)
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

  // Jumps on three units + skip one (stripZeroes)
  const millisInDay = 24 * 60 * 60 * 1000;
  expect(
    normalizeDuration(
      { milliseconds: 121005 + millisInDay * 3 },
      { stripZeroes: true }
    )
  ).toEqual({
    milliseconds: 5,
    seconds: 1,
    minutes: 2,
    days: 3,
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

  describe("with custom units", () => {
    it("converts milliseconds", () => {
      expect(
        normalizeDuration(
          { milliseconds: 10 },
          { customUnits: ["milliseconds"] }
        )
      ).toEqual({
        milliseconds: 10,
      });
    });

    it("converts seconds", () => {
      expect(
        normalizeDuration({ seconds: 10 }, { customUnits: ["seconds"] })
      ).toEqual({
        seconds: 10,
      });
    });

    it("converts milliseconds in minutes", () => {
      expect(
        normalizeDuration(
          { milliseconds: 1000 * 60 * 3 },
          { customUnits: ["minutes"] }
        )
      ).toEqual({
        minutes: 3,
      });
    });

    it("converts milliseconds in seconds and minutes", () => {
      expect(
        normalizeDuration(
          { milliseconds: 1000 * 60 * 3 + 5000 },
          { customUnits: ["minutes", "seconds"] }
        )
      ).toEqual({
        seconds: 5,
        minutes: 3,
      });
    });

    it("converts milliseconds in seconds and minutes", () => {
      expect(
        normalizeDuration(
          { milliseconds: 1000 * 60 * 3 },
          { customUnits: ["minutes", "seconds"] }
        )
      ).toEqual({
        seconds: 0,
        minutes: 3,
      });
    });

    it("converts milliseconds in seconds and minutes", () => {
      expect(
        normalizeDuration({ milliseconds: 1000 }, { customUnits: ["hours"] })
      ).toEqual({
        hours: 0,
      });
    });

    it("converts milliseconds in seconds and minutes - strip zeroes", () => {
      expect(
        normalizeDuration(
          { milliseconds: 1000 },
          { customUnits: ["hours"], stripZeroes: true }
        )
      ).toEqual({});
    });

    it("sums up everything in the last unit", () => {
      expect(
        normalizeDuration({ seconds: 3665 }, { customUnits: ["minutes"] })
      ).toEqual({
        minutes: 61,
      });
    });

    expect(
      normalizeDuration(
        { seconds: 3665 },
        { customUnits: ["minutes", "seconds"] }
      )
    ).toEqual({
      minutes: 61,
      seconds: 5,
    });

    expect(
      normalizeDuration({ seconds: 3665 }, { customUnits: ["hours"] })
    ).toEqual({
      hours: 1,
    });

    expect(normalizeDuration({ seconds: 3665 })).toEqual({
      hours: 1,
      minutes: 1,
      seconds: 5,
    });
  });
});
