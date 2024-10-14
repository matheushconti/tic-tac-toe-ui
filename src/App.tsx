import React, { useState } from "react";
import "./index.css";
import { XMarkIcon } from "@heroicons/react/24/solid";

const CircleIcon = ({ size }: { size?: number }) => {
  return (
    <div
      className={`border-4 border-red-600 rounded-full h-${size ?? 8} w-${
        size ?? 8
      }`}
    ></div>
  );
};
type Players = "circle" | "cross";
type SquareComponentProps = {
  checked?: Players;
  onClick: () => void;
};
const SquareComponent = ({ checked, onClick }: SquareComponentProps) => {
  return (
    <div
      onClick={() => onClick()}
      className="border border-gray-400 flex items-center justify-center flex-1 h-14 w-14 cursor-pointer hover:bg-slate-100 hover:shadow-md"
    >
      {checked === "circle" && <CircleIcon />}
      {checked === "cross" && <XMarkIcon className="h-8 w-8" />}
    </div>
  );
};

function App() {
  const [ticTacBoard, setTicTacBoard] = useState([...Array(9)]);
  const [lastPlayer, setLastPlayer] = useState<Players>();

  let nextPlayer: Players = "circle";
  if (!lastPlayer || lastPlayer === "circle") {
    nextPlayer = "cross";
  }

  const onClick = (squareIndex: number) => {
    if (ticTacBoard?.[squareIndex]) {
      return;
    }

    const newTicTacBoard = [...ticTacBoard];
    newTicTacBoard[squareIndex] = nextPlayer;
    setTicTacBoard(newTicTacBoard);
    setLastPlayer(nextPlayer);
  };

  const onReset = () => {
    setTicTacBoard([...Array(9)]);
    setLastPlayer(undefined);
  };

  return (
    <div className="container mx-auto flex h-[100vh] justify-center items-center">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-xl font-bold">Tic Tac Toe</h1>
        <div className="flex justify-between w-full items-center my-4">
          <p>Next player: </p>
          <div className="ml-2">
            {nextPlayer === "circle" && <CircleIcon size={6} />}
            {nextPlayer === "cross" && <XMarkIcon className="h-6 w-6" />}
          </div>
        </div>
        <div className="shadow-md grid grid-cols-3">
          {ticTacBoard.map((ticTacItem, index) => (
            <SquareComponent
              checked={ticTacItem}
              onClick={() => onClick(index)}
            />
          ))}
        </div>
        <button
          onClick={onReset}
          className="mt-4 rounded-lg p-1 w-full border border-blue-950 text-blue-950 font-bold text-sm hover:bg-blue-50"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default App;
