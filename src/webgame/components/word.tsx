import * as React from "react";
import { connect } from "react-redux";
import { Button } from "@material-ui/core";
import { gameActionCreators } from "../redux/game.actions";
import { Word as WordInterface } from "../../lib/wordsearch/wordsearch";

export interface WordProps extends WordInterface {
  showWord: (word: string) => void;
}

class WordClass extends React.Component<WordProps> {
  showWord = () => {
    this.props.showWord(this.props.word);
  };
  render() {
    const { found, shown, word } = this.props;
    return (
      <div style={{ float: "left", margin: 2 }}>
        <Button
          variant={"extendedFab"}
          size={"small"}
          color={found ? "primary" : shown ? "secondary" : "default"}
          onClick={this.showWord}
        >
          {word}
        </Button>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => props;

const mapDispatchToProps = (dispatch, props) => {
  return {
    ...props,
    showWord: (word: string) => {
      dispatch(gameActionCreators.showWord(word));
    }
  };
};

export const Word = connect(
  mapStateToProps,
  mapDispatchToProps
)(WordClass);
