import { Model } from "./model";

export interface StoreState<M extends Model> {
  current: M;
  list: M[];
}

export interface Payload<M extends Model> {
  data?: M;
  list?: M[];
}

export interface Action<M extends Model> {
  type: string;
  payload?: Payload<M>;
}
