import subBusinessDays, { addBusinessDays } from "./businessDaysUtils";

describe("businessDaysUtils", () => {
  describe("addBusinessDays", () => {
    describe("can add Saturdays and/or Sundays to working days with the businessDays option", () => {
      it("given an initial date of Jan 7 and adding 8 days, with businessDay = [1, 2, 3, 4, 5, 6], should return Jan 17, 2022", () => {
        const result = addBusinessDays(new Date(2022, 0 /* Jan */, 7), 8, {
          businessDays: [1, 2, 3, 4, 5, 6],
        });
        expect(result).toEqual(new Date(2022, 0 /* Jan */, 17));
      });

      it("given an initial date of Jan 7 and adding 8 days, with businessDay = [0, 1, 2, 3, 4, 5], should return Jan 17, 2022", () => {
        const result = addBusinessDays(new Date(2022, 0 /* Jan */, 7), 8, {
          businessDays: [0, 1, 2, 3, 4, 5],
        });
        expect(result).toEqual(new Date(2022, 0 /* Jan */, 17));
      });

      it("given an initial date of Jan 7 and adding 10 days, with businessDay = [0, 1, 2, 3, 4, 5, 6], should return Jan 17, 2022", () => {
        const result = addBusinessDays(new Date(2022, 0 /* Jan */, 7), 10, {
          businessDays: [0, 1, 2, 3, 4, 5, 6],
        });
        expect(result).toEqual(new Date(2022, 0 /* Jan */, 17));
      });
    });

    describe("exceptions", () => {
      it("handles true exceptions", () => {
        const result = addBusinessDays(new Date(2022, 0 /* Jan */, 7), 10, {
          businessDays: [1, 2, 3, 4, 5], // M-F
          exceptions: { "01/08/22": true, "01/09/22": true },
        });
        expect(result).toEqual(new Date(2022, 0 /* Jan */, 19));
      });

      it("handles false exceptions on Mondays", () => {
        const result = addBusinessDays(new Date(2022, 0 /* Jan */, 7), 9, {
          businessDays: [1, 2, 3, 4, 5], // M-F
          exceptions: { "01/10/22": false, "01/17/22": false },
        });
        expect(result).toEqual(new Date(2022, 0 /* Jan */, 24));
      });

      it("handles false exceptions on Saturdays", () => {
        const result = addBusinessDays(new Date(2022, 0 /* Jan */, 7), 12, {
          businessDays: [1, 2, 3, 4, 5, 6], // M-Sat
          exceptions: { "01/08/22": false, "01/15/22": false },
        });
        expect(result).toEqual(new Date(2022, 0 /* Jan */, 24));
      });

      it("handles a mix of true and false exceptions", () => {
        const result = addBusinessDays(new Date(2022, 0 /* Jan */, 7), 13, {
          businessDays: [1, 2, 3, 4, 5, 6], // M-Sat
          exceptions: {
            "01/08/22": false, // Sat
            "01/09/22": true, // Sun
            "01/10/22": true, // Mon (should be ignored since it's already a working day)
            "01/15/22": true, // Sat (should be ignored since it's already a working day)
            "01/16/22": false, // Sun (should be ignored since it's already a non-working day)
            "01/17/22": false, // Mon
          },
        });
        expect(result).toEqual(new Date(2022, 0 /* Jan */, 24));
      });

      it("ignores exceptions that are out of range", () => {
        const result = addBusinessDays(new Date(2022, 0 /* Jan */, 7), 10, {
          businessDays: [1, 2, 3, 4, 5],
          exceptions: { "01/01/22": true, "01/09/22": true, "01/30/22": true },
        });
        expect(result).toEqual(new Date(2022, 0 /* Jan */, 20));
      });

      it("moves to the following day when ending on a non-working weekend with a true Saturday exception", () => {
        const result = addBusinessDays(new Date(2022, 0 /* Jan */, 5), 4, {
          businessDays: [1, 2, 3, 4, 5], // M-F
          exceptions: { "01/08/22": true },
        });
        expect(result).toEqual(new Date(2022, 0 /* Jan */, 10));
      });

      it("handles true Sunday exceptions", () => {
        const result = addBusinessDays(new Date(2022, 0 /* Jan */, 5), 5, {
          businessDays: [1, 2, 3, 4, 5, 6], // M-Sat
          exceptions: { "01/09/22": true },
        });
        expect(result).toEqual(new Date(2022, 0 /* Jan */, 10));
      });

      it("ends on a true exception", () => {
        const result = addBusinessDays(new Date(2022, 0 /* Jan */, 5), 4, {
          businessDays: [1, 2, 3, 4, 5, 6], // M-Sat
          exceptions: { "01/09/22": true },
        });
        expect(result).toEqual(new Date(2022, 0 /* Jan */, 9));
      });

      it("should move to following Monday when ending on a false exception", () => {
        const result = addBusinessDays(new Date(2022, 0 /* Jan */, 7), 5, {
          businessDays: [1, 2, 3, 4, 5], // M-F
          exceptions: { "01/14/22": false },
        });
        expect(result).toEqual(new Date(2022, 0 /* Jan */, 17));
      });

      it("starts on a non-working Saturday and ends on a false exception, should move to following Monday", () => {
        const result = addBusinessDays(new Date(2022, 0 /* Jan */, 8), 5, {
          businessDays: [1, 2, 3, 4, 5], // M-F
          exceptions: { "01/14/22": false },
        });
        expect(result).toEqual(new Date(2022, 0 /* Jan */, 17));
      });

      it("starts on a false exception", () => {
        const result = addBusinessDays(new Date(2022, 0 /* Jan */, 7), 5, {
          businessDays: [1, 2, 3, 4, 5], // M-F
          exceptions: { "01/07/22": false },
        });
        expect(result).toEqual(new Date(2022, 0 /* Jan */, 14));
      });

      it("starts on a true exception", () => {
        const result = addBusinessDays(new Date(2022, 0 /* Jan */, 8), 5, {
          businessDays: [1, 2, 3, 4, 5], // M-F
          exceptions: { "01/08/22": true },
        });
        expect(result).toEqual(new Date(2022, 0 /* Jan */, 14));
      });

      it("starts and ends on false exceptions, should move to the following working day", () => {
        const result = addBusinessDays(new Date(2022, 0 /* Jan */, 8), 6, {
          businessDays: [1, 2, 3, 4, 5, 6], // M-Sat
          exceptions: { "01/08/22": false, "01/15/22": false },
        });
        expect(result).toEqual(new Date(2022, 0 /* Jan */, 17));
      });

      it("starts and ends on true exceptions", () => {
        const result = addBusinessDays(new Date(2022, 0 /* Jan */, 8), 6, {
          businessDays: [1, 2, 3, 4, 5], // M-F
          exceptions: { "01/08/22": true, "01/15/22": true },
        });
        expect(result).toEqual(new Date(2022, 0 /* Jan */, 15));
      });

      it("handles a large number of working Saturday exceptions, including some out of range", () => {
        const result = addBusinessDays(new Date(2022, 0 /* Jan */, 3), 36, {
          businessDays: [1, 2, 3, 4, 5], // M-F
          exceptions: {
            "01/08/22": true,
            "01/15/22": true,
            "01/22/22": true,
            "01/29/22": true,
            "02/05/22": true,
            "02/12/22": true,
            "02/19/22": true, // out of range, not incl
          },
        });
        expect(result).toEqual(new Date(2022, 1 /* Jan */, 14));
      });

      it("handles a large number of working Saturday exceptions when Sundays are working days", () => {
        const result = addBusinessDays(new Date(2022, 0 /* Jan */, 3), 40, {
          businessDays: [0, 1, 2, 3, 4, 5], // Sun-F
          exceptions: {
            "01/08/22": true,
            "01/15/22": true,
            "01/22/22": true,
            "01/29/22": true,
            "02/05/22": true,
            "02/12/22": true,
            "02/19/22": true, // out of range, not incl
          },
        });
        expect(result).toEqual(new Date(2022, 1 /* Jan */, 12));
      });

      it("handles a large number of excluded Saturday exceptions, including some out of range", () => {
        const result = addBusinessDays(new Date(2022, 0 /* Jan */, 3), 36, {
          businessDays: [1, 2, 3, 4, 5, 6], // M-Sat
          exceptions: {
            "01/08/22": false,
            "01/15/22": false,
            "01/22/22": false,
            "01/29/22": false,
            "02/05/22": false,
            "02/12/22": false,
            "02/19/22": false, // out of range, not incl
          },
        });
        expect(result).toEqual(new Date(2022, 1 /* Jan */, 22));
      });
    });
  });

  describe("subBusinessDays", () => {
    it("can handle a large number of business days", function () {
      jest.setTimeout(500);

      const result = subBusinessDays(new Date(15000, 0 /* Jan */, 1), 3387885);
      expect(result).toEqual(new Date(2014, 0 /* Jan */, 1));
    });

    describe("exceptions", () => {
      it("can take in a list of enabling exceptions", () => {
        const result = subBusinessDays(new Date(2022, 0 /* Jan */, 17), 10, {
          exceptions: {
            "01/16/22": true,
            "01/09/22": true,
          },
        });
        expect(result).toEqual(new Date(2022, 0 /* Jan */, 5));
      });

      it("can take in a list of disabling exceptions", () => {
        const result = subBusinessDays(new Date(2022, 0 /* Jan */, 24), 10, {
          exceptions: {
            "01/17/22": false,
            "01/10/22": false,
          },
        });
        expect(result).toEqual(new Date(2022, 0 /* Jan */, 6));
      });

      it("can account for businessDays and exception options", () => {
        const result = subBusinessDays(new Date(2022, 0 /* Jan */, 24), 11, {
          // given businessDays of Mon-Sat
          businessDays: [1, 2, 3, 4, 5, 6],
          exceptions: {
            "01/17/22": false,
            "01/10/22": false,
          },
        });
        expect(result).toEqual(new Date(2022, 0 /* Jan */, 8));
      });
    });

    it("throws RangeError if businessDays contains numbers greater than 6", function () {
      const block = subBusinessDays.bind(null, new Date(2022, 0, 14), 10, {
        businessDays: [3, 4, 5, 6, 7],
      });
      expect(block).toThrow(RangeError);
    });
  });
});
