import { readFileSync } from "fs";
import { join } from "path";
import "./object";

describe("object", () => {
  const methods = extractObjectExtensions();

  it.each(methods)("allows classes to overwrite activesupport property extension - %s", (method) => {
    class Test {
      constructor() {
        this[method] = () => "overwritten";
      }
    }

    const test = new Test();
    expect(test[method]()).toEqual("overwritten");
  });
});

function extractObjectExtensions(): string[] {
  // This is pretty basic right now - if the file becomes more complex, consider using an AST parser.
  const file = readFileSync(join(__dirname, "object.ts"), "utf8");
  const methods = [...file.matchAll(/Object\.defineProperty\(Object\.prototype, "(\w+)"/g)].map((match) => match[1]);

  if (methods.length === 0) throw new Error("Could not extract extension methods using regex!");

  return methods;
}
