'use client';

import React from 'react';

interface InstructionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartGame: () => void;
  gameStarted: boolean;
}

export const InstructionsModal: React.FC<InstructionsModalProps> = ({
  isOpen,
  onClose,
  onStartGame,
  gameStarted,
}) => {
  if (!isOpen) return null;

  const handleStartGame = () => {
    if (!gameStarted) {
      onStartGame(); // Only start the game if it hasn't started yet
    }
    onClose(); // Always close the modal
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full max-h-fit">
        <div className="p-2 sm:p-4">
          {/* Header */}
          <div className="text-center mb-3 sm:mb-4">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-1">
              🚀 RugFlip Tap
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
              Flip your way to 11B market cap!
            </p>
          </div>

          {/* Instructions */}
          <div className="space-y-2 sm:space-y-3 text-xs">
            {/* Objective */}
            <div className="bg-green-50 dark:bg-green-900/20 p-2 rounded-lg">
              <h3 className="font-semibold text-green-800 dark:text-green-200 mb-1 text-xs">
                🎯 Objective
              </h3>
                                 <p className="text-green-700 dark:text-green-300 text-xs">
                     Reach 11.3B market cap to win!
                   </p>
            </div>

            {/* How to Play */}
            <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded-lg">
              <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-1 text-xs">
                🎮 How to Play
              </h3>
              <ul className="text-blue-700 dark:text-blue-300 space-y-0.5 text-xs">
                <li>• Tap button to earn market cap</li>
                <li>• Buy upgrades for passive income</li>
                <li>• Avoid obstacles</li>
              </ul>
            </div>

            {/* Upgrades */}
            <div className="bg-purple-50 dark:bg-purple-900/20 p-2 rounded-lg">
              <h3 className="font-semibold text-purple-800 dark:text-purple-200 mb-1 text-xs">
                ⬆️ Upgrades
              </h3>
              <div className="grid grid-cols-2 gap-1 text-purple-700 dark:text-purple-300 text-xs">
                <div>• <strong>Auto Flipper:</strong> Passive</div>
                <div>• <strong>Whale:</strong> Big gains</div>
                <div>• <strong>Marketing:</strong> Hype</div>
                <div>• <strong>Diamond:</strong> Protection</div>
              </div>
            </div>

            {/* Obstacles */}
            <div className="bg-red-50 dark:bg-red-900/20 p-2 rounded-lg">
              <h3 className="font-semibold text-red-800 dark:text-red-200 mb-1 text-xs">
                ⚠️ Obstacles (Tap to remove!)
              </h3>
              <div className="grid grid-cols-3 gap-1 text-red-700 dark:text-red-300 text-xs">
                <div>🎭 -10%</div>
                <div>🤖 -5%</div>
                <div>💸 -15%</div>
              </div>
            </div>

            {/* Victory/Defeat */}
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-2 rounded-lg">
              <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-1 text-xs">
                🏆 Win/Lose
              </h3>
              <div className="grid grid-cols-2 gap-1 text-yellow-700 dark:text-yellow-300 text-xs">
                                     <div>• <strong>Win:</strong> Reach 11.3B</div>
                <div>• <strong>Lose:</strong> Cap = 0</div>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-2 mt-3 sm:mt-4">
            <button
              onClick={onClose}
              className="flex-1 px-3 py-2 text-gray-600 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-xs sm:text-sm"
            >
              Close
            </button>
            <button
              onClick={handleStartGame}
              className="flex-1 px-3 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold rounded-lg hover:from-green-600 hover:to-blue-600 transition-all transform hover:scale-105 text-xs sm:text-sm"
            >
              {gameStarted ? 'Continue 🎮' : 'Start 🚀'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
