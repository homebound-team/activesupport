import { newZDT } from "../setupTests";

describe("differenceInBusinessDays", () => {
  it("returns the number of business days between the given dates, excluding weekends", () => {
    const result = newZDT("2014-07-18T00:00:00.000Z").differenceInBusinessDays(newZDT("2014-01-10T00:00:00.000Z"));
    expect(result).toBe(135);
  });

  it("can handle long ranges", () => {
    jest.setTimeout(500 /* 500 ms test timeout */);
    const result = newZDT("2000-01-01T00:00:00.000Z")
      .with({ year: 15000 })
      .differenceInBusinessDays(newZDT("2014-01-01T00:00:00.000Z"));
    expect(result).toBe(3387885);
  });

  it("the same except given first date falls on a weekend", () => {
    const result = newZDT("2019-07-20T00:00:00.000Z").differenceInBusinessDays(newZDT("2019-07-18T00:00:00.000Z"));
    expect(result).toBe(2);
  });

  it("the same except given second date falls on a weekend", () => {
    const result = newZDT("2019-07-23T00:00:00.000Z").differenceInBusinessDays(newZDT("2019-07-20T00:00:00.000Z"));
    expect(result).toBe(1);
  });

  it("the same except both given dates fall on a weekend", () => {
    const result = newZDT("2019-07-28T00:00:00.000Z").differenceInBusinessDays(newZDT("2019-07-20T00:00:00.000Z"));
    expect(result).toBe(5);
  });

  it("returns a negative number if the time value of the first date is smaller", () => {
    const result = newZDT("2014-01-10T00:00:00.000Z").differenceInBusinessDays(newZDT("2014-07-20T00:00:00.000Z"));
    expect(result).toBe(-135);
  });

  describe("businessDays option", function () {
    it("can include Saturday in businessDays", function () {
      const result = newZDT("2022-01-17T00:00:00.000Z").differenceInBusinessDays(newZDT("2022-01-07T00:00:00.000Z"), {
        businessDays: [1, 2, 3, 4, 5, 6],
      });
      expect(result).toBe(8);
    });

    it("can include Saturday in businessDays given first date falls on a non-businessDay", function () {
      const result = newZDT("2022-01-16T00:00:00.000Z").differenceInBusinessDays(newZDT("2022-01-07T00:00:00.000Z"), {
        businessDays: [1, 2, 3, 4, 5, 6],
      });
      expect(result).toBe(8);
    });

    it("can include Saturday in businessDays given second date falls on a non-businessDay", function () {
      const result = newZDT("2022-01-17T00:00:00.000Z").differenceInBusinessDays(newZDT("2022-01-09T00:00:00.000Z"), {
        businessDays: [1, 2, 3, 4, 5, 6],
      });
      expect(result).toBe(6);
    });

    it("can include Sunday in businessDays", function () {
      const result = newZDT("2022-01-17T00:00:00.000Z").differenceInBusinessDays(newZDT("2022-01-07T00:00:00.000Z"), {
        businessDays: [7, 1, 2, 3, 4, 5],
      });
      expect(result).toBe(8);
    });

    it("can include Saturday and Sunday in businessDays", function () {
      const result = newZDT("2022-01-17T00:00:00.000Z").differenceInBusinessDays(newZDT("2022-01-07T00:00:00.000Z"), {
        businessDays: [7, 1, 2, 3, 4, 5, 6],
      });
      expect(result).toBe(10);
    });

    it("throws RangeError if businessDays contains numbers greater than 7", function () {
      const block = () =>
        newZDT("2022-01-07T00:00:00.000Z").differenceInBusinessDays(newZDT("2022-01-14T00:00:00.000Z"), {
          businessDays: [4, 5, 6, 7, 8],
        });
      expect(block).toThrow(RangeError);
    });
  });

  describe("exceptions option", function () {
    it("can add true exceptions to include days as businessDays", function () {
      // with businessDays as Mon-Fri
      const result = newZDT("2022-01-17T00:00:00.000Z").differenceInBusinessDays(newZDT("2022-01-07T00:00:00.000Z"), {
        // Adding a Saturday and Sunday as business days
        exceptions: { "2022-01-08": true, "2022-01-09": true },
      });
      expect(result).toBe(8);
    });

    it("can add false exceptions to remove days as businessDays", function () {
      // with businessDays as Mon-Fri
      const result = newZDT("2022-01-17T00:00:00.000Z").differenceInBusinessDays(newZDT("2022-01-07T00:00:00.000Z"), {
        // Removing a Tues and Wed as business days
        exceptions: { "2022-01-11": false, "2022-01-12": false },
      });
      expect(result).toBe(4);
    });

    it("can handle true and false exceptions", function () {
      // with businessDays as Mon-Fri
      const result = newZDT("2022-01-17T00:00:00.000Z").differenceInBusinessDays(newZDT("2022-01-07T00:00:00.000Z"), {
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
      const result = newZDT("2022-01-17T00:00:00.000Z").differenceInBusinessDays(newZDT("2022-01-07T00:00:00.000Z"), {
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
      const result = newZDT("2022-01-17T00:00:00.000Z").differenceInBusinessDays(newZDT("2022-01-07T00:00:00.000Z"), {
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
      const result =
        // Sunday
        newZDT("2022-01-16T00:00:00.000Z").differenceInBusinessDays(
          // Saturday
          newZDT("2022-01-08T00:00:00.000Z"),
          {
            // Adds business days
            exceptions: {
              "2022-01-08": true,
              "2022-01-09": true,
              "2022-01-16": true,
            },
          },
        );
      expect(result).toBe(7);
    });

    it("can handle true exceptions that fall on both of the argument dates, with a Sat business day", function () {
      const result =
        // Sunday
        newZDT("2022-01-16T00:00:00.000Z").differenceInBusinessDays(
          // Sunday
          newZDT("2022-01-09T00:00:00.000Z"),
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
      const result =
        // Sunday
        newZDT("2022-01-16T00:00:00.000Z").differenceInBusinessDays(
          // Saturday
          newZDT("2022-01-08T00:00:00.000Z"),
          {
            exceptions: {
              // Saturday
              "2022-01-08": true,
              // Sunday
              "2022-01-09": true,
            },
          },
        );
      expect(result).toBe(6);
    });

    it("can handle an exception that falls on the second date", function () {
      // with businessDays as Mon-Fri
      const result =
        // Sunday
        newZDT("2022-01-16T00:00:00.000Z").differenceInBusinessDays(
          // Saturday
          newZDT("2022-01-08T00:00:00.000Z"),
          {
            exceptions: {
              // Saturday
              "2022-01-09": true,
              // Sunday
              "2022-01-16": true,
            },
          },
        );
      expect(result).toBe(6);
    });

    it("should not add exceptions that are not within the date range", function () {
      // with businessDays as Mon-Fri
      const result = newZDT("2022-01-17T00:00:00.000Z").differenceInBusinessDays(newZDT("2022-01-07T00:00:00.000Z"), {
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
      const result = newZDT("2022-02-14T00:00:00.000Z").differenceInBusinessDays(newZDT("2022-01-03T00:00:00.000Z"), {
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
      const result = newZDT("2018-01-01T00:00:00.000Z").differenceInBusinessDays(newZDT("2018-01-01T00:00:00.000Z"), {
        businessDays: [7, 1, 2, 3, 4, 5, 6],
        exceptions: { "2018-01-01": false },
      });
      expect(result).toBe(0);
    });

    it("can handle false exceptions when calculating a negative difference", function () {
      const result = newZDT("2018-01-01T00:00:00.000Z").differenceInBusinessDays(newZDT("2018-01-08T00:00:00.000Z"), {
        businessDays: [7, 1, 2, 3, 4, 5, 6],
        exceptions: { "2018-01-06": false, "2018-01-07": false },
      });
      expect(result).toBe(-5);
    });

    it("can handle false exceptions when calculating a negative difference across years", function () {
      const result = newZDT("2017-12-25T00:00:00.000Z").differenceInBusinessDays(newZDT("2018-01-01T00:00:00.000Z"), {
        businessDays: [7, 1, 2, 3, 4, 5, 6],
        exceptions: { "2017-12-30": false, "2017-12-31": false },
      });
      expect(result).toBe(-5);
    });
  });

  describe("edge cases", function () {
    it("the difference is less than a day, but the given dates are in different calendar days", function () {
      const result = newZDT("2014-09-05T00:00:00.000Z").differenceInBusinessDays(newZDT("2014-09-04T23:59:00.000Z"));
      expect(result).toBe(1);
    });

    it("the same for the swapped dates", () => {
      const result = newZDT("2014-09-04T23:59:00.000Z").differenceInBusinessDays(newZDT("2014-09-05T00:00:00.000Z"));
      expect(result).toBe(-1);
    });

    it("the time values of the given dates are the same", () => {
      const result = newZDT("2014-09-05T00:00:00.000Z").differenceInBusinessDays(newZDT("2014-09-04T00:00:00.000Z"));
      expect(result).toBe(1);
    });

    it("the given dates are the same", () => {
      const result = newZDT("2014-09-05T00:00:00.000Z").differenceInBusinessDays(newZDT("2014-09-05T00:00:00.000Z"));
      expect(result).toBe(0);
    });
  });
});
