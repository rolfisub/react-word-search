import * as React from "react";
import * as fetch from "isomorphic-fetch";
import { config } from "./config";
import { WordsearchInput } from "../lib/wordsearch/wordsearch";
import { Board } from "./components/board";
import { Grid } from "@material-ui/core";
import { SettingsReduxForm } from "./components/settings.form";
import { connect } from "react-redux";
import { gameActionCreators } from "./redux/game.actions";
import { GameStoreState } from "./game.types";

interface GameProps {
  gameState: GameStoreState;
  setConfig: (wsConfig: Partial<WordsearchInput>) => void;
}

class GameClass extends React.Component<GameProps> {
  componentDidMount() {
    this.loadDictionary();
  }

  loadDictionary = async () => {
    try {
      const response = await fetch(config.api + "ws/dictionary");
      const words = await response.json();
      this.props.setConfig({
        wordsConfig: {
          dictionary: words
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    if (this.props.gameState) {
      const { gameState } = this.props;
      return (
        <Grid container>
          <Grid item xs={12} sm={12} md={6}>
            <Board {...gameState.current.game} />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <SettingsReduxForm />
          </Grid>
        </Grid>
      );
    } else {
      return <p>Loading...</p>;
    }
  }
}

const mapStateToProps = (state, props) => {
  return {
    ...props,
    gameState: state.reducers.GameReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setConfig: async (wsConfig: Partial<WordsearchInput>) => {
      dispatch(gameActionCreators.setConfig(wsConfig));
    }
  };
};

export const Game = connect(
  mapStateToProps,
  mapDispatchToProps
)(GameClass);
