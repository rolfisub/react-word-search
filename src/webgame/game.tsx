import * as React from "react";
import * as fetch from "isomorphic-fetch";
import { config } from "../config";
import { Wordsearch, WordsearchOutput } from "../lib/wordsearch/wordsearch";
import { Board } from "./components/board";
interface GameState {
  gameBoard: WordsearchOutput;
}
export class Game extends React.Component<any, GameState> {
  protected ws: Wordsearch;

  constructor(props) {
    super(props);
    this.ws = new Wordsearch();
    this.state = {
      gameBoard: {
        board: [],
        words: []
      }
    };
  }

  componentDidMount() {
    this.loadDictionary().then(() => {
      this.newGame();
    });
  }

  newGame = () => {
    this.setState({
      gameBoard: this.ws.generate()
    });
  };

  loadDictionary = async () => {
    const response = await fetch(config.api + "ws/dictionary");
    const words = await response.json();
    this.ws.setConfig({
      wordsConfig: {
        dictionary: [...words]
      }
    });
  };

  render() {
    return <Board {...this.state.gameBoard} />;
  }
}
