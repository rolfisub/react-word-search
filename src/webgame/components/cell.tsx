import * as React from "react";
import {
  Cell as CellInterface,
  Vector2D
} from "../../lib/wordsearch/wordsearch";
import { CSSProperties } from "react";
import { connect } from "react-redux";
import { gameActionCreators } from "../redux/game.actions";
import { config } from "../config";

const styles: CSSProperties = {
  border: "1px dotted",
  width: config.cellSize,
  height: config.cellSize,
  fontSize: config.cellSize,
  fontFamily: config.cellFont,
  float: "left",
  margin: 0,
  textAlign: "center"
};

const stylesHover: CSSProperties = {
  ...styles,
  backgroundColor: "lightgreen"
};

const styleDiscovered: CSSProperties = {
  backgroundColor: "lightblue"
};

const styleClicked: CSSProperties = {
  backgroundColor: "darkblue",
  color: "white"
};

const styleFound: CSSProperties = {
  backgroundColor: "darkgreen",
  color: "white"
};

interface CellProps extends CellInterface {
  submitCell: (pos: Vector2D) => void;
  highlightCell: (pos: Vector2D) => void;
}

interface CellState {
  isHover: boolean;
}

class CellClass extends React.Component<CellProps, CellState> {
  constructor(props) {
    super(props);
    this.state = {
      isHover: false
    };
  }

  mouseEnter = () => {
    if (this.props.selectable) {
      this.props.highlightCell(this.props.pos);
      this.setState({
        isHover: true
      });
    }
  };

  mouseLeave = () => {
    this.setState({
      isHover: false
    });
  };

  onClick = () => {
    this.props.submitCell(this.props.pos);
  };

  render() {
    return (
      <span
        onMouseEnter={this.mouseEnter}
        onMouseLeave={this.mouseLeave}
        onClick={this.onClick}
        style={{
          ...(this.state.isHover || this.props.highlighted
            ? stylesHover
            : styles),
          ...(this.props.shown ? styleDiscovered : {}),
          ...(this.props.selected ? styleClicked : {}),
          ...(this.props.found ? styleFound : {})
        }}
      >
        {this.props.letter}
      </span>
    );
  }
}

const mapStateToProps = (state, props) => props;
const mapDispatchToProps = (dispatch, props) => {
  return {
    ...props,
    submitCell: (pos: Vector2D) => {
      dispatch(gameActionCreators.submitCell(pos));
    },
    highlightCell: (pos: Vector2D) => {
      dispatch(gameActionCreators.highlightCell(pos));
    }
  };
};

export const Cell = connect(
  mapStateToProps,
  mapDispatchToProps
)(CellClass);
