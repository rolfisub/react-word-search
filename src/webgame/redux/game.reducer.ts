import { Action } from "../../common/redux";
import { Game, GameActionTypes, GameStoreState } from "../game.types";
import { WSCase } from "../../lib/wordsearch/wordsearch";

export const GameReducer = (
  state: GameStoreState = {
    current: {
      id: "",
      game: {
        board: [],
        words: [],
        currentWord: "",
        endGame: false,
        error: ""
      },
      config: {
        size: 0,
        wordsConfig: {
          amount: 0,
          minLength: 0,
          maxLength: 0,
          dictionary: [],
          case: WSCase.UPPER,
          random: true,
          debug: false
        },
        allowedDirections: [],
        allowWordOverlap: false
      }
    },
    list: []
  },
  action: Action<Game>
) => {
  switch (action.type) {
    case GameActionTypes.create: {
      const newState = { ...state };
      if (action.payload && action.payload.data) {
        newState.current = { ...action.payload.data };
        return newState;
      }
      break;
    }
    case GameActionTypes.show: {
      const newState = { ...state };
      if (action.payload && action.payload.data) {
        newState.current = { ...action.payload.data };
        return newState;
      }
      break;
    }
  }

  return state;
};
