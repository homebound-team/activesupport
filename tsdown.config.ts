import path from "node:path";
import { defineConfig } from "tsdown";

export default defineConfig(async (inlineConfig, context) => {
  const entries: (string | Record<string, string>)[] = ["src/index.ts"];
  entries.push({ utils: "src/utils.ts" });

  // Convention: the unsuffixed path is impl-only (pure functions, no global side
  // effects). The "/global" suffix installs prototype augmentations. `object`
  // has no impl form (every helper is a pure prototype augmentation), so we
  // only emit its global entry.
  const promises = [
    "array",
    "map",
    "object",
    "temporal/legacyDate",
    "temporal/plainDate",
    "temporal/zonedDateTime",
  ].map(async (dir) => {
    const basename = path.basename(dir);
    if (dir !== "object") entries.push({ [dir]: `src/${dir}/${basename}.impl.ts` });
    entries.push({ [`${dir}/global`]: `src/${dir}/${basename}.global.ts` });
    // TODO: figure out why this causes tsdown to have a memory leak and take 30+ seconds to process
    // for await (const file of fs.glob(`src/${dir}/*/*.global.ts`)) {
    //   entries.push({ [`${dir}/${path.basename(file, ".global.ts")}`]: file });
    // }
  });

  entries.push({ "temporal/interval": "src/temporal/interval/interval.impl.ts" });
  entries.push({ "temporal/interval/global": "src/temporal/interval/interval.global.ts" });
  entries.push({ "temporal/utils": "src/temporal/utils.ts" });
  entries.push({ temporal: "src/temporal/temporal.impl.ts" });
  entries.push({ "temporal/global": "src/temporal/temporal.global.ts" });
  entries.push({ global: "src/global.ts" });

  await Promise.all(promises);

  const exports = {
    customExports(pkg, context) {
      delete pkg["./package.json"];
      return pkg;
    },
  };

  return entries.map((entry) => ({
    entry,
    exports,
    format: ["cjs", "esm"],
    sourcemap: true,
    dts: true,
  }));
});
