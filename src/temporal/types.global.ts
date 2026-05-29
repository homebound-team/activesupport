// The global `Temporal` namespace and its classes come from TypeScript's built-in
// `lib.esnext.temporal.d.ts` (enabled via `"lib": ["ESNext"]` in tsconfig.json).
// At runtime, `globalThis.Temporal` must be provided by the host — native Temporal
// is available in Node 26+, Chrome 137+, and Firefox 140+.
export {};

declare global {
  namespace Temporal {
    type DayOfWeek = 1 | 2 | 3 | 4 | 5 | 6 | 7;

    type BusinessDayOptions = {
      businessDays?: DayOfWeek[];
      // ISO 8601 Date format
      exceptions?: Record<string, boolean>;
    };

    interface WeekOptions {
      /** Which day the week starts on. */
      weekStartsOn?: DayOfWeek;
    }
  }
}
