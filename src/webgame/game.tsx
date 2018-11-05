import * as React from "react";
import * as fetch from "isomorphic-fetch";
import { config } from "./config";
import { WordsearchInput } from "../lib/wordsearch/wordsearch";
import { Board } from "./components/board";
import { Grid } from "@material-ui/core";
import { SettingsReduxForm } from "./components/settings.form";
import { connect } from "react-redux";
import { gameActionCreators } from "./redux/game.actions";

interface GameProps {
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
    return (
      <Grid container>
        <Grid item xs={12} sm={12} md={6}>
          <Board />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <SettingsReduxForm />
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state, props) => props;

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
