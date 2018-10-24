import * as React from "react";
import * as ReactDOM from "react-dom";
import { Board } from "./game/components/board";

const Index = () => <Board board={[["a", "b", "c"], ["d", "e", "f"]]} />;

ReactDOM.render(<Index />, document.getElementById("root"));
