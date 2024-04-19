import { addBusinessDays, differenceInBusinessDays, subBusinessDays } from "./businessDaysUtils";

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

  describe("differenceInBusinessDays", () => {
    it("returns the number of business days between the given dates, excluding weekends", () => {
      const result = differenceInBusinessDays(new Date(2014, 6 /* Jul */, 18), new Date(2014, 0 /* Jan */, 10));
      expect(result).toBe(135);
    });

    it("can handle long ranges", () => {
      jest.setTimeout(500 /* 500 ms test timeout */);

      const result = differenceInBusinessDays(new Date(15000, 0 /* Jan */, 1), new Date(2014, 0 /* Jan */, 1));
      expect(result).toBe(3387885);
    });

    it("the same except given first date falls on a weekend", () => {
      const result = differenceInBusinessDays(new Date(2019, 6 /* Jul */, 20), new Date(2019, 6 /* Jul */, 18));
      expect(result).toBe(2);
    });

    it("the same except given second date falls on a weekend", () => {
      const result = differenceInBusinessDays(new Date(2019, 6 /* Jul */, 23), new Date(2019, 6 /* Jul */, 20));
      expect(result).toBe(1);
    });

    it("the same except both given dates fall on a weekend", () => {
      const result = differenceInBusinessDays(new Date(2019, 6 /* Jul */, 28), new Date(2019, 6 /* Jul */, 20));
      expect(result).toBe(5);
    });

    it("returns a negative number if the time value of the first date is smaller", () => {
      const result = differenceInBusinessDays(new Date(2014, 0 /* Jan */, 10), new Date(2014, 6 /* Jul */, 20));
      expect(result).toBe(-135);
    });

    it("accepts timestamps", () => {
      const result = differenceInBusinessDays(new Date(2014, 6, 18).getTime(), new Date(2014, 0, 10).getTime());
      expect(result).toBe(135);
    });

    describe("businessDays option", function () {
      it("can include Saturday in businessDays", function () {
        const result = differenceInBusinessDays(new Date(2022, 0 /* Jan */, 17), new Date(2022, 0 /* Jan */, 7), {
          businessDays: [1, 2, 3, 4, 5, 6],
        });
        expect(result).toBe(8);
      });

      it("can include Saturday in businessDays given first date falls on a non-businessDay", function () {
        const result = differenceInBusinessDays(new Date(2022, 0 /* Jan */, 16), new Date(2022, 0 /* Jan */, 7), {
          businessDays: [1, 2, 3, 4, 5, 6],
        });
        expect(result).toBe(8);
      });

      it("can include Saturday in businessDays given second date falls on a non-businessDay", function () {
        const result = differenceInBusinessDays(new Date(2022, 0 /* Jan */, 17), new Date(2022, 0 /* Jan */, 9), {
          businessDays: [1, 2, 3, 4, 5, 6],
        });
        expect(result).toBe(6);
      });

      it("can include Sunday in businessDays", function () {
        const result = differenceInBusinessDays(new Date(2022, 0 /* Jan */, 17), new Date(2022, 0 /* Jan */, 7), {
          businessDays: [0, 1, 2, 3, 4, 5],
        });
        expect(result).toBe(8);
      });

      it("can include Saturday and Sunday in businessDays", function () {
        const result = differenceInBusinessDays(new Date(2022, 0 /* Jan */, 17), new Date(2022, 0 /* Jan */, 7), {
          businessDays: [0, 1, 2, 3, 4, 5, 6],
        });
        expect(result).toBe(10);
      });

      it("throws RangeError if businessDays contains numbers greater than 6", function () {
        const block = differenceInBusinessDays.bind(null, new Date(2022, 0, 7), new Date(2022, 0, 14), {
          businessDays: [3, 4, 5, 6, 7],
        });
        expect(block).toThrow(RangeError);
      });
    });

    describe("exceptions option", function () {
      it("can add true exceptions to include days as businessDays", function () {
        // with businessDays as Mon-Fri
        const result = differenceInBusinessDays(new Date(2022, 0 /* Jan */, 17), new Date(2022, 0 /* Jan */, 7), {
          // Adding a Saturday and Sunday as business days
          exceptions: { "01/08/22": true, "01/09/22": true },
        });
        expect(result).toBe(8);
      });

      it("can add false exceptions to remove days as businessDays", function () {
        // with businessDays as Mon-Fri
        const result = differenceInBusinessDays(new Date(2022, 0 /* Jan */, 17), new Date(2022, 0 /* Jan */, 7), {
          // Removing a Tues and Wed as business days
          exceptions: { "01/11/22": false, "01/12/22": false },
        });
        expect(result).toBe(4);
      });

      it("can handle true and false exceptions", function () {
        // with businessDays as Mon-Fri
        const result = differenceInBusinessDays(new Date(2022, 0 /* Jan */, 17), new Date(2022, 0 /* Jan */, 7), {
          // Adds a Sat and Sun, removes a Tues and Wed as business days
          exceptions: {
            "01/08/22": true,
            "01/09/22": true,
            "01/11/22": false,
            "01/12/22": false,
          },
        });
        expect(result).toBe(6);
      });

      it("should only add true exceptions that are not already businessDays", function () {
        // with businessDays as Mon-Fri
        const result = differenceInBusinessDays(new Date(2022, 0 /* Jan */, 17), new Date(2022, 0 /* Jan */, 7), {
          // Adding a Sat and Sun as business days, but not Mon and Tues which are already business days
          exceptions: {
            "01/08/22": true,
            "01/09/22": true,
            "01/10/22": true,
            "01/11/22": true,
          },
        });
        expect(result).toBe(8);
      });

      it("should only remove false exceptions that are businessDays", function () {
        // with businessDays as Mon-Fri
        const result = differenceInBusinessDays(new Date(2022, 0 /* Jan */, 17), new Date(2022, 0 /* Jan */, 7), {
          // Removing a Tues and Wed as business days, but not Sat and Sun which are not business days
          exceptions: {
            "01/11/22": false,
            "01/12/22": false,
            "01/15/22": false,
            "01/16/22": false,
          },
        });
        expect(result).toBe(4);
      });

      it("can handle exceptions that fall on both of the argument dates", function () {
        // with businessDays as Mon-Fri
        const result = differenceInBusinessDays(
          // Sunday
          new Date(2022, 0 /* Jan */, 16),
          // Saturday
          new Date(2022, 0 /* Jan */, 8),
          {
            // Adds business days
            exceptions: {
              "01/08/22": true,
              "01/09/22": true,
              "01/16/22": true,
            },
          },
        );
        expect(result).toBe(7);
      });

      it("can handle true exceptions that fall on both of the argument dates, with a Sat business day", function () {
        const result = differenceInBusinessDays(
          // Sunday
          new Date(2022, 0 /* Jan */, 16),
          // Sunday
          new Date(2022, 0 /* Jan */, 9),
          {
            // with businessDays as Mon-Sat
            businessDays: [1, 2, 3, 4, 5, 6],
            // Adds two Sundays as business days
            exceptions: {
              "01/09/22": true,
              "01/16/22": true,
            },
          },
        );
        expect(result).toBe(7);
      });

      it("can handle an exception that falls on the first date", function () {
        // with businessDays as Mon-Fri
        const result = differenceInBusinessDays(
          // Sunday
          new Date(2022, 0 /* Jan */, 16),
          // Saturday
          new Date(2022, 0 /* Jan */, 8),
          {
            exceptions: {
              // Saturday
              "01/08/22": true,
              // Sunday
              "01/09/22": true,
            },
          },
        );
        expect(result).toBe(6);
      });

      it("can handle an exception that falls on the second date", function () {
        // with businessDays as Mon-Fri
        const result = differenceInBusinessDays(
          // Sunday
          new Date(2022, 0 /* Jan */, 16),
          // Saturday
          new Date(2022, 0 /* Jan */, 8),
          {
            exceptions: {
              // Saturday
              "01/09/22": true,
              // Sunday
              "01/16/22": true,
            },
          },
        );
        expect(result).toBe(6);
      });

      it("should not add exceptions that are not within the date range", function () {
        // with businessDays as Mon-Fri
        const result = differenceInBusinessDays(new Date(2022, 0 /* Jan */, 17), new Date(2022, 0 /* Jan */, 7), {
          // the first and last date are not within the date range, so they should not be added
          exceptions: {
            "01/01/22": true,
            "01/08/22": true,
            "01/09/22": true,
            "01/22/22": true,
          },
        });
        expect(result).toBe(8);
      });

      it("can handle a large amount of enabled Saturday exceptions", function () {
        // with businessDays as Mon-Fri
        const result = differenceInBusinessDays(new Date(2022, 1 /* Feb */, 14), new Date(2022, 0 /* Jan */, 3), {
          // the first and last date are not within the date range, so they should not be added
          exceptions: {
            "01/08/22": true,
            "01/15/22": true,
            "01/22/22": true,
            "01/29/22": true,
            "02/05/22": true,
            "02/12/22": true,
            "02/19/22": true, // extra exception that should not be included
          },
        });
        expect(result).toBe(36);
      });

      it("can handle false exceptions when calculating a 0 day difference", function () {
        const result = differenceInBusinessDays(new Date(2018, 0 /* Jan */, 1), new Date(2018, 0 /* Jan */, 1), {
          businessDays: [0, 1, 2, 3, 4, 5, 6],
          exceptions: { "01/01/18": false },
        });
        expect(result).toBe(0);
      });

      it("can handle false exceptions when calculating a negative difference", function () {
        const result = differenceInBusinessDays(new Date(2018, 0 /* Jan */, 1), new Date(2018, 0 /* Jan */, 8), {
          businessDays: [0, 1, 2, 3, 4, 5, 6],
          exceptions: { "01/06/18": false, "01/07/18": false },
        });
        expect(result).toBe(-5);
      });

      it("can handle false exceptions when calculating a negative difference across years", function () {
        const result = differenceInBusinessDays(new Date(2017, 11 /* Nov */, 25), new Date(2018, 0 /* Jan */, 1), {
          businessDays: [0, 1, 2, 3, 4, 5, 6],
          exceptions: { "12/30/17": false, "12/31/17": false },
        });
        expect(result).toBe(-5);
      });
    });

    describe("edge cases", function () {
      it("the difference is less than a day, but the given dates are in different calendar days", function () {
        const result = differenceInBusinessDays(
          new Date(2014, 8 /* Sep */, 5, 0, 0),
          new Date(2014, 8 /* Sep */, 4, 23, 59),
        );
        expect(result).toBe(1);
      });

      it("the same for the swapped dates", () => {
        const result = differenceInBusinessDays(
          new Date(2014, 8 /* Sep */, 4, 23, 59),
          new Date(2014, 8 /* Sep */, 5, 0, 0),
        );
        expect(result).toBe(-1);
      });

      it("the time values of the given dates are the same", () => {
        const result = differenceInBusinessDays(
          new Date(2014, 8 /* Sep */, 5, 0, 0),
          new Date(2014, 8 /* Sep */, 4, 0, 0),
        );
        expect(result).toBe(1);
      });

      it("the given dates are the same", () => {
        const result = differenceInBusinessDays(
          new Date(2014, 8 /* Sep */, 5, 0, 0),
          new Date(2014, 8 /* Sep */, 5, 0, 0),
        );
        expect(result).toBe(0);
      });

      it("returns NaN if the first date is `Invalid Date`", () => {
        const result = differenceInBusinessDays(new Date(NaN), new Date(2017, 0 /* Jan */, 1));
        expect(result).toBeNaN();
      });

      it("returns NaN if the second date is `Invalid Date`", () => {
        const result = differenceInBusinessDays(new Date(2017, 0 /* Jan */, 1), new Date(NaN));
        expect(result).toBeNaN();
      });

      it("returns NaN if the both dates are `Invalid Date`", () => {
        const result = differenceInBusinessDays(new Date(NaN), new Date(NaN));
        expect(result).toBeNaN();
      });
    });
  });
});
