import * as fs from "fs";
import * as path from "path";

const SRC_DIR = path.join(__dirname, "..", "src");

interface BarrelEntry {
  dirName: string;
  fileName: string;
  exportName?: string;
  useExportStar: boolean;
}

function getImplFiles(dir: string): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  return entries
    .filter((e) => e.isFile() && e.name.endsWith(".impl.ts") && !e.name.includes(".test."))
    .map((e) => e.name);
}

function getGlobalFiles(dir: string): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  return entries.filter((e) => e.isFile() && e.name.endsWith(".global.ts")).map((e) => e.name);
}

function getSubdirectories(dir: string): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  return entries.filter((e) => e.isDirectory()).map((e) => e.name);
}

function parseExports(filePath: string): { names: string[]; useExportStar: boolean } {
  const content = fs.readFileSync(filePath, "utf-8");

  const exportedNames = new Set<string>();

  // Match: export function name( or export async function name(
  const funcMatches = content.matchAll(/export\s+(?:async\s+)?function\s+(\w+)\s*[<(]/g);
  for (const match of funcMatches) {
    exportedNames.add(match[1]);
  }

  // Match: export const name =
  // Also handles: export const [a, b, c] = (destructuring)
  const constMatches = content.matchAll(/export\s+const\s+(\w+|\[[^\]]+\])\s*=/g);
  for (const match of constMatches) {
    const name = match[1];
    if (name.startsWith("[")) {
      // Destructuring - multiple exports
      const names = name
        .slice(1, -1)
        .split(",")
        .map((n) => n.trim());
      names.forEach((n) => exportedNames.add(n));
    } else {
      exportedNames.add(name);
    }
  }

  // Match: export class name
  const classMatches = content.matchAll(/export\s+class\s+(\w+)/g);
  for (const match of classMatches) {
    exportedNames.add(match[1]);
  }

  // Match: export type name
  const typeMatches = content.matchAll(/export\s+type\s+(\w+)/g);
  for (const match of typeMatches) {
    exportedNames.add(match[1]);
  }

  // Match: export interface name
  const interfaceMatches = content.matchAll(/export\s+interface\s+(\w+)/g);
  for (const match of interfaceMatches) {
    exportedNames.add(match[1]);
  }

  // Match: export { name } or export { name1, name2 }
  const namedExportMatches = content.matchAll(/export\s*\{\s*([^}]+)\s*\}/g);
  for (const match of namedExportMatches) {
    const names = match[1].split(",").map((n) => n.trim());
    names.forEach((n) => exportedNames.add(n));
  }

  const uniqueNames = Array.from(exportedNames);

  // Get the base name of the file (without .impl.ts)
  const baseName = path.basename(filePath, ".impl.ts");

  // If one export matches the file name, prefer that and use named export
  // Otherwise, if multiple exports, use export *
  const primaryExport = uniqueNames.find((name) => name === baseName);
  const useExportStar = !primaryExport && uniqueNames.length > 1;

  // Reorder to put primary export first if it exists
  if (primaryExport) {
    return { names: [primaryExport, ...uniqueNames.filter((n) => n !== primaryExport)], useExportStar };
  }

  return { names: uniqueNames, useExportStar };
}

function collectBarrelEntries(dir: string, type: "impl" | "global"): BarrelEntry[] {
  const entries: BarrelEntry[] = [];
  const subdirs = getSubdirectories(dir);

  for (const subdir of subdirs) {
    const subdirPath = path.join(dir, subdir);
    const files = type === "impl" ? getImplFiles(subdirPath) : getGlobalFiles(subdirPath);

    // Find the main file (not a barrel file - those would have the parent dir name)
    const mainFile = files.find((f) => {
      const baseName = f.replace(type === "impl" ? ".impl.ts" : ".global.ts", "");
      // It's a leaf file if the base name is NOT the same as the parent directory name
      // OR if it's the only file
      return baseName !== path.basename(dir);
    });

    if (mainFile) {
      const fileName = mainFile.replace(type === "impl" ? ".impl.ts" : ".global.ts", "");

      if (type === "impl") {
        const filePath = path.join(subdirPath, mainFile);
        const { names, useExportStar } = parseExports(filePath);
        entries.push({
          dirName: subdir,
          fileName,
          exportName: names[0],
          useExportStar,
        });
      } else {
        entries.push({
          dirName: subdir,
          fileName,
          useExportStar: false,
        });
      }
    }
  }

  // Sort alphabetically by directory name
  entries.sort((a, b) => a.dirName.localeCompare(b.dirName));

  return entries;
}

function generateImplBarrel(entries: BarrelEntry[]): string {
  const lines = entries.map((e) => {
    if (e.useExportStar) {
      return `export * from "./${e.dirName}/${e.fileName}.impl";`;
    }
    return `export { ${e.exportName} } from "./${e.dirName}/${e.fileName}.impl";`;
  });
  return lines.join("\n") + "\n";
}

function generateGlobalBarrel(entries: BarrelEntry[]): string {
  const lines = entries.map((e) => `import "./${e.dirName}/${e.fileName}.global";`);
  return lines.join("\n") + "\n";
}

function processDirectory(dir: string, barrelBaseName: string): void {
  const implEntries = collectBarrelEntries(dir, "impl");
  const globalEntries = collectBarrelEntries(dir, "global");

  if (implEntries.length > 0) {
    const implContent = generateImplBarrel(implEntries);
    const implPath = path.join(dir, `${barrelBaseName}.impl.ts`);
    fs.writeFileSync(implPath, implContent);
    console.log(`Generated: ${path.relative(SRC_DIR, implPath)}`);
  }

  if (globalEntries.length > 0) {
    const globalContent = generateGlobalBarrel(globalEntries);
    const globalPath = path.join(dir, `${barrelBaseName}.global.ts`);
    fs.writeFileSync(globalPath, globalContent);
    console.log(`Generated: ${path.relative(SRC_DIR, globalPath)}`);
  }
}

function main(): void {
  // Process src/array
  processDirectory(path.join(SRC_DIR, "array"), "array");

  // Process src/map
  processDirectory(path.join(SRC_DIR, "map"), "map");

  // Process src/temporal subdirectories (except interval)
  const temporalDir = path.join(SRC_DIR, "temporal");
  const temporalSubdirs = getSubdirectories(temporalDir).filter((d) => d !== "interval");

  for (const subdir of temporalSubdirs) {
    processDirectory(path.join(temporalDir, subdir), subdir);
  }

  // Process src/temporal itself (for the temporal.global.ts that imports subdirectory globals)
  // This is special - it imports from subdirectories that have their own barrel files
  const temporalGlobalEntries: BarrelEntry[] = [];
  for (const subdir of getSubdirectories(temporalDir)) {
    const subdirPath = path.join(temporalDir, subdir);
    const globalFiles = getGlobalFiles(subdirPath);
    const barrelFile = globalFiles.find((f) => f === `${subdir}.global.ts`);
    if (barrelFile) {
      temporalGlobalEntries.push({
        dirName: subdir,
        fileName: subdir,
        useExportStar: false,
      });
    }
  }

  if (temporalGlobalEntries.length > 0) {
    temporalGlobalEntries.sort((a, b) => a.dirName.localeCompare(b.dirName));
    const globalContent = generateGlobalBarrel(temporalGlobalEntries);

    // Read existing file to preserve the declare module section
    const existingPath = path.join(temporalDir, "temporal.global.ts");
    let declareSection = "";
    if (fs.existsSync(existingPath)) {
      const existing = fs.readFileSync(existingPath, "utf-8");
      const declareMatch = existing.match(/\n(declare module[\s\S]*)/);
      if (declareMatch) {
        declareSection = "\n" + declareMatch[1];
      }
    }

    fs.writeFileSync(existingPath, globalContent + declareSection);
    console.log(`Generated: temporal/temporal.global.ts`);
  }

  console.log("\nDone!");
}

main();
