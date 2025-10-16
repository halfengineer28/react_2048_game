/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useGameState } from "./hooks/useGameState";
import GameControl from "./components/GameControl";
import GameOverlay from "./components/GameOverlay";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp } from "lucide-react";
import SettingsModal from "./components/SettingsModal";
import Board from "./components/Board";

const App = () => {
  const {
    gameState,
    boardSize,
    restart,
    changeBoardSize,
    
    move,
    continueAfterWin,
  } = useGameState(4);
  const [isSettindsOpen, setIsSettingsOpen] = useState(false);

  

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <GameControl
          score={gameState.score}
          onRestart={restart}
          onSettingCheck={() => setIsSettingsOpen(true)}
        />
        <div className="relative">
          <Board board={gameState.board} />
          <GameOverlay
            isGameOver={gameState.gameOver}
            isGameWon={gameState.gameWon}
            onRestart={restart}
            onContinue={continueAfterWin}
          />
        </div>

        <div className="mt-6 bg-white rounded-lg p-4 shadow-md">
          <h3 className="font-semibold text-gray-700 mb-2">How to Play:</h3>
          <p className="text-sm text-gray-600 mb-3">
            Use arrow keys or WASD to move tiles. Tiles with the same number
            merge into one when they touch. Create a tile with the number 2048
            to win!
          </p>
          <div className="flex gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                <div className="bg-gray-200 p-1.5 rounded">
                  <ArrowUp size={16} />
                </div>
                <div className="bg-gray-200 p-1.5 rounded">
                  <ArrowDown size={16} />
                </div>
                <div className="bg-gray-200 p-1.5 rounded">
                  <ArrowLeft size={16} />
                </div>
                <div className="bg-gray-200 p-1.5 rounded">
                  <ArrowRight size={16} />
                </div>
              </div>
              <span>Arrow keys</span>
            </div>
          </div>
        </div>
      </div>
      <SettingsModal
        isOpen={isSettindsOpen}
        onClose={() => setIsSettingsOpen(false)}
        currentSize={boardSize}
        onSizeChange={changeBoardSize}
      />
    </div>
  );
};

export default App;
