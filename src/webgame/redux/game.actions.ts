import { ThunkAction } from "redux-thunk";
import { GameActionTypes, GameStoreState, Game } from "../game.types";
import { Dispatch } from "";
import { Action, Payload } from "../../common/redux";

export const gameActionCreators = {
  index(): ThunkAction<void, GameStoreState, void, any> {
    return async (dispatch): Promise<void> => {
      console.log('index');
    };
  },
  show(): ThunkAction<void, GameStoreState, void, any> {
    return async (dispatch): Promise<void> => {
      console.log('show');
    };
  },
  edit(): ThunkAction<void, GameStoreState, void, any> {
    return async (dispatch): Promise<void> => {
      console.log('edit');
    };
  },
  create(): ThunkAction<void, GameStoreState, void, any> {
    return async (dispatch): Promise<void> => {
      console.log('create');
    };
  }
};
