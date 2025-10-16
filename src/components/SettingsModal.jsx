import { X } from "lucide-react";
import React from "react";

const SettingsModal = ({ isOpen, onClose, currentSize, onSizeChange }) => {
  if (!isOpen) return null;

  const sizes = [3, 4, 5, 6, 8];

  const handleSizeSelect = (size) => {
    onSizeChange(size);
    onClose();
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Game Settings</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">
            Board Sizes
          </h3>
          <div className="grid grid-cols-5 gap-2">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => handleSizeSelect(size)}
                className={`py-3 px-4 rounded-lg font-semibold transition-all ${
                  currentSize === size
                    ? "bg-gray-700 text-white shadow-lg scale-105"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {size}x{size}
              </button>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-3">
            Current : {currentSize}x{currentSize}
          </p>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-gray-700">
                <strong>Note:</strong> Changing the board size will start a new game.

            </p>

        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
