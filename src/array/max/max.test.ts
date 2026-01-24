import { Temporal } from "temporal-polyfill";
import { newPD, newZDT } from "../temporal/setupTests";
import "./index";

describe("max", () => {
  it("returns the largest highest sorting string from an array", () => {
    // Given an array of strings
    const a = ["11", "23", "222"];
    // When we call max
    const result = a.max();
    // Then we get back the highest sorting string
    expect(result).toBe("23");
  });

  it("returns the largest number from an array", () => {
    // Given an array of numbers
    const a = [1, 5, 3];
    // When we call max
    const result = a.max();
    // Then we get back the highest number
    expect(result).toBe(5);
  });

  it("returns the largest bigint from an array", () => {
    // Given an array of bigints
    const a = [1n, 5n, 3n];
    // When we call max
    const result = a.max();
    // Then we get back the highest bigints
    expect(result).toBe(5n);
  });

  it("returns the the latest date from an array", () => {
    // Given an array of dates
    const a = ["2023-05-02", "2024-05-02", "2022-05-02"].map((v) => new Date(v));
    // When we call max
    const result = a.max();
    // Then we get back the latest date
    expect(result).toEqual(new Date("2024-05-02"));
  });

  it("returns the the latest temporal plain date from an array", () => {
    // Given an array of dates
    const a = ["2023-05-02", "2024-05-02", "2022-05-02"].map((v) => newPD(v));
    // When we call max
    const result = a.max();
    // Then we get back the latest plain date
    expect(result).toEqual(Temporal.PlainDate.from("2024-05-02"));
  });

  it("returns the the latest temporal zoned date time from an array", () => {
    // Given an array of dates
    const a = ["2023-05-02T00:00:00.000Z", "2024-05-02T00:00:00.000Z", "2022-05-02T00:00:00.000Z"].map((v) =>
      newZDT(v),
    );
    // When we call max
    const result = a.max();
    // Then we get back the latest zoned date time
    expect(result).toEqual(newZDT("2024-05-02T00:00:00.000Z"));
  });

  it("returns based on a passed callback", () => {
    // Given an array of strings
    const a = ["11", "23", "222"];
    // When we call max with a callback that converts strings to numbers
    const result = a.max((v) => parseInt(v));
    // Then we get back the largest number
    expect(result).toBe(222);
  });
});
