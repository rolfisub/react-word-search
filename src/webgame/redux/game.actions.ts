import { ThunkAction } from "redux-thunk";
import { GameActionTypes, GameStoreState, Game } from "../game.types";
import { Action, Payload } from "../../common/redux";
import {
  Vector2D,
  Wordsearch,
  WordsearchConfig,
  WordsearchInput
} from "../../lib/wordsearch/wordsearch";

const ws = new Wordsearch();

export const gameActionCreators = {
  show(): ThunkAction<void, GameStoreState, void, any> {
    return async (dispatch): Promise<void> => {
      const wsOutput = ws.getOutput();
      const wsConfig = ws.getConfig();

      const payload: Payload<Game> = {
        data: {
          id: "",
          game: { ...wsOutput },
          config: { ...wsConfig }
        }
      };

      const action: Action<Game> = {
        type: GameActionTypes.show,
        payload
      };
      dispatch(action);
    };
  },

  create(): ThunkAction<void, GameStoreState, void, any> {
    return async (dispatch): Promise<void> => {
      try {
        const wsOutput = ws.generate();
        const wsConfig = ws.getConfig();
        const payload: Payload<Game> = {
          data: {
            id: "",
            game: { ...wsOutput },
            config: { ...wsConfig }
          }
        };

        const action: Action<Game> = {
          type: GameActionTypes.create,
          payload
        };
        dispatch(action);
      } catch (e) {
        dispatch(gameActionCreators.show());
      }
    };
  },

  setConfig(
    config: Partial<WordsearchInput>
  ): ThunkAction<Promise<WordsearchConfig>, GameStoreState, void, any> {
    return async (dispatch, getState): Promise<WordsearchConfig> => {
      try {
        ws.setConfig(config);
        const wsConfig = ws.getConfig();
        const state = getState() as any;
        const payload: Payload<Game> = {
          data: {
            id: "",
            game: { ...state.reducers.GameReducer.current.game },
            config: { ...wsConfig }
          }
        };

        const action: Action<Game> = {
          type: GameActionTypes.show,
          payload
        };
        dispatch(action);
      } catch (e) {
        dispatch(gameActionCreators.show());
      }
      return ws.getConfig();
    };
  },

  showWord(
    word: string
  ): ThunkAction<Promise<boolean>, GameStoreState, void, any> {
    return async (dispatch, getState): Promise<boolean> => {
      const exists = ws.showWord(word);
      const state = getState() as any;
      const wsOutput = ws.getOutput();
      const wsConfig = state.reducers.GameReducer.current.config;

      const payload: Payload<Game> = {
        data: {
          id: "",
          game: { ...wsOutput },
          config: { ...wsConfig }
        }
      };
      const action: Action<Game> = {
        type: GameActionTypes.show,
        payload
      };

      dispatch(action);
      return exists;
    };
  },

  submitCell(
    pos: Vector2D
  ): ThunkAction<Promise<boolean>, GameStoreState, void, any> {
    return async dispatch => {
      const selected = ws.selectCell(pos);
      if (selected) {
        dispatch(gameActionCreators.show());
      }
      return selected;
    };
  },

  resetSelection(): ThunkAction<void, GameStoreState, void, any> {
    return async dispatch => {
      ws.resetCurrentSelection();
      dispatch(gameActionCreators.show());
    };
  },

  submitWord(): ThunkAction<Promise<boolean>, GameStoreState, void, any> {
    return async dispatch => {
      const win = ws.submitCurrentWord();
      dispatch(gameActionCreators.show());
      return win;
    };
  }
};
