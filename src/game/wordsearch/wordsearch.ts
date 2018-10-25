import * as deepmerge from "deepmerge";

const wordlist = require("wordlist-english");

enum WordsearchDirections {
  UP,
  DOWN,
  LEFT,
  RIGHT,
  UP_RIGHT,
  UP_LEFT,
  DOWN_RIGHT,
  DOWN_LEFT
}

interface WordsConfig {
  /**
   * amount of words to generate
   */
  amount: number;
  /**
   * minimum word size
   */
  minLength: number;
  /**
   * max word size
   */
  maxLength: number;
  /**
   * list of words to pick from
   */
  dictionary: string[];
}

export interface WordsearchInput {
  size: number;
  wordsConfig: WordsConfig;
  allowedDirections: WordsearchDirections[];
}

interface Vector2D {
  x: number;
  y: number;
}

interface Cell {
  pos: Vector2D;
  letter: string;
  discovered: boolean;
}

export interface WordsearchOutput {
  board: Cell[][];
  words: string[];
}

export interface ValidationMsg {
  valid: boolean;
  msg: string;
}

const commonEnglishWords = [
  ...wordlist["english/american/10"],
  ...wordlist["english/american/20"],
  ...wordlist["english/american/30"],
  ...wordlist["english/american/40"],
  ...wordlist["english/american/50"],
  ...wordlist["english/american/60"]
];

const takeSrcArray = (dest, src) => {
  return src;
};

export class Wordsearch {
  protected config: WordsearchInput;
  protected defaultConfig: WordsearchInput = {
    size: 8,
    wordsConfig: {
      amount: 40,
      minLength: 2,
      maxLength: 6,
      dictionary: [...commonEnglishWords]
    },
    allowedDirections: [
      WordsearchDirections.DOWN,
      WordsearchDirections.RIGHT,
      WordsearchDirections.DOWN_RIGHT
    ]
  };
  protected output: WordsearchOutput;

  constructor(config?: Partial<WordsearchInput>) {
    if (!this.setConfig(config)) {
      this.config = { ...this.defaultConfig };
    }
  }

  /**
   * Sets a config param or all of it
   * @param {Partial<WordsearchInput>} config
   * @returns {boolean}
   */
  public setConfig = (config?: Partial<WordsearchInput>) => {
    if (config) {
      this.config = deepmerge(this.defaultConfig, config, {
        arrayMerge: takeSrcArray
      });
    }
    return !!config;
  };

  /**
   * generates a board with the current input
   * @param {Partial<WordsearchInput>} config
   * @returns {WordsearchOutput}
   */
  public generate = (config?: Partial<WordsearchInput>): WordsearchOutput => {
    this.setConfig(config);
    const valid = this.validConfig();
    if (valid.valid) {
      try {
        const words = this.getRandomWordsFromDictionary();
        const o = {
          board: [],
          words
        };
        console.log(words);
        this.output = o;
        return this.output;
      } catch (e) {
        throw new Error("Failed to create game: " + e.toString());
      }
    } else {
      throw new Error("Invalid configuration: " + valid.msg);
    }
  };

  /**
   * returns a list of random words from the dictionary that meet
   * the configuration criteria
   * @returns {string[]}
   */
  private getRandomWordsFromDictionary = (): string[] => {
    const words: string[] = [];
    const wordCriteria = (word: string, list: string[]): boolean => {
      const wc = this.config.wordsConfig;
      return (
        !!word &&
        list.indexOf(word) < 0 &&
        word.length >= wc.minLength &&
        word.length <= wc.minLength
      );
    };
    while (words.length < this.config.wordsConfig.amount) {
      const word = this.getRandomWord();
      if (wordCriteria(word, words)) {
        words.push(word);
      }
    }

    return words;
  };

  /**
   * just gets a random word
   * @returns {string}
   */
  private getRandomWord = (): string => {
    const randInt = parseInt(
      Math.floor(
        Math.random() * this.config.wordsConfig.dictionary.length
      ).toString(),
      10
    );
    return this.config.wordsConfig.dictionary[randInt];
  };

  /**
   * validates a config input before generating a new game
   * @returns {Partial<ValidationMsg>}
   */
  private validConfig = (): Partial<ValidationMsg> => {
    const invalid: ValidationMsg = {
      valid: false,
      msg: ""
    };
    //check size of board
    if (this.config.size < 6 || this.config.size > 50) {
      invalid.msg = "Board size must be between 6 and 50";
      return invalid;
    }

    //check that amount of words are between 1 and 50
    const wc = this.config.wordsConfig;
    if (wc.amount < 1 || wc.amount > 50) {
      invalid.msg = "Amount of words must be between 1 and 50.";
      return invalid;
    }

    //check that word size is less than board size
    if (wc.minLength > this.config.size) {
      invalid.msg = "Word min length must be less than board size.";
      return invalid;
    }

    if (wc.maxLength > this.config.size) {
      invalid.msg = "Word max length should not be more than board size.";
      return invalid;
    }

    //validate that dictionary contains enough words
    if (wc.dictionary.length < wc.amount) {
      invalid.msg = "Amount of words cannot be greater than available ones.";
      return invalid;
    }

    //empty dictionary
    if (wc.dictionary.length === 0) {
      invalid.msg = "dictionary is empty";
      return invalid;
    }

    //at least one direction
    if (this.config.allowedDirections.length < 1) {
      invalid.msg = "At least one direction must be specified";
      return invalid;
    }

    /**
     * TODO: more complex validations here like:
     * is game doable?
     * can we fit all those words?
     * etc
     */

    return {
      valid: true
    };
  };
}
