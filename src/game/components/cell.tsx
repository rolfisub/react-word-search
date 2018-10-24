import * as React from "react";

interface ICellProps {
  letter: string;
  key: string;
}

export const Cell = (props: ICellProps) => <div>{props.letter}</div>;
