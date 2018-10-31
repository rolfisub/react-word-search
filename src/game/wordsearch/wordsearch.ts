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
  word: string;
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
    size: 15,
    wordsConfig: {
      amount: 4,
      minLength: 4,
      maxLength: 8,
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
    { x: -1, y: 0 },
    //down
    { x: 1, y: 0 },
    //left
    { x: 0, y: -1 },
    //right
    { x: 0, y: 1 },
    //up right
    { x: -1, y: 1 },
    //up left
    { x: -1, y: -1 },
    //down right
    { x: 1, y: 1 },
    //down left
    { x: 1, y: -1 }
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
        const blankBoard = this.getBlankBoard();
        this.output = {
          words,
          board: blankBoard
        };

        //run all modifications needed
        this.allocateWordsInBoard(words);
        this.consolePrintBoard();
        //fill in chars
        this.fillInRandomChars();
        //debug
        this.consolePrintBoard();

        console.log("words:", words);

        return this.output;
      } catch (e) {
        throw new Error("Failed to create game: " + e.toString());
      }
    } else {
      throw new Error("Invalid configuration: " + valid.msg);
    }
  };

  /**
   * will go trough each cell and place a random letter if empty
   */
  private fillInRandomChars = () => {
    for (let x = 0; x < this.config.size; x++) {
      for (let y = 0; y < this.config.size; y++) {
        if (!this.output.board[x][y].letter) {
          this.output.board[x][y].letter = this.getRandomChar();
        }
      }
    }
  };

  /**
   * returns a random char a-z range
   * @returns {string}
   */
  private getRandomChar = (): string => {
    const abc = "abcdefghijklmnopqrstuvwxyz";
    const charPos = this.getRandomInteger(0, abc.length - 1);
    return abc[charPos];
  };

  /**
   * prints an ascii representation of the board to the console
   */
  private consolePrintBoard = () => {
    for (let x = 0; x < this.config.size; x++) {
      for (let y = 0; y < this.config.size; y++) {
        const lett = this.output.board[x][y].letter
          ? this.output.board[x][y].letter
          : " ";
        process.stdout.write("|" + lett);
      }
      console.log("|");
    }
  };

  /**
   * tries to allocate all the words in a current board
   * @param {string[]} words
   * @returns {Cell[][]}
   */
  private allocateWordsInBoard = (words: string[]) => {
    let w = 0;
    const l = words.length;
    while (w < l) {
      const wd = this.fitWordInRandomPos(words[w]);
      if (wd) {
        this.drawWordInBoard(wd);
      }
      w++;
    }
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

    //get random ordered cells
    const randomCells = [
      ...(_.shuffle(_.flattenDeep(this.output.board)) as Cell[])
    ];

    while (randomCells.length) {
      //check each direction and pos
      const cell = randomCells.pop();
      for (let d = 0; d < directions.length; d++) {
        if (cell) {
          if (this.doesWordFit(word, cell.pos, directions[d])) {
            if (!this.doesWordCollide(word, cell.pos, directions[d])) {
              return {
                word,
                startPos: cell.pos,
                direction: directions[d]
              };
            }
          }
        }
      }
    }

    return null;
  };

  /**
   * draws a word in a board
   * @param {WordDrawInstruction} wd
   * @returns {Cell[][]}
   */
  private drawWordInBoard = (wd: WordDrawInstruction): Cell[][] => {
    const cells = this.output.board;
    const startPos: Vector2D = wd.startPos;
    //draw the first letter
    cells[startPos.x][startPos.y].letter = wd.word[0];

    let newPos: Vector2D | null = startPos;
    for (let c = 1; c < wd.word.length; c++) {
      newPos = this.moveInDirection(newPos as Vector2D, wd.direction);
      if (newPos) {
        cells[newPos.x][newPos.y].letter = wd.word[c];
      }
    }

    return cells;
  };

  /**
   * checks if a word collides or not
   * @param {string} word
   * @param {Vector2D} startPos
   * @param {WSDirections} direction
   * @returns {boolean}
   */
  private doesWordCollide = (
    word: string,
    startPos: Vector2D,
    direction: WSDirections
  ): boolean => {
    let collision = false;
    let newPos: Vector2D = { ...startPos };
    for (let c = 0; c < word.length; c++) {
      if (this.isCharCollision(word[c], newPos)) {
        collision = true;
      }
      const np = this.moveInDirection(newPos, direction);
      if (np) {
        newPos = np;
      } else {
        return true;
      }
    }
    return collision;
  };

  /**
   * if allow overlap is true, it will return false if char is the same,
   * else it will return true for any character that is not empty
   * @param {string} char
   * @param {Vector2D} pos
   */
  private isCharCollision = (char: string, pos: Vector2D): boolean => {
    const boardChar = this.output.board[pos.x][pos.y].letter;
    if (this.config.allowWordOverlap) {
      if (boardChar === char) {
        return false;
      }
    }
    return !!boardChar;
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
    if (!this.isVectorInBoard(startPos)) {
      return false;
    }
    let tempV: Vector2D | null = { ...startPos };
    for (let c = 0; c < word.length; c++) {
      if (tempV) {
        tempV = this.moveInDirection(tempV, direction);
      } else {
        return false;
      }
    }
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

    //construct board blank
    const { size } = this.config;

    //initialize blank
    for (let x = 0; x < size; x++) {
      cells.push([]);
      for (let y = 0; y < size; y++) {
        cells[x].push({
          pos: {
            x,
            y
          },
          letter: "",
          discovered: false
        });
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
