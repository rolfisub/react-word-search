import * as React from "react";
import { WordsearchOutput } from "../../lib/wordsearch/wordsearch";
import { Cell } from "./cell";
import { Button, Grid } from "@material-ui/core";
import { Word } from "./word";
import { connect } from "react-redux";
import { gameActionCreators } from "../redux/game.actions";

interface BoardProps {
  resetSelection: () => void;
  submitWord: () => void;
  game: WordsearchOutput;
}

class BoardClass extends React.Component<BoardProps> {
  render() {
    console.log(this.props.game);
    return (
      <Grid container>
        <Grid item xs={12}>
          <div
            style={{ width: this.props.game.board.length * 22, float: "left" }}
          >
            {this.props.game.board.map((arr, x) => {
              return (
                <span key={x}>
                  {arr.map((cell, y) => {
                    return <Cell {...cell} key={y} />;
                  })}
                  <br />
                </span>
              );
            })}
          </div>
          <Button
            variant={"contained"}
            size={"small"}
            color={"secondary"}
            onClick={this.props.resetSelection}
          >
            Reset Selection
          </Button>
          <Button
            variant={"contained"}
            size={"small"}
            color={"primary"}
            onClick={this.props.submitWord}
          >
            Submit Word
          </Button>
          Current Word is: {this.props.game.currentWord}
          <div
            style={{
              height: this.props.game.board.length * 22,
              float: "left",
              margin: 10
            }}
          >
            {this.props.game.words.map((w, i) => {
              return <Word {...w} key={i} />;
            })}
          </div>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    ...props,
    game: state.reducers.GameReducer.current.game
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    ...props,
    resetSelection: () => {
      dispatch(gameActionCreators.resetSelection());
    },
    submitWord: () => {
      dispatch(gameActionCreators.submitWord());
    }
  };
};

export const Board = connect(
  mapStateToProps,
  mapDispatchToProps
)(BoardClass);
