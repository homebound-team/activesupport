// `temporal-spec/global` is a type-only side-effect module — its runtime .js / .cjs files
// are empty, but its .d.ts does `declare global { namespace Temporal { ... } }`, which is
// what makes the global `Temporal` namespace (with all its classes) visible to TypeScript.
// We use this rather than `temporal-polyfill/global` because the latter unconditionally
// overwrites a native `Temporal` at runtime — see `temporalRuntime.global.ts`.
import "temporal-spec/global";

export {};

// Augmentations to the global `Temporal` namespace.
//
// We augment `declare global` rather than `declare module "temporal-polyfill"` (or
// `"temporal-spec"`) because module-scoped namespace augmentation in TypeScript creates
// a *new*, type-only namespace inside the augmented module. When that merges with the
// original `export namespace Temporal { class PlainDate { ... } }`, the merged namespace
// loses its value side — so consumers can no longer write `Temporal.PlainDate.from(...)`.
//
// Augmenting the *global* `Temporal` namespace sidesteps this: global namespace merging
// preserves both the original classes (declared by temporal-spec via /global) and our
// added interfaces / types.
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
