// get the Object's properties before we mess with the prototype
const builtinProps = Object.getOwnPropertyNames(Object.prototype);

import "./index";

describe("object", () => {
  // now figure out which properties are actually new
  const props = Object.getOwnPropertyNames(Object.prototype).filter((property) => !builtinProps.includes(property));

  it.each(props)("allows classes to overwrite activesupport property extension - %s", (prop) => {
    class Test {
      constructor() {
        this[prop] = () => "overwritten";
      }
    }

    const test = new Test();
    expect(test[prop]()).toEqual("overwritten");
  });
});
