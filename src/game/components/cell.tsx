import * as React from "react";
import { Cell as CellInterface } from "../wordsearch/wordsearch";
import { CSSProperties } from "react";

const styles: CSSProperties = {
  border: "1px solid",
  width: 10,
  height: 10,
  fontSize: 10,
  float: "left",
  margin: 0
};

export class Cell extends React.Component<CellInterface> {
  render() {
    return <div style={styles}>{this.props.letter}</div>;
  }
}
