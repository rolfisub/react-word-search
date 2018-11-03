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

interface RouteResourceTypes {
  create: string;
  index: string;
  edit: string;
  show: string;
}

export class ActionTypes implements RouteResourceTypes {
  create: string;
  index: string;
  edit: string;
  show: string;
  remove: string;

  constructor(public module: string) {
    this.create = this.module + ".create";
    this.index = this.module + ".index";
    this.edit = this.module + ".edit";
    this.show = this.module + ".show";
    this.remove = this.module + ".remove";
  }
}
