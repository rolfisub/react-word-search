import * as React from "react";
import { Cell } from "./cell";

interface IBoardProps {
  board: string[][];
}

export const Board = (props: IBoardProps) => (
  <div>
    {props.board.map((x, xi) =>
      x.map((y, yi) => (
        <Cell key={xi + "." + yi} letter={props.board[xi][yi]} />
      ))
    )}
  </div>
);
