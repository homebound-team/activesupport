import { Temporal } from "temporal-polyfill";
import { newPD } from "../setupTests";

describe("differenceInBusinessDays", () => {
  it("returns the number of business days between the given dates, excluding weekends", () => {
    const result = newPD("2014-07-18").differenceInBusinessDays(newPD("2014-01-10"));
    expect(result).toBe(135);
  });

  it("can handle long ranges", () => {
    jest.setTimeout(500 /* 500 ms test timeout */);
    const result = new Temporal.PlainDate(15000, 1, 1).differenceInBusinessDays(newPD("2014-01-01"));
    expect(result).toBe(3387885);
  });

  it("the same except given first date falls on a weekend", () => {
    const result = newPD("2019-07-20").differenceInBusinessDays(newPD("2019-07-18"));
    expect(result).toBe(2);
  });

  it("the same except given second date falls on a weekend", () => {
    const result = newPD("2019-07-23").differenceInBusinessDays(newPD("2019-07-20"));
    expect(result).toBe(1);
  });

  it("the same except both given dates fall on a weekend", () => {
    const result = newPD("2019-07-28").differenceInBusinessDays(newPD("2019-07-20"));
    expect(result).toBe(5);
  });

  it("returns a negative number if the time value of the first date is smaller", () => {
    const result = newPD("2014-01-10").differenceInBusinessDays(newPD("2014-07-20"));
    expect(result).toBe(-135);
  });

  describe("businessDays option", function () {
    it("can include Saturday in businessDays", function () {
      const result = newPD("2022-01-17").differenceInBusinessDays(newPD("2022-01-07"), {
        businessDays: [1, 2, 3, 4, 5, 6],
      });
      expect(result).toBe(8);
    });

    it("can include Saturday in businessDays given first date falls on a non-businessDay", function () {
      const result = newPD("2022-01-16").differenceInBusinessDays(newPD("2022-01-07"), {
        businessDays: [1, 2, 3, 4, 5, 6],
      });
      expect(result).toBe(8);
    });

    it("can include Saturday in businessDays given second date falls on a non-businessDay", function () {
      const result = newPD("2022-01-17").differenceInBusinessDays(newPD("2022-01-09"), {
        businessDays: [1, 2, 3, 4, 5, 6],
      });
      expect(result).toBe(6);
    });

    it("can include Sunday in businessDays", function () {
      const result = newPD("2022-01-17").differenceInBusinessDays(newPD("2022-01-07"), {
        businessDays: [7, 1, 2, 3, 4, 5],
      });
      expect(result).toBe(8);
    });

    it("can include Saturday and Sunday in businessDays", function () {
      const result = newPD("2022-01-17").differenceInBusinessDays(newPD("2022-01-07"), {
        businessDays: [7, 1, 2, 3, 4, 5, 6],
      });
      expect(result).toBe(10);
    });

    it("throws RangeError if businessDays contains numbers greater than 7", function () {
      const block = () =>
        newPD("2022-01-07").differenceInBusinessDays(newPD("2022-01-14"), {
          businessDays: [3, 4, 5, 6, 8],
        });
      expect(block).toThrow(RangeError);
    });
  });

  describe("exceptions option", function () {
    it("can add true exceptions to include days as businessDays", function () {
      // with businessDays as Mon-Fri
      const result = newPD("2022-01-17").differenceInBusinessDays(newPD("2022-01-07"), {
        // Adding a Saturday and Sunday as business days
        exceptions: { "2022-01-08": true, "2022-01-09": true },
      });
      expect(result).toBe(8);
    });

    it("can add false exceptions to remove days as businessDays", function () {
      // with businessDays as Mon-Fri
      const result = newPD("2022-01-17").differenceInBusinessDays(newPD("2022-01-07"), {
        // Removing a Tues and Wed as business days
        exceptions: { "2022-01-11": false, "2022-01-12": false },
      });
      expect(result).toBe(4);
    });

    it("can handle true and false exceptions", function () {
      // with businessDays as Mon-Fri
      const result = newPD("2022-01-17").differenceInBusinessDays(newPD("2022-01-07"), {
        // Adds a Sat and Sun, removes a Tues and Wed as business days
        exceptions: {
          "2022-01-08": true,
          "2022-01-09": true,
          "2022-01-11": false,
          "2022-01-12": false,
        },
      });
      expect(result).toBe(6);
    });

    it("should only add true exceptions that are not already businessDays", function () {
      // with businessDays as Mon-Fri
      const result = newPD("2022-01-17").differenceInBusinessDays(newPD("2022-01-07"), {
        // Adding a Sat and Sun as business days, but not Mon and Tues which are already business days
        exceptions: {
          "2022-01-08": true,
          "2022-01-09": true,
          "2022-01-10": true,
          "2022-01-11": true,
        },
      });
      expect(result).toBe(8);
    });

    it("should only remove false exceptions that are businessDays", function () {
      // with businessDays as Mon-Fri
      const result = newPD("2022-01-17").differenceInBusinessDays(newPD("2022-01-07"), {
        // Removing a Tues and Wed as business days, but not Sat and Sun which are not business days
        exceptions: {
          "2022-01-11": false,
          "2022-01-12": false,
          "2022-01-15": false,
          "2022-01-16": false,
        },
      });
      expect(result).toBe(4);
    });

    it("can handle exceptions that fall on both of the argument dates", function () {
      // with businessDays as Mon-Fri
      const sunday = newPD("2022-01-16");
      const saturday = newPD("2022-01-08");
      const result = sunday.differenceInBusinessDays(saturday, {
        exceptions: { "2022-01-08": true, "2022-01-09": true, "2022-01-16": true },
      });
      expect(result).toBe(7);
    });

    it("can handle true exceptions that fall on both of the argument dates, with a Sat business day", function () {
      const result =
        // Sunday
        newPD("2022-01-16").differenceInBusinessDays(
          // Sunday
          newPD("2022-01-09"),
          {
            // with businessDays as Mon-Sat
            businessDays: [1, 2, 3, 4, 5, 6],
            // Adds two Sundays as business days
            exceptions: {
              "2022-01-09": true,
              "2022-01-16": true,
            },
          },
        );
      expect(result).toBe(7);
    });

    it("can handle an exception that falls on the first date", function () {
      // with businessDays as Mon-Fri
      const sunday = newPD("2022-01-16");
      const saturday = newPD("2022-01-08");
      const result = sunday.differenceInBusinessDays(saturday, {
        exceptions: {
          // Saturday
          "2022-01-08": true,
          // Sunday
          "2022-01-09": true,
        },
      });
      expect(result).toBe(6);
    });

    it("can handle an exception that falls on the second date", function () {
      // with businessDays as Mon-Fri
      const sunday = newPD("2022-01-16");
      const saturday = newPD("2022-01-08");
      const result = sunday.differenceInBusinessDays(saturday, {
        exceptions: {
          // Saturday
          "2022-01-09": true,
          // Sunday
          "2022-01-16": true,
        },
      });
      expect(result).toBe(6);
    });

    it("should not add exceptions that are not within the date range", function () {
      // with businessDays as Mon-Fri
      const result = newPD("2022-01-17").differenceInBusinessDays(newPD("2022-01-07"), {
        // the first and last date are not within the date range, so they should not be added
        exceptions: {
          "2022-01-01": true,
          "2022-01-08": true,
          "2022-01-09": true,
          "2022-01-22": true,
        },
      });
      expect(result).toBe(8);
    });

    it("can handle a large amount of enabled Saturday exceptions", function () {
      // with businessDays as Mon-Fri
      const result = newPD("2022-02-14").differenceInBusinessDays(newPD("2022-01-03"), {
        // the first and last date are not within the date range, so they should not be added
        exceptions: {
          "2022-01-08": true,
          "2022-01-15": true,
          "2022-01-22": true,
          "2022-01-29": true,
          "2022-02-05": true,
          "2022-02-12": true,
          "2022-02-19": true, // extra exception that should not be included
        },
      });
      expect(result).toBe(36);
    });

    it("can handle false exceptions when calculating a 0 day difference", function () {
      const result = newPD("2018-01-01").differenceInBusinessDays(newPD("2018-01-01"), {
        businessDays: [7, 1, 2, 3, 4, 5, 6],
        exceptions: { "2018-01-01": false },
      });
      expect(result).toBe(0);
    });

    it("can handle false exceptions when calculating a negative difference", function () {
      const result = newPD("2018-01-01").differenceInBusinessDays(newPD("2018-01-08"), {
        businessDays: [7, 1, 2, 3, 4, 5, 6],
        exceptions: { "2018-01-06": false, "2018-01-07": false },
      });
      expect(result).toBe(-5);
    });

    it("can handle false exceptions when calculating a negative difference across years", function () {
      const result = newPD("2017-12-25").differenceInBusinessDays(newPD("2018-01-01"), {
        businessDays: [7, 1, 2, 3, 4, 5, 6],
        exceptions: { "2017-12-30": false, "2017-12-31": false },
      });
      expect(result).toBe(-5);
    });
  });

  describe("edge cases", function () {
    it("the difference is less than a day, but the given dates are in different calendar days", function () {
      const result = newPD("2014-09-05").differenceInBusinessDays(newPD("2014-09-04"));
      expect(result).toBe(1);
    });

    it("the same for the swapped dates", () => {
      const result = newPD("2014-09-04").differenceInBusinessDays(newPD("2014-09-05"));
      expect(result).toBe(-1);
    });

    it("the time values of the given dates are the same", () => {
      const result = newPD("2014-09-05").differenceInBusinessDays(newPD("2014-09-04"));
      expect(result).toBe(1);
    });

    it("the given dates are the same", () => {
      const result = newPD("2014-09-05").differenceInBusinessDays(newPD("2014-09-05"));
      expect(result).toBe(0);
    });
  });
});
