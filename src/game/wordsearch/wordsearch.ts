import * as deepmerge from "deepmerge";
import * as _ from "lodash";

const wordlist = require("wordlist-english");

enum WSDirections {
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
  /**
   * send debug info to the console?
   */
  debug: boolean;
}

export interface WordsearchInput {
  size: number;
  wordsConfig: WordsConfig;
  allowedDirections: WSDirections[];
  allowWordOverlap: boolean;
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

export interface WordDrawInstruction {
  startPos: Vector2D;
  direction: WSDirections;
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
      amount: 4,
      minLength: 2,
      maxLength: 7,
      dictionary: [...commonEnglishWords],
      debug: true
    },
    allowedDirections: [
      WSDirections.DOWN,
      WSDirections.RIGHT,
      WSDirections.DOWN_RIGHT
    ],
    allowWordOverlap: true
  };
  protected output: WordsearchOutput;

  private directions2D: Vector2D[] = [
    //up
    { x: 0, y: -1 },
    //down
    { x: 0, y: 1 },
    //left
    { x: -1, y: 0 },
    //right
    { x: 1, y: 0 },
    //up right
    { x: 1, y: -1 },
    //up left
    { x: -1, y: -1 },
    //down right
    { x: 1, y: 1 },
    //down left
    { x: -1, y: 1 }
  ];

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
        const board = this.allocateWordsInBoard(words);
        const o = {
          board,
          words
        };
        console.log(o);
        this.output = o;
        return this.output;
      } catch (e) {
        throw new Error("Failed to create game: " + e.toString());
      }
    } else {
      throw new Error("Invalid configuration: " + valid.msg);
    }
  };

  private allocateWordsInBoard = (words: string[]): Cell[][] => {
    let cells: Cell[][] = [];

    cells = this.getBlankBoard();

    return cells;
  };

  /**
   * tries to fit a word in a board
   * @param {string} word
   * @param {WSDirections[]} allowedDirections
   * @returns {WordDrawInstruction | null}
   */
  private fitWordInRandomPos = (
    word: string,
    allowedDirections?: WSDirections[]
  ): WordDrawInstruction | null => {
    const directions: WSDirections[] = allowedDirections
      ? [..._.shuffle(allowedDirections)]
      : [..._.shuffle(this.config.allowedDirections)];

    //start with a random pos with in the board
    const startPos: Vector2D = {
      x: this.getRandomInteger(0, this.config.size - 1),
      y: this.getRandomInteger(0, this.config.size - 1)
    };

    //direction on which to move if cell is no good
    const checkDirection: Vector2D = this.getDirectionVector(
      WSDirections.RIGHT
    );

    return null;
  };

  /**
   * tells if a given word fits on the specified stat pos
   * and direction
   * @param {string} word
   * @param {Vector2D} startPos
   * @param {WSDirections} direction
   * @returns {boolean}
   */
  private doesWordFit = (
    word: string,
    startPos: Vector2D,
    direction: WSDirections
  ): boolean => {

    return true;
  };

  /**
   * utility to move inside the board
   * @param {Vector2D} startPos
   * @param {WSDirections} direction
   * @returns {Vector2D | null}
   */
  private moveInDirection = (
    startPos: Vector2D,
    direction: WSDirections
  ): Vector2D | null => {
    const directionVector = this.getDirectionVector(direction);
    const newVector: Vector2D = {
      x: startPos.x + directionVector.x,
      y: startPos.y + directionVector.y
    };
    if (this.isVectorInBoard(newVector)) {
      return newVector;
    }
    return null;
  };

  /**
   * checks if a vector remains inside
   * @param {Vector2D} vector
   * @returns {boolean}
   */
  private isVectorInBoard = (vector: Vector2D): boolean => {
    if (vector.x >= 0 && vector.x < this.config.size) {
      if (vector.y >= 0 && vector.y < this.config.size) {
        return true;
      }
    }
    return false;
  };

  /**
   * gets a random direction vector from allowed directions
   * @returns {Vector2D}
   */
  private getRandomAllowedDirection = (): Vector2D => {
    return this.getDirectionVector(
      this.config.allowedDirections[
        this.getRandomInteger(0, this.config.allowedDirections.length - 1)
      ]
    );
  };

  /**
   * returns a direction vector
   * @param {WSDirections} direction
   * @returns {Vector2D}
   */
  private getDirectionVector = (direction: WSDirections): Vector2D => {
    return this.directions2D[direction];
  };
  /**
   * gets a random integer from a range
   * @param {number} min
   * @param {number} max
   * @returns {number}
   */
  private getRandomInteger = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min) + min);
  };

  /**
   * resets the board
   * @returns {Cell[][]}
   */
  private getBlankBoard = (): Cell[][] => {
    const cells: Cell[][] = [];
    //blank cell
    const blankCell: Cell = {
      pos: {
        x: 0,
        y: 0
      },
      letter: "",
      discovered: false
    };

    //construct board blank
    const { size } = this.config;

    //initialize blank
    for (let x = 0; x < size; x++) {
      cells.push([]);
      for (let y = 0; y < size; y++) {
        const cell = { ...blankCell };
        cell.pos.x = x;
        cell.pos.y = y;
        cells[x].push(cell);
      }
    }
    return cells;
  };

  /**
   * returns a list of random words from the dictionary that meet
   * the configuration criteria
   * @returns {string[]}
   */
  private getRandomWordsFromDictionary = (): string[] => {
    const words: string[] = [];
    const wordCriteria = (word, list: string[]): boolean => {
      const wc = this.config.wordsConfig;
      return (
        //is a string
        typeof word === "string" &&
        //has something in it
        word.length > 0 &&
        //is aword that we dont have yet
        list.indexOf(word) < 0 &&
        //is the correct size
        word.length >= wc.minLength &&
        word.length <= wc.maxLength
      );
    };
    while (words.length < this.config.wordsConfig.amount) {
      const word = this.getRandomWord();
      const shouldWe = wordCriteria(word, words);
      if (shouldWe) {
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
