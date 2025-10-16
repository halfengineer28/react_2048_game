const GameOverlay = ({ isGameOver, isGameWon, onRestart, onContinue }) => {
  if (!isGameOver && !isGameWon) {
    return null;
  }
  return (
    <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center rounded-xl z-10">
      <div className="bg-white p-8 rounded-2xl shadow-2xl text-center max-w-sm">
        <h2 className="text-4xl font-bold mb-4">
          {isGameWon ? "🎉 You Win!" : "Game Over!"}
        </h2>
        <p className="text-gray-600 mb-6">
          {isGameWon
            ? "Congratulations! You reached 2048!"
            : "No more moves available. Try again!"}
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={onRestart}
            className="bg-gray-700 hover:bg-gray-800 text-white px-6 py-3 rounded-lg transition-colors font-semibold shadow-md"
          >
            New Game
          </button>
          {isGameWon && onContinue && (
            <button
                onClick={onContinue}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors font-semibold shadow-md"
            >
                Keep Playing
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default GameOverlay;
