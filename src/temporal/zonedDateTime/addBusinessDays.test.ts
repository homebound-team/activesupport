import { newZDT } from "../setupTests";

describe("addBusinessDays", () => {
  describe("can add Saturdays and/or Sundays to working days with the businessDays option", () => {
    it("given an initial date of Jan 7 and adding 8 days, with businessDay = [1, 2, 3, 4, 5, 6], should return Jan 17, 2022", () => {
      const result = newZDT("2022-01-07T00:00:00.000Z").addBusinessDays(8, {
        businessDays: [1, 2, 3, 4, 5, 6],
      });
      expect(result).toEqual(newZDT("2022-01-17T00:00:00.000Z"));
    });

    it("given an initial date of Jan 7 and adding 8 days, with businessDay = [7, 1, 2, 3, 4, 5], should return Jan 17, 2022", () => {
      const result = newZDT("2022-01-07T00:00:00.000Z").addBusinessDays(8, {
        businessDays: [7, 1, 2, 3, 4, 5],
      });
      expect(result).toEqual(newZDT("2022-01-17T00:00:00.000Z"));
    });

    it("given an initial date of Jan 7 and adding 10 days, with businessDay = [7, 1, 2, 3, 4, 5, 6], should return Jan 17, 2022", () => {
      const result = newZDT("2022-01-07T00:00:00.000Z").addBusinessDays(10, {
        businessDays: [7, 1, 2, 3, 4, 5, 6],
      });
      expect(result).toEqual(newZDT("2022-01-17T00:00:00.000Z"));
    });
  });

  describe("exceptions", () => {
    it("handles true exceptions", () => {
      const result = newZDT("2022-01-07T00:00:00.000Z").addBusinessDays(10, {
        businessDays: [1, 2, 3, 4, 5], // M-F
        exceptions: { "2022-01-08": true, "2022-01-09": true },
      });
      expect(result).toEqual(newZDT("2022-01-19T00:00:00.000Z"));
    });

    it("handles false exceptions on Mondays", () => {
      const result = newZDT("2022-01-07T00:00:00.000Z").addBusinessDays(9, {
        businessDays: [1, 2, 3, 4, 5], // M-F
        exceptions: { "2022-01-10": false, "2022-01-17": false },
      });
      expect(result).toEqual(newZDT("2022-01-24T00:00:00.000Z"));
    });

    it("handles false exceptions on Saturdays", () => {
      const result = newZDT("2022-01-07T00:00:00.000Z").addBusinessDays(12, {
        businessDays: [1, 2, 3, 4, 5, 6], // M-Sat
        exceptions: { "2022-01-08": false, "2022-01-15": false },
      });
      expect(result).toEqual(newZDT("2022-01-24T00:00:00.000Z"));
    });

    it("handles a mix of true and false exceptions", () => {
      const result = newZDT("2022-01-07T00:00:00.000Z").addBusinessDays(13, {
        businessDays: [1, 2, 3, 4, 5, 6], // M-Sat
        exceptions: {
          "2022-01-08": false, // Sat
          "2022-01-09": true, // Sun
          "2022-01-10": true, // Mon (should be ignored since it's already a working day)
          "2022-01-15": true, // Sat (should be ignored since it's already a working day)
          "2022-01-16": false, // Sun (should be ignored since it's already a non-working day)
          "2022-01-17": false, // Mon
        },
      });
      expect(result).toEqual(newZDT("2022-01-24T00:00:00.000Z"));
    });

    it("ignores exceptions that are out of range", () => {
      const result = newZDT("2022-01-07T00:00:00.000Z").addBusinessDays(10, {
        businessDays: [1, 2, 3, 4, 5],
        exceptions: { "2022-01-01": true, "2022-01-09": true, "2022-01-30": true },
      });
      expect(result).toEqual(newZDT("2022-01-20T00:00:00.000Z"));
    });

    it("moves to the following day when ending on a non-working weekend with a true Saturday exception", () => {
      const result = newZDT("2022-01-05T00:00:00.000Z").addBusinessDays(4, {
        businessDays: [1, 2, 3, 4, 5], // M-F
        exceptions: { "2022-01-08": true },
      });
      expect(result).toEqual(newZDT("2022-01-10T00:00:00.000Z"));
    });

    it("handles true Sunday exceptions", () => {
      const result = newZDT("2022-01-05T00:00:00.000Z").addBusinessDays(5, {
        businessDays: [1, 2, 3, 4, 5, 6], // M-Sat
        exceptions: { "2022-01-09": true },
      });
      expect(result).toEqual(newZDT("2022-01-10T00:00:00.000Z"));
    });

    it("ends on a true exception", () => {
      const result = newZDT("2022-01-05T00:00:00.000Z").addBusinessDays(4, {
        businessDays: [1, 2, 3, 4, 5, 6], // M-Sat
        exceptions: { "2022-01-09": true },
      });
      expect(result).toEqual(newZDT("2022-01-09T00:00:00.000Z"));
    });

    it("should move to following Monday when ending on a false exception", () => {
      const result = newZDT("2022-01-07T00:00:00.000Z").addBusinessDays(5, {
        businessDays: [1, 2, 3, 4, 5], // M-F
        exceptions: { "2022-01-14": false },
      });
      expect(result).toEqual(newZDT("2022-01-17T00:00:00.000Z"));
    });

    it("starts on a non-working Saturday and ends on a false exception, should move to following Monday", () => {
      const result = newZDT("2022-01-08T00:00:00.000Z").addBusinessDays(5, {
        businessDays: [1, 2, 3, 4, 5], // M-F
        exceptions: { "2022-01-14": false },
      });
      expect(result).toEqual(newZDT("2022-01-17T00:00:00.000Z"));
    });

    it("starts on a false exception", () => {
      const result = newZDT("2022-01-07T00:00:00.000Z").addBusinessDays(5, {
        businessDays: [1, 2, 3, 4, 5], // M-F
        exceptions: { "2022-01-07": false },
      });
      expect(result).toEqual(newZDT("2022-01-14T00:00:00.000Z"));
    });

    it("starts on a true exception", () => {
      const result = newZDT("2022-01-08T00:00:00.000Z").addBusinessDays(5, {
        businessDays: [1, 2, 3, 4, 5], // M-F
        exceptions: { "2022-01-08": true },
      });
      expect(result).toEqual(newZDT("2022-01-14T00:00:00.000Z"));
    });

    it("starts and ends on false exceptions, should move to the following working day", () => {
      const result = newZDT("2022-01-08T00:00:00.000Z").addBusinessDays(6, {
        businessDays: [1, 2, 3, 4, 5, 6], // M-Sat
        exceptions: { "2022-01-08": false, "2022-01-15": false },
      });
      expect(result).toEqual(newZDT("2022-01-17T00:00:00.000Z"));
    });

    it("starts and ends on true exceptions", () => {
      const result = newZDT("2022-01-08T00:00:00.000Z").addBusinessDays(6, {
        businessDays: [1, 2, 3, 4, 5], // M-F
        exceptions: { "2022-01-08": true, "2022-01-15": true },
      });
      expect(result).toEqual(newZDT("2022-01-15T00:00:00.000Z"));
    });

    it("handles a large number of working Saturday exceptions, including some out of range", () => {
      const result = newZDT("2022-01-03T00:00:00.000Z").addBusinessDays(36, {
        businessDays: [1, 2, 3, 4, 5], // M-F
        exceptions: {
          "2022-01-08": true,
          "2022-01-15": true,
          "2022-01-22": true,
          "2022-01-29": true,
          "2022-02-05": true,
          "2022-02-12": true,
          "2022-02-19": true, // out of range, not incl
        },
      });
      expect(result).toEqual(newZDT("2022-02-14T00:00:00.000Z"));
    });

    it("handles a large number of working Saturday exceptions when Sundays are working days", () => {
      const result = newZDT("2022-01-03T00:00:00.000Z").addBusinessDays(40, {
        businessDays: [7, 1, 2, 3, 4, 5], // Sun-F
        exceptions: {
          "2022-01-08": true,
          "2022-01-15": true,
          "2022-01-22": true,
          "2022-01-29": true,
          "2022-02-05": true,
          "2022-02-12": true,
          "2022-02-19": true, // out of range, not incl
        },
      });
      expect(result).toEqual(newZDT("2022-02-12T00:00:00.000Z"));
    });

    it("handles a large number of excluded Saturday exceptions, including some out of range", () => {
      const result = newZDT("2022-01-03T00:00:00.000Z").addBusinessDays(36, {
        businessDays: [1, 2, 3, 4, 5, 6], // M-Sat
        exceptions: {
          "2022-01-08": false,
          "2022-01-15": false,
          "2022-01-22": false,
          "2022-01-29": false,
          "2022-02-05": false,
          "2022-02-12": false,
          "2022-02-19": false, // out of range, not incl
        },
      });
      expect(result).toEqual(newZDT("2022-02-22T00:00:00.000Z"));
    });
  });
});
