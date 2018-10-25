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
   * should the engine generate a board only
   * if strictly all the words fit, if false it will try
   * to fit as many as it can
   */
  strict: boolean;
  /**
   * list of words to pick from
   */
  dictionary: string[];
  /**
   * pick random?
   */
  random: boolean;
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
      amount: 60,
      minLength: 2,
      maxLength: 12,
      strict: false,
      dictionary: [...commonEnglishWords],
      random: true
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

  public setConfig = (config?: Partial<WordsearchInput>) => {
    if (config) {
      this.config = deepmerge(this.defaultConfig, config, {
        arrayMerge: takeSrcArray
      });
    }
    return !!config;
  };

  public generate = (config?: Partial<WordsearchInput>): WordsearchOutput => {
    this.setConfig(config);
    if (this.validConfig()) {
      try {
        const words = this.getRandomWordsFromDictionary();
        const o = {
          board: [],
          words
        };
        this.output = o;
        return this.output;
      } catch (e) {
        throw new Error("Failed to create game: " + e.toString());
      }
    } else {
      throw new Error("Invalid configuration.");
    }
  };

  /**
   * TODO: validate configuration
   * @returns {boolean}
   */
  private validConfig = (): boolean => {
    return true;
  };

  private getRandomWordsFromDictionary = (): string[] => {
    const words: string[] = [];

    while (words.length < this.config.wordsConfig.amount) {
      const word = this.getRandomWord();
      if (words.indexOf(word) < 0) {
        words.push(word);
      }
    }

    return words;
  };

  private getRandomWord = (): string => {
    let word = "";

    while (
      word.length < this.config.wordsConfig.minLength ||
      word.length > this.config.wordsConfig.maxLength
    ) {
      const randInt = Math.floor(
        Math.random() * this.config.wordsConfig.dictionary.length - 1
      );
      word = this.config.wordsConfig.dictionary[randInt];
    }
    return word;
  };
}
