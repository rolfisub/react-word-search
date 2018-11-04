import { ThunkAction } from "redux-thunk";
import { GameActionTypes, GameStoreState, Game } from "../game.types";
import { Action, Payload } from "../../common/redux";
import {
  Wordsearch,
  WordsearchConfig,
  WordsearchInput
} from "../../lib/wordsearch/wordsearch";

const ws = new Wordsearch();

export const gameActionCreators = {
  /*index(): ThunkAction<void, GameStoreState, void, any> {
    return async (dispatch): Promise<void> => {
      console.log("index");
    };
  },
  show(): ThunkAction<void, GameStoreState, void, any> {
    return async (dispatch): Promise<void> => {
      console.log("show");
    };
  },
  edit(): ThunkAction<void, GameStoreState, void, any> {
    return async (dispatch): Promise<void> => {
      console.log("edit");
    };
  },*/
  create(): ThunkAction<void, GameStoreState, void, any> {
    return async (dispatch): Promise<void> => {
      const wsOutput = ws.generate();
      const wsConfig = ws.getConfig();

      const payload: Payload<Game> = {
        data: {
          id: "",
          game: wsOutput,
          config: wsConfig
        }
      };

      const action: Action<Game> = {
        type: GameActionTypes.create,
        payload
      };
      dispatch(action);
    };
  },
  setConfig(
    config: Partial<WordsearchInput>
  ): ThunkAction<Promise<WordsearchConfig>, GameStoreState, void, any> {
    return async (dispatch, getState): Promise<WordsearchConfig> => {
      ws.setConfig(config);
      const wsConfig = ws.getConfig();
      const state = getState() as any;
      const payload: Payload<Game> = {
        data: {
          id: "",
          game: state.reducers.GameReducer.current.game,
          config: wsConfig
        }
      };

      const action: Action<Game> = {
        type: GameActionTypes.show,
        payload
      };
      dispatch(action);

      return ws.getConfig();
    };
  }
};
