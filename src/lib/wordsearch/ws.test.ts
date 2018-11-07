import "mocha";
import * as chai from "chai";

const expect = chai.expect;

const sum = (a, b) => {
  return a + b;
};

describe("sum function:", () => {
  it("should sum 1 + 4 = 5", () => {
      expect(sum(1,4)).equal(5);
  });
});
