import * as React from "react";
import { Cell as CellInterface } from "../../lib/wordsearch/wordsearch";
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

const stylesHover: CSSProperties = {
  ...styles,
  backgroundColor: "lightgreen"
};

interface CellState {
  isHover: boolean;
}

export class Cell extends React.Component<CellInterface, CellState> {
  constructor(props) {
    super(props);
    this.state = {
      isHover: false
    };
  }

  mouseEnter = () => {
    this.setState({
      isHover: true
    });
  };

  mouseLeave = () => {
    this.setState({
      isHover: false
    });
  };

  render() {
    return (
      <span
        onMouseEnter={this.mouseEnter}
        onMouseLeave={this.mouseLeave}
        style={this.state.isHover ? stylesHover : styles}
      >
        {this.props.letter}
      </span>
    );
  }
}
