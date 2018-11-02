import * as React from "react";
import { Cell as CellInterface } from "../wordsearch/wordsearch";
import { CSSProperties } from "react";

const styles: CSSProperties = {
  border: "1px dotted",
  width: 20,
  height: 20,
  fontSize: 20,
  float: "left",
  margin: 0,
  textAlign: "center"
};

export class Cell extends React.Component<CellInterface> {
  render() {
    return <span style={styles}>{this.props.letter}</span>;
  }
}
