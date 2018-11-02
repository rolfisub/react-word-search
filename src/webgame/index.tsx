import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Game } from "./game";
import createStore from "./redux/store";

const store = createStore();

const Index = () => (
  <Provider store={store}>
    <Game />
  </Provider>
);

ReactDOM.render(<Index />, document.getElementById("root"));
