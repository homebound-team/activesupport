import "./object";

describe("object", () => {
  it("allows classes to overwrite activesupport property extensions", () => {
    const methods = ["toEntries", "toValues", "toKeys"];
    methods.forEach((method) => {
      class Test {
        constructor() {
          this[method] = () => "overwritten";
        }
      }

      const test = new Test();
      expect(test[method]()).toEqual("overwritten");
    });
  });
});
