/**
 * Patches the bundled `dist/**\/global.d.{cts,mts}` files to work around two
 * bugs in tsdown's dts bundler.
 *
 * Bug 1 — top-level barrel imports get tree-shaken.
 *   `src/global.ts` is a barrel of side-effect-only imports — each imported
 *   file does nothing but `declare global { ... }`. When tsdown bundles its
 *   `.d.ts` output via `rolldown-plugin-dts`, rolldown's tree-shaker strips
 *   side-effect imports of modules that are themselves separate build entries
 *   (`array/global`, `map/global`, `object/global`, `temporal/global`). The
 *   result: at runtime `dist/global.cjs/mjs` correctly pulls in every barrel,
 *   but the bundled type declarations only carry the temporal augmentations
 *   (and even those only because they happen to inline as hashed shards
 *   instead of resolving to entry chunks).
 *
 *   `dts: { sideEffects: true }`, `treeshake: false`, and
 *   `treeshake: { moduleSideEffects: true }` all fail to suppress this — see
 *   upstream rolldown/rolldown#4738 (`moduleSideEffects` non-deterministic in
 *   dts) and rolldown/tsdown#391. Both open as of tsdown 0.21.10, which
 *   actually regresses further: every barrel-of-barrels collapses to
 *   `export {};`, including the temporal one that worked on 0.20.1.
 *
 *   Fix: rewrite `dist/global.d.{cts,mts}` with explicit imports of the
 *   per-area entry declarations.
 *
 * Bug 2 — `declare global` blocks emitted as ambient scripts.
 *   `dist/map/global.d.{cts,mts}` and `dist/object/global.d.{cts,mts}` consist
 *   only of `declare global { ... }` with no imports or exports. Without a
 *   top-level import/export, TypeScript treats the file as a global script,
 *   and TS2669 forbids `declare global` outside a module context. (The array
 *   barrel escapes this because it imports utility types.)
 *
 *   Fix: append `export {};` to those four files so TS treats them as modules.
 *
 * Both fixes can be removed once the upstream issues are resolved.
 */
import * as fs from "fs";
import * as path from "path";

const DIST_DIR = path.join(__dirname, "..", "dist");

const BARRELS = ["array", "map", "object", "temporal"] as const;

const MODULE_MARKER_FILES = ["map/global.d.cts", "map/global.d.mts", "object/global.d.cts", "object/global.d.mts"];

function writeBarrel(file: string, ext: "cjs" | "mjs"): void {
  const body = BARRELS.map((b) => `import "./${b}/global.${ext}";`).join("\n") + "\n";
  fs.writeFileSync(file, body);
}

function ensureModule(file: string): void {
  const abs = path.join(DIST_DIR, file);
  const content = fs.readFileSync(abs, "utf8");
  if (/^\s*(import|export)\b/m.test(content)) return;
  fs.writeFileSync(abs, content + "\nexport {};\n");
}

writeBarrel(path.join(DIST_DIR, "global.d.cts"), "cjs");
writeBarrel(path.join(DIST_DIR, "global.d.mts"), "mjs");
MODULE_MARKER_FILES.forEach(ensureModule);
