import { RotateCcw , Settings } from "lucide-react";

const GameControl = ({ score, onRestart, onSettingCheck }) => {
  return (
    <div className="flex items-center justify-between w-full mb-6">
      <div>
        <h1 className="text-5xl font-bold text-gray-800">2048</h1>
        <p className="text-gray-600 text-sm mt-1">Join tiles to reach 2048!</p>
      </div>
      <div className="flex flex-col items-end gap-2">
        <div className="bg-gray-700 text-white px-6 py-3 rounded-lg shadow-lg">
          <div className="text-xs font-semibold uppercase tracking-wide opacity-70">
            Score
          </div>
          <div className="text-2xl font-bold">{score}</div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onSettingCheck}
            className="bg-gray-600 hover:bg-gray-700 text-white p-2 rounded-lg transition-colors shadow-md"
            title="Settings"
          >
            <Settings size={20} />
          </button>
          <button
            onClick={onRestart}
            className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2 shadow-md font-semibold"
          >
            <RotateCcw size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameControl;
