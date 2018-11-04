import * as React from "react";
import { connect } from "react-redux";
import { Button } from "@material-ui/core";
import { gameActionCreators } from "../redux/game.actions";

interface WordProps {
  word: string;
  showWord: (word: string) => void;
}

class WordClass extends React.Component<WordProps> {
  showWord = () => {
    this.props.showWord(this.props.word);
  };
  render() {
    return (
      <div style={{float:"left", margin: 2, border:"1px dotted"}}>
        <p>{this.props.word}</p>
        <Button
          variant={"contained"}
          size={"small"}
          color={"secondary"}
          onClick={this.showWord}
        >
          Show
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
