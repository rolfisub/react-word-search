import * as React from "react";
import { WordsearchOutput } from "../wordsearch/wordsearch";
import { Cell } from "./cell";

export class Board extends React.Component<WordsearchOutput> {
  render() {
    return (
      <div>
        {this.props.board.map((arr, x) => {
          return (
            <span key={x}>
              {arr.map((cell, y) => {
                return <Cell {...cell} key={y} />;
              })}
              <br/>
            </span>
          );
        })}
      </div>
    );
  }
}
