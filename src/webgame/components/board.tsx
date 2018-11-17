import * as React from "react";
import { WordsearchOutput } from "../../lib/wordsearch/wordsearch";
import { Cell } from "./cell";
import { Grid } from "@material-ui/core";
import { connect } from "react-redux";
import { config } from "../config";
import { gameActionCreators } from "../redux/game.actions";

interface BoardProps {
  unHighlightBoard: () => void;
  game: WordsearchOutput;
}

class BoardClass extends React.Component<BoardProps> {
  render() {
    if (this.props.game.board.length > 0) {
      return (
        <Grid container>
          <Grid item xs={12}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <div
                style={{
                  width: this.props.game.board.length * (config.cellSize + 4)
                  //border: "1px solid"
                }}
                onMouseLeave={this.props.unHighlightBoard}
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
            </div>
          </Grid>
          <Grid item xs={12}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <div style={{ margin: 10 }}>
                Submit word: {this.props.game.currentWord}
              </div>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <span style={{ color: "red" }}>{this.props.game.error}</span>
            </div>
          </Grid>
        </Grid>
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
const mapDispatchToProps = (dispatch, props) => ({
  ...props,
  unHighlightBoard: () => {
    dispatch(gameActionCreators.unHighlight());
  }
});

export const Board = connect(
  mapStateToProps,
  mapDispatchToProps
)(BoardClass);
