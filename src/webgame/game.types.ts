import { Model } from "../common/model";
import {
  WordsearchConfig,
  WordsearchOutput
} from "../lib/wordsearch/wordsearch";
import { ActionTypes, StoreState } from "../common/redux";

export interface Game extends Model {
  game: WordsearchOutput;
  config: WordsearchConfig;
}

export interface GameStoreState extends StoreState<Game> {}

export const GameActionTypes: ActionTypes = new ActionTypes("Game");
