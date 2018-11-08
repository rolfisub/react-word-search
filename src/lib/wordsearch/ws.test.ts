import "mocha";
import * as chai from "chai";
import { Wordsearch } from "./wordsearch";

const expect = chai.expect;

describe("Word Search Engine:", () => {
  const ws = new Wordsearch();
  describe("Config Validation: ", () => {
    describe("Validation Errors Board Size: ", () => {
      //board size
      const boardSize =
        "Invalid configuration: Board size must be between 6 and 50";
      it(boardSize + " min test", () => {
        ws.setConfig({ size: 5 });
        expect(() => ws.generate()).throw(boardSize);
      });
      it(boardSize + " max test", () => {
        ws.setConfig({ size: 51 });
        expect(() => ws.generate()).throw(boardSize);
        //set to normal range
        ws.setConfig({ size: 16 });
      });
    });

    describe("Validation Errors Word Amount: ", () => {
      //amount of words
      const wordAmount =
        "Invalid configuration: Amount of words must be between 1 and 50.";
      it(wordAmount + " min test", () => {
        ws.setConfig({ wordsConfig: { amount: 0 } });
        //console.log(ws.getConfig());
        expect(() => ws.generate()).throw(wordAmount);
      });
      it(wordAmount + " max test", () => {
        ws.setConfig({ wordsConfig: { amount: 51 } });
        //console.log(ws.getConfig());
        expect(() => ws.generate()).throw(wordAmount);
        //set to normal range
        ws.setConfig({ wordsConfig: { amount: 4 } });
      });
    });

    describe("Validation Errors Word Length: ", () => {
      it("Word min length.", () => {
        const minWordLength =
          "Invalid configuration: Word min length must be less than board size.";
        ws.setConfig({ wordsConfig: { minLength: 30 } });
        expect(() => ws.generate()).throw(minWordLength);
        ws.setConfig({ wordsConfig: { minLength: 2 } });
      });
      it("Word max length.", () => {
        const maxWordLength =
          "Invalid configuration: Word max length should not be more than board size.";
        ws.setConfig({ wordsConfig: { maxLength: 30 } });
        expect(() => ws.generate()).throw(maxWordLength);
        ws.setConfig({ wordsConfig: { maxLength: 10 } });
      });
    });

    describe("Dictionary Validation: ", () => {
      it("Word amount cannot be greater than available.", () => {
        const wordAmount =
          "Invalid configuration: Amount of words cannot be greater than available ones.";
        ws.setConfig({
          wordsConfig: { dictionary: ["alto", "bajo"], amount: 3 }
        });
        expect(() => ws.generate()).throw(wordAmount);
        //set passing range
        ws.setConfig({
          wordsConfig: { dictionary: ["alto", "bajo"], amount: 1 }
        });
      });
    });

    describe("Direction validation: ", () => {
      it("At least one direction.", () => {
        const atLeastOneDir =
          "Invalid configuration: At least one direction must be specified";
        ws.setConfig({ allowedDirections: [] });
        expect(() => ws.generate()).throw(atLeastOneDir);
      });
    });
  });
});
