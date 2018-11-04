import * as React from "react";
import { WordsearchOutput } from "../../lib/wordsearch/wordsearch";
import { Cell } from "./cell";
import { Grid } from "@material-ui/core";

export class Board extends React.Component<WordsearchOutput> {
  render() {
    return (
      <Grid container>
        <Grid item xs={12}>
          <div style={{ width: this.props.board.length * 22, float: "left" }}>
            {this.props.board.map((arr, x) => {
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
          <div
            style={{
              height: this.props.board.length * 22,
              float: "left",
              margin: 10
            }}
          >
            {this.props.words.map((w, i) => {
              return <p key={i}>{w.word}</p>;
            })}
          </div>
        </Grid>
      </Grid>
    );
  }
}
