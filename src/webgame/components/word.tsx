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
    return (
      <div style={{ float: "left", margin: 2, border: "1px dotted" }}>
        <p>{this.props.word}</p>
        {this.props.found ? <p>YEY!</p> : null}
        {this.props.shown ? <p>cheat!</p> : null}
        {!this.props.found && !this.props.shown ? (
          <Button
            variant={"contained"}
            size={"small"}
            color={"secondary"}
            onClick={this.showWord}
          >
            Show
          </Button>
        ) : null}
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
