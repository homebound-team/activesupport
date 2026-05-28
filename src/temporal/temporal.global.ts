// The runtime fallback must come first so `globalThis.Temporal` is set before any
// per-method augmentation file tries to patch its prototypes.
import "./temporalRuntime.global";

import "./interval/interval.global";
import "./legacyDate/legacyDate.global";
import "./plainDate/plainDate.global";
import "./types.global";
import "./zonedDateTime/zonedDateTime.global";
