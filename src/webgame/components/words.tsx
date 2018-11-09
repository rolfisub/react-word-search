import * as React from "react";
import { WordsearchOutput } from "../../lib/wordsearch/wordsearch";
import { Word } from "./word";
import { connect } from "react-redux";

interface WordsProps {
  game: WordsearchOutput;
}

class WordsClass extends React.Component<WordsProps> {
  render() {
    if (this.props.game.board.length > 0) {
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <div>
            {this.props.game.words.map((w, i) => {
              return <Word {...w} key={i} />;
            })}
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

const mapStateToProps = (state, props) => {
  return {
    ...props,
    game: state.reducers.GameReducer.current.game
  };
};
const mapDispatchToProps = (dispatch, props) => props;

export const Words = connect(
  mapStateToProps,
  mapDispatchToProps
)(WordsClass);
