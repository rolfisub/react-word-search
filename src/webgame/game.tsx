import * as React from "react";
import * as fetch from "isomorphic-fetch";
import { config } from "../config";
import { Wordsearch, WordsearchOutput } from "../lib/wordsearch/wordsearch";
import { Board } from "./components/board";
import { Grid } from "@material-ui/core";
import { GenerateFormReduxForm } from "./components/generate.form";

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
    try {
      const response = await fetch(config.api + "ws/dictionary");
      const words = await response.json();
      this.ws.setConfig({
        wordsConfig: {
          dictionary: [...words]
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    return (
      <Grid container>
        <Grid item xs={12} sm={12} md={6}>
          <Board {...this.state.gameBoard} />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <GenerateFormReduxForm />
        </Grid>
      </Grid>
    );
  }
}
