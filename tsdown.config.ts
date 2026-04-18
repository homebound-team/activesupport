import path from "node:path";
import { defineConfig } from "tsdown";

export default defineConfig(() => {
  const entry: Record<string, string> = {
    index: "src/index.ts",
    utils: "src/utils.ts",
    global: "src/global.ts",
    "temporal/interval": "src/temporal/interval/interval.impl.ts",
    "temporal/interval/global": "src/temporal/interval/interval.global.ts",
    "temporal/utils": "src/temporal/utils.ts",
    temporal: "src/temporal/temporal.impl.ts",
    "temporal/global": "src/temporal/temporal.global.ts",
  };

  // Convention: the unsuffixed path is impl-only (pure functions, no global side
  // effects). The "/global" suffix installs prototype augmentations. `object`
  // has no impl form (every helper is a pure prototype augmentation), so we
  // only emit its global entry.
  for (const dir of ["array", "map", "object", "temporal/legacyDate", "temporal/plainDate", "temporal/zonedDateTime"]) {
    const basename = path.basename(dir);
    if (dir !== "object") entry[dir] = `src/${dir}/${basename}.impl.ts`;
    entry[`${dir}/global`] = `src/${dir}/${basename}.global.ts`;
  }

  return {
    entry,
    exports: {
      customExports(pkg) {
        delete pkg["./package.json"];
        return pkg;
      },
    },
    format: ["cjs", "esm"],
    sourcemap: true,
    dts: true,
  };
});
