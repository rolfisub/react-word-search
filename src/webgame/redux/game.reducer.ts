import { Action } from "../../common/redux";
import { Game, GameStoreState } from "../game.types";

export const GameReducer = (
  state: GameStoreState = {
    current: {
      id: ''
    },
    list: []
  },
  action: Action<Game>
) => {
  return state;
};
