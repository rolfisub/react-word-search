import * as React from "react";
import { WordsearchOutput } from "../../lib/wordsearch/wordsearch";
import { Cell } from "./cell";
import { GenerateFormReduxForm } from "./generate.form";

export class Board extends React.Component<WordsearchOutput> {
  render() {
    return (
      <div>
        <div style={{ width: this.props.board.length * 22 }}>
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
        <p>{this.props.words.toString()}</p>
        <GenerateFormReduxForm />
      </div>
    );
  }
}
