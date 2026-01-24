import { newPD } from "../setupTests";
import "./index";

describe("addBusinessDays", () => {
  describe("can add Saturdays and/or Sundays to working days with the businessDays option", () => {
    it("given an initial date of Jan 7 and adding 8 days, with businessDay = [1, 2, 3, 4, 5, 6], should return Jan 17, 2022", () => {
      const result = newPD("2022-01-07").addBusinessDays(8, {
        businessDays: [1, 2, 3, 4, 5, 6],
      });
      expect(result).toEqual(newPD("2022-01-17"));
    });

    it("given an initial date of Jan 7 and adding 8 days, with businessDay = [0, 1, 2, 3, 4, 5], should return Jan 17, 2022", () => {
      const result = newPD("2022-01-07").addBusinessDays(8, {
        businessDays: [7, 1, 2, 3, 4, 5],
      });
      expect(result).toEqual(newPD("2022-01-17"));
    });

    it("given an initial date of Jan 7 and adding 10 days, with businessDay = [0, 1, 2, 3, 4, 5, 6], should return Jan 17, 2022", () => {
      const result = newPD("2022-01-07").addBusinessDays(10, {
        businessDays: [7, 1, 2, 3, 4, 5, 6],
      });
      expect(result).toEqual(newPD("2022-01-17"));
    });
  });

  describe("exceptions", () => {
    it("handles true exceptions", () => {
      const result = newPD("2022-01-07").addBusinessDays(10, {
        businessDays: [1, 2, 3, 4, 5], // M-F
        exceptions: { "2022-01-08": true, "2022-01-09": true },
      });
      expect(result).toEqual(newPD("2022-01-19"));
    });

    it("handles false exceptions on Mondays", () => {
      const result = newPD("2022-01-07").addBusinessDays(9, {
        businessDays: [1, 2, 3, 4, 5], // M-F
        exceptions: { "2022-01-10": false, "2022-01-17": false },
      });
      expect(result).toEqual(newPD("2022-01-24"));
    });

    it("handles false exceptions on Saturdays", () => {
      const result = newPD("2022-01-07").addBusinessDays(12, {
        businessDays: [1, 2, 3, 4, 5, 6], // M-Sat
        exceptions: { "2022-01-08": false, "2022-01-15": false },
      });
      expect(result).toEqual(newPD("2022-01-24"));
    });

    it("handles a mix of true and false exceptions", () => {
      const result = newPD("2022-01-07").addBusinessDays(13, {
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
      expect(result).toEqual(newPD("2022-01-24"));
    });

    it("ignores exceptions that are out of range", () => {
      const result = newPD("2022-01-07").addBusinessDays(10, {
        businessDays: [1, 2, 3, 4, 5],
        exceptions: { "2022-01-01": true, "2022-01-09": true, "2022-01-30": true },
      });
      expect(result).toEqual(newPD("2022-01-20"));
    });

    it("moves to the following day when ending on a non-working weekend with a true Saturday exception", () => {
      const result = newPD("2022-01-05").addBusinessDays(4, {
        businessDays: [1, 2, 3, 4, 5], // M-F
        exceptions: { "2022-01-08": true },
      });
      expect(result).toEqual(newPD("2022-01-10"));
    });

    it("handles true Sunday exceptions", () => {
      const result = newPD("2022-01-05").addBusinessDays(5, {
        businessDays: [1, 2, 3, 4, 5, 6], // M-Sat
        exceptions: { "2022-01-09": true },
      });
      expect(result).toEqual(newPD("2022-01-10"));
    });

    it("ends on a true exception", () => {
      const result = newPD("2022-01-05").addBusinessDays(4, {
        businessDays: [1, 2, 3, 4, 5, 6], // M-Sat
        exceptions: { "2022-01-09": true },
      });
      expect(result).toEqual(newPD("2022-01-09"));
    });

    it("should move to following Monday when ending on a false exception", () => {
      const result = newPD("2022-01-07").addBusinessDays(5, {
        businessDays: [1, 2, 3, 4, 5], // M-F
        exceptions: { "2022-01-14": false },
      });
      expect(result).toEqual(newPD("2022-01-17"));
    });

    it("starts on a non-working Saturday and ends on a false exception, should move to following Monday", () => {
      const result = newPD("2022-01-08").addBusinessDays(5, {
        businessDays: [1, 2, 3, 4, 5], // M-F
        exceptions: { "2022-01-14": false },
      });
      expect(result).toEqual(newPD("2022-01-17"));
    });

    it("starts on a false exception", () => {
      const result = newPD("2022-01-07").addBusinessDays(5, {
        businessDays: [1, 2, 3, 4, 5], // M-F
        exceptions: { "2022-01-07": false },
      });
      expect(result).toEqual(newPD("2022-01-14"));
    });

    it("starts on a true exception", () => {
      const result = newPD("2022-01-08").addBusinessDays(5, {
        businessDays: [1, 2, 3, 4, 5], // M-F
        exceptions: { "2022-01-08": true },
      });
      expect(result).toEqual(newPD("2022-01-14"));
    });

    it("starts and ends on false exceptions, should move to the following working day", () => {
      const result = newPD("2022-01-08").addBusinessDays(6, {
        businessDays: [1, 2, 3, 4, 5, 6], // M-Sat
        exceptions: { "2022-01-08": false, "2022-01-15": false },
      });
      expect(result).toEqual(newPD("2022-01-17"));
    });

    it("starts and ends on true exceptions", () => {
      const result = newPD("2022-01-08").addBusinessDays(6, {
        businessDays: [1, 2, 3, 4, 5], // M-F
        exceptions: { "2022-01-08": true, "2022-01-15": true },
      });
      expect(result).toEqual(newPD("2022-01-15"));
    });

    it("handles a large number of working Saturday exceptions, including some out of range", () => {
      const result = newPD("2022-01-03").addBusinessDays(36, {
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
      expect(result).toEqual(newPD("2022-02-14"));
    });

    it("handles a large number of working Saturday exceptions when Sundays are working days", () => {
      const result = newPD("2022-01-03").addBusinessDays(40, {
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
      expect(result).toEqual(newPD("2022-02-12"));
    });

    it("handles a large number of excluded Saturday exceptions, including some out of range", () => {
      const result = newPD("2022-01-03").addBusinessDays(36, {
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
      expect(result).toEqual(newPD("2022-02-22"));
    });
  });
});
