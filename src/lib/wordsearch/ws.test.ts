import "mocha";
import * as chai from "chai";
import { Wordsearch } from "./wordsearch";

const expect = chai.expect;

describe("Word Search Engine:", () => {
  const ws = new Wordsearch();
  describe("Validation Errors: ", () => {
    const msg = "Board size must be between 6 and 50";
    it(msg + " min test", () => {
      ws.setConfig({ size: 5 });
      expect(() => ws.generate()).throw(msg);
    });
    it(msg + " max test", () => {
      ws.setConfig({ size: 51 });
      expect(() => ws.generate()).throw(msg);
    });
  });
});
