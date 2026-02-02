import * as fs from "node:fs/promises";
import path from "node:path";
import { defineConfig } from "tsdown";

export default defineConfig(async (inlineConfig, context) => {
  const entries: (string | Record<string, string>)[] = ["src/index.ts"];
  entries.push({ utils: "src/utils.ts" });

  const promises = [
    "array",
    "map",
    "object",
    "temporal/legacyDate",
    "temporal/plainDate",
    "temporal/zonedDateTime",
  ].map(async (dir) => {
    const basename = path.basename(dir);
    if (dir !== "object") entries.push({ [`${dir}/impl`]: `src/${dir}/${basename}.impl.ts` });
    entries.push({ [dir]: `src/${dir}/${basename}.global.ts` });
    for await (const file of fs.glob(`src/${dir}/*/*.global.ts`)) {
      entries.push({ [`${dir}/${path.basename(file, ".global.ts")}`]: file });
    }
  });

  entries.push({ "temporal/interval/impl": "src/temporal/interval/interval.impl.ts" });
  entries.push({ "temporal/interval": "src/temporal/interval/interval.global.ts" });
  entries.push({ "temporal/utils": "src/temporal/utils.ts" });
  entries.push({ temporal: "src/temporal/temporal.global.ts" });

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
