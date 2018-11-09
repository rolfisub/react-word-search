import * as React from "react";
import * as fetch from "isomorphic-fetch";
import { config } from "./config";
import { WordsearchInput } from "../lib/wordsearch/wordsearch";
import { connect } from "react-redux";
import { gameActionCreators } from "./redux/game.actions";
import { Layout } from "./components/layout";

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
    return <Layout />;
  }
}

const mapStateToProps = (state, props) => props;

const mapDispatchToProps = dispatch => {
  return {
    setConfig: async (wsConfig: Partial<WordsearchInput>) => {
      await dispatch(gameActionCreators.setConfig(wsConfig));
      await dispatch(gameActionCreators.create());
    }
  };
};

export const Game = connect(
  mapStateToProps,
  mapDispatchToProps
)(GameClass);
