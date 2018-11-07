import "mocha";
import * as chai from "chai";
import { Wordsearch } from "./wordsearch";

const expect = chai.expect;

describe("Word Search Engine:", () => {
  const ws = new Wordsearch();
  describe("Validation Errors: ", () => {
    const msg = "Board size must be between 6 and 50";
    it(msg, () => {
      ws.setConfig({ size: 1 });
      expect(() => ws.generate()).throw(msg);
    });
  });
});
