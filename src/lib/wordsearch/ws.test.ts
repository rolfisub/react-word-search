import "mocha";
import * as chai from "chai";
import { Wordsearch } from "./wordsearch";

const expect = chai.expect;

describe("Word Search Engine:", () => {
  describe("Config Validation: ", () => {
    describe("Validation Errors Board Size: ", () => {
      const ws = new Wordsearch();
      //board size
      const boardSize =
        "Invalid configuration: Board size must be between 6 and 50";
      it(boardSize + " min test", () => {
        expect(() => ws.generate({ size: 5 })).throw(boardSize);
      });
      it(boardSize + " max test", () => {
        expect(() => ws.generate({ size: 51 })).throw(boardSize);
      });
    });

    describe("Validation Errors Word Amount: ", () => {
      const ws = new Wordsearch();
      //amount of words
      const wordAmount =
        "Invalid configuration: Amount of words must be between 1 and 50.";
      it(wordAmount + " min test", () => {
        expect(() => ws.generate({ wordsConfig: { amount: 0 } })).throw(
          wordAmount
        );
      });
      it(wordAmount + " max test", () => {
        expect(() => ws.generate({ wordsConfig: { amount: 51 } })).throw(
          wordAmount
        );
      });
    });

    describe("Validation Errors Word Length: ", () => {
      const ws = new Wordsearch();
      it("Word min length.", () => {
        const minWordLength =
          "Invalid configuration: Word min length must be less than board size.";
        expect(() => ws.generate({ wordsConfig: { minLength: 30 } })).throw(
          minWordLength
        );
        ws.setConfig({ wordsConfig: { minLength: 2 } });
      });
      it("Word max length.", () => {
        const maxWordLength =
          "Invalid configuration: Word max length should not be more than board size.";
        expect(() => ws.generate({ wordsConfig: { maxLength: 30 } })).throw(
          maxWordLength
        );
      });
    });

    describe("Dictionary Validation: ", () => {
      const ws = new Wordsearch();
      it("Word amount cannot be greater than available.", () => {
        const wordAmount =
          "Invalid configuration: Amount of words cannot be greater than available ones.";
        expect(() =>
          ws.generate({
            wordsConfig: { dictionary: ["alto", "bajo"], amount: 3 }
          })
        ).throw(wordAmount);
      });
    });

    describe("Direction validation: ", () => {
      const ws = new Wordsearch();
      it("At least one direction.", () => {
        const atLeastOneDir =
          "Invalid configuration: At least one direction must be specified";
        expect(() =>
          ws.generate({
            allowedDirections: []
          })
        ).throw(atLeastOneDir);
      });
    });
  });

  describe("Public API:", () => {
    //getOutput
    describe("getOutput", () => {
      const ws = new Wordsearch();
      it("exists", () => {
        expect(ws.getOutput()).equal(undefined);
      });
    });
    //setConfig
    //getConfig
    //showWord
    //generate
    //selectCell
    //resetCurrentSelection
    //submitCurrentWord
  });
});
