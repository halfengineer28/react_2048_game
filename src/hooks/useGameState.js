import { useCallback, useEffect, useState } from "react";
import { initializeGame, processMove } from "../utils/gamelogic";

export const useGameState = (initialSize = 4) => {
  const [boardSize, setBoardSize] = useState(initialSize);
  const [gameState, setGameState] = useState(() => initializeGame(boardSize));
  const [canContinue, setCanContinue] = useState(false);

  const restart = useCallback(() => {
    setGameState(initializeGame(boardSize));
    setCanContinue(false);
  }, [boardSize]);

  const changeBoardSize = useCallback((newSize) => {
    setBoardSize(newSize);
    setGameState(initializeGame(newSize));
    setCanContinue(false);
  }, []);

  const move = useCallback(
    (direction) => {
      setGameState((prevState) => {
        if (canContinue && (prevState.gameOver || prevState.gameWon)) {
          return prevState;
        }
        return processMove(prevState, direction);
      });
    },
    [canContinue]
  );

  const continueAfterWin = useCallback(() => {
    setCanContinue(true);
    setGameState((prevState) => ({ ...prevState, gameWon: false }));
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      const keyMap = {
        ArrowUp: "up",
        ArrowDown: "down",
        ArrowLeft: "left",
        ArrowRight: "right",
      };

      const direction = keyMap[e.key];
      if (direction){
        e.preventDefault();
        move(direction);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [move]);

  return{
    gameState,
    boardSize,
    restart,
    changeBoardSize,
    move,
    continueAfterWin,
  }
};
