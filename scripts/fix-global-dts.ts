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
const TEMPORAL_AREAS = ["interval", "legacyDate", "plainDate", "zonedDateTime"] as const;

const MODULE_MARKER_FILES = ["map/global.d.cts", "map/global.d.mts", "object/global.d.cts", "object/global.d.mts"];

function writeBarrel(file: string, ext: "cjs" | "mjs"): void {
  const body = BARRELS.map((b) => `import "./${b}/global.${ext}";`).join("\n") + "\n";
  fs.writeFileSync(file, body);
}

function writeTemporalBarrel(file: string, ext: "cjs" | "mjs"): void {
  const body = TEMPORAL_AREAS.map((a) => `import "./${a}/global.${ext}";`).join("\n") + "\n";
  fs.writeFileSync(file, body);
}

/**
 * Each per-area `dist/temporal/<area>/global.d.{cts,mts}` is emitted as empty
 * `export {};` because tsdown moved the actual `declare global { ... }` blocks
 * into hashed sibling shards (e.g. `dist/plainDate.global-XXX.d.cts`). Rewire
 * the per-area entry to side-effect-import its shard so the augmentations
 * reach consumers.
 */
function writeAreaShardImport(area: (typeof TEMPORAL_AREAS)[number], ext: "cjs" | "mjs"): void {
  const dts = ext === "cjs" ? "d.cts" : "d.mts";
  const shards = fs.readdirSync(DIST_DIR).filter((n) => n.startsWith(`${area}.global-`) && n.endsWith(`.${dts}`));
  if (shards.length !== 1) {
    throw new Error(`Expected exactly one ${area}.global-* shard with extension ${dts}, found: ${shards.join(", ")}`);
  }
  const shardBase = shards[0].slice(0, -(dts.length + 1));
  const out = path.join(DIST_DIR, "temporal", area, `global.${dts}`);
  fs.writeFileSync(out, `import "../../${shardBase}.${ext}";\n`);
}

function ensureModule(absPath: string): void {
  const content = fs.readFileSync(absPath, "utf8");
  if (/^\s*(import|export)\b/m.test(content)) return;
  fs.writeFileSync(absPath, content + "\nexport {};\n");
}

writeBarrel(path.join(DIST_DIR, "global.d.cts"), "cjs");
writeBarrel(path.join(DIST_DIR, "global.d.mts"), "mjs");
writeTemporalBarrel(path.join(DIST_DIR, "temporal", "global.d.cts"), "cjs");
writeTemporalBarrel(path.join(DIST_DIR, "temporal", "global.d.mts"), "mjs");
TEMPORAL_AREAS.forEach((a) => {
  writeAreaShardImport(a, "cjs");
  writeAreaShardImport(a, "mjs");
});
MODULE_MARKER_FILES.forEach((file) => ensureModule(path.join(DIST_DIR, file)));

// Shards are imported as side-effects only; without an `export {};` they're
// treated as ambient scripts, which breaks `declare global` augmentation.
for (const name of fs.readdirSync(DIST_DIR)) {
  if (!/\.d\.[cm]ts$/.test(name)) continue;
  if (!TEMPORAL_AREAS.some((a) => name.startsWith(`${a}.global-`))) continue;
  ensureModule(path.join(DIST_DIR, name));
}
