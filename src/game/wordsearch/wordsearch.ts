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
}

export interface WordsearchInput {
  size?: number;
  wordsConfig?: WordsConfig;
  allowedDirections?: WordsearchDirections[];
  dictionary?: string[];
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
  board: Cell[];
  words: string[];
}

const defaultConfig: WordsearchInput = {
  size: 8,
  wordsConfig: {
    amount: 4,
    minLength: 2,
    maxLength: 12,
    strict: false
  }
};

export class Wordsearch {
  constructor(config: WordsearchInput) {}
}
