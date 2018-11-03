import { Model } from "../common/model";
import { WordsearchOutput } from "../lib/wordsearch/wordsearch";
import { ActionTypes, StoreState } from "../common/redux";

export interface Game extends Model {
  game?: WordsearchOutput;
}

export interface GameStoreState extends StoreState<Game> {}

export const GameActionTypes: ActionTypes = new ActionTypes("Game");
