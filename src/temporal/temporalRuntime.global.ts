// / <reference types="temporal-polyfill/global" />
import { Temporal as PolyfillTemporal } from "temporal-polyfill";

// Ensure `globalThis.Temporal` is set before any of our augmentation files run, so they
// can patch the right prototype regardless of which underlying implementation is in use.
//
// We deliberately do NOT use `import "temporal-polyfill/global"`, because that
// unconditionally overwrites the native `Temporal`. Native is shipping in Chrome 137+
// and Firefox 140+; Node 26+ enables it by default (earlier versions support it behind
// a flag). Native is faster and stays current with browser-level spec / DST / security
// fixes — so we only install the polyfill when nothing is already on the global,
// preserving native where present and polyfilling where absent.
if (typeof (globalThis as { Temporal?: unknown }).Temporal === "undefined") {
  Object.defineProperty(globalThis, "Temporal", {
    value: PolyfillTemporal,
    configurable: true,
    writable: true,
  });
}
