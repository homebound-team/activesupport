import { Temporal } from "temporal-polyfill";
import { newPD, newZDT } from "../temporal/setupTests";
import "./index";

describe("min", () => {
  it("returns the smallest sorting string from an array", () => {
    // Given an array of strings
    const a = ["-11", "-22", "-222"];
    // When we call min
    const result = a.min();
    // Then we get back the highest sorting string
    expect(result).toBe("-11");
  });

  it("returns the smallest number from an array", () => {
    // Given an array of numbers
    const a = [1, 5, 3];
    // When we call min
    const result = a.min();
    // Then we get back the highest number
    expect(result).toBe(1);
  });

  it("returns the smallest bigint from an array", () => {
    // Given an array of bigints
    const a = [1n, 5n, 3n];
    // When we call min
    const result = a.min();
    // Then we get back the highest bigints
    expect(result).toBe(1n);
  });

  it("returns the the earliest date from an array", () => {
    // Given an array of dates
    const a = ["2023-05-02", "2024-05-02", "2022-05-02"].map((v) => new Date(v));
    // When we call min
    const result = a.min();
    // Then we get back the earliest date
    expect(result).toEqual(new Date("2022-05-02"));
  });

  it("returns the the earliest temporal plain date from an array", () => {
    // Given an array of dates
    const a = ["2023-05-02", "2024-05-02", "2022-05-02"].map((v) => newPD(v));
    // When we call min
    const result = a.min();
    // Then we get back the earliest plain date
    expect(result).toEqual(Temporal.PlainDate.from("2022-05-02"));
  });

  it("returns the the earliest temporal zoned date time from an array", () => {
    // Given an array of dates
    const a = ["2023-05-02T00:00:00.000Z", "2024-05-02T00:00:00.000Z", "2022-05-02T00:00:00.000Z"].map((v) =>
      newZDT(v),
    );
    // When we call min
    const result = a.min();
    // Then we get back the earliest zoned date time
    expect(result).toEqual(newZDT("2022-05-02T00:00:00.000Z"));
  });

  it("returns based on a passed callback", () => {
    // Given an array of strings
    const a = ["-11", "-22", "-222"];
    // When we call min with a callback that converts strings to numbers
    const result = a.min((v) => parseInt(v));
    // Then we get back the smallest number
    expect(result).toBe(-222);
  });
});
