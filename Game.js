import React, { useReducer, useState } from "react";
import { calculateWinner } from "../../helper";
import Board from "./Board";
import "./GameStyles.css";

const Game = () => {
  // const [board, setBoard] = useState(Array(9).fill(null));
  // const [xIsNext, setXIsNext] = useState(true);

  const initialState = {
    board: Array(9).fill(null),
    xIsNext: true,
  };

  const gameReducer = (state, action) => {
    switch (action.type) {
      case "CLICK": {
        const { board, xIsNext } = state;
        const { index, winner } = action.payload;
        if (winner || board[index]) return state;

        const nextState = JSON.parse(JSON.stringify(state));
        console.log("gameReducer ~ nextState", nextState);

        nextState.board[index] = xIsNext ? "X" : "O";
        nextState.xIsNext = !xIsNext;

        return nextState;
      }

      case "RESET": {
        const nextState = JSON.parse(JSON.stringify(state));
        nextState.board = Array(9).fill(null);
        nextState.xIsNext = true;

        return nextState;
      }

      default:
        break;
    }
    return state;
  };

  const [state, dispatch] = useReducer(gameReducer, initialState);

  // const [state, setState] = useState({
  //   board: Array(9).fill(null),
  //   xIsNext: true,
  // });

  const handleClick = (index) => {
    // const boardCopy = [...state.board];
    // if (winner || boardCopy[index]) return;
    // boardCopy[index] = state.xIsNext ? "X" : "O";
    // setBoard(boardCopy);
    // setXIsNext(!xIsNext);
    // setState({
    //   board: boardCopy,
    //   xIsNext: !state.xIsNext,
    // });
    dispatch({
      type: "CLICK",
      payload: {
        index,
        winner,
      },
    });
  };

  const winner = calculateWinner(state.board);

  const handleResetGame = () => {
    // setBoard(Array(9).fill(null));
    // setXIsNext(true);
    // setState({
    //   board: Array(9).fill(null),
    //   xIsNext: true,
    // });
    dispatch({
      type: "RESET",
    });
  };
  return (
    <div>
      <Board cells={state.board} onClick={handleClick}></Board>

      {winner ? `Winner is ${winner}` : ``}

      <button className="game-reset" onClick={handleResetGame}>
        Reset Game
      </button>
    </div>
  );
};

export default Game;
