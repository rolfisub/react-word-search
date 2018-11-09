import * as React from "react";
import { Button } from "@material-ui/core";
import { connect } from "react-redux";
import { gameActionCreators } from "../redux/game.actions";
import { WordsearchOutput } from "../../lib/wordsearch/wordsearch";

interface ControlsActions {
  resetSelection: () => void;
  submitWord: () => void;
  game: WordsearchOutput;
}

class ControlsClass extends React.Component<ControlsActions> {
  render() {
    if(this.props.game.board.length > 0) {
      return (
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
          <Button
            variant={"contained"}
            size={"small"}
            color={"primary"}
            onClick={this.props.submitWord}
            style={{margin:10}}
          >
            Submit
          </Button>
          <Button
            variant={"extendedFab"}
            size={"small"}
            color={"primary"}
            onClick={this.props.resetSelection}
            style={{margin:10, height:10}}
          >
            Cancel
          </Button>
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
  }
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

export const Controls = connect(
  mapStateToProps,
  mapDispatchToProps
)(ControlsClass);
