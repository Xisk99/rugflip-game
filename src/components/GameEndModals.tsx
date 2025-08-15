'use client';

import React from 'react';

interface GameEndModalsProps {
  isVictory: boolean;
  isDefeat: boolean;
  marketCap: number;
  totalClicks: number;
  onResetGame: () => void;
}

export const GameEndModals: React.FC<GameEndModalsProps> = ({
  isVictory,
  isDefeat,
  marketCap,
  totalClicks,
  onResetGame,
}) => {
  const RUGFLIP_CA = "FAMfdnr3daYqxP7g9iaSa65RNXnzLWDD8c2uPENKpump";
  const formatNumber = (num: number): string => {
    if (num >= 1_000_000_000) {
      return `${(num / 1_000_000_000).toFixed(2)}B`;
    } else if (num >= 1_000_000) {
      return `${(num / 1_000_000).toFixed(2)}M`;
    } else if (num >= 1_000) {
      return `${(num / 1_000).toFixed(1)}K`;
    }
    return num.toLocaleString();
  };

  const shareOnX = (isWin: boolean) => {
    const baseText = isWin 
      ? `🎉 Just reached 11.3B market cap in RugFlip Tap! 🚀\n\n💰 Final stats:\n• Market Cap: $${formatNumber(marketCap)}\n• Total Clicks: ${totalClicks.toLocaleString()}\n\nCan you beat my score? 🎮`
      : `💀 Got rugged in RugFlip Tap after ${totalClicks.toLocaleString()} clicks! 😤\n\nTime for revenge... gonna flip my way to 11.3B! 🚀`;
    
    const gameUrl = window.location.href;
    const rugflipPromo = `\n\n🎮 Play now: ${gameUrl}\n\n🎯 Join the narrative to flip the 11.3B rugged in memecoins! @RugFlip\n\n💎 CA: ${RUGFLIP_CA}`;
    
    const fullText = baseText + rugflipPromo;
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(fullText)}`;
    
    window.open(tweetUrl, '_blank', 'width=600,height=400');
  };

  if (!isVictory && !isDefeat) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-3xl max-w-md w-full overflow-hidden">
        {/* Victory Modal */}
        {isVictory && (
          <div className="text-center p-8">
            {/* Celebration Header */}
            <div className="mb-6">
              <div className="text-6xl mb-4 animate-bounce">🎉</div>
              <h2 className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                VICTORY!
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                You've reached 11.3B market cap!
              </p>
            </div>

            {/* Stats */}
            <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl p-6 mb-6">
              <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-4">
                🏆 Final Stats
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Final Market Cap:</span>
                  <span className="font-bold text-green-600 dark:text-green-400">
                    ${formatNumber(marketCap)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Total Clicks:</span>
                  <span className="font-bold text-gray-900 dark:text-white">
                    {totalClicks.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Average per Click:</span>
                  <span className="font-bold text-gray-900 dark:text-white">
                    ${formatNumber(totalClicks > 0 ? marketCap / totalClicks : 0)}
                  </span>
                </div>
              </div>
            </div>

            {/* Celebration Message */}
            <div className="mb-6">
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                🚀 Congratulations! You've successfully flipped your way to becoming a crypto billionaire! 
                Your diamond hands and strategic upgrades paid off. Time to celebrate! 🥳
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={() => shareOnX(true)}
                className="w-full px-6 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold text-lg rounded-2xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                🐦 Share Victory on X
              </button>
              <button
                onClick={onResetGame}
                className="w-full px-6 py-4 bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold text-lg rounded-2xl hover:from-green-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                🎮 Play Again
              </button>
            </div>
          </div>
        )}

        {/* Defeat Modal */}
        {isDefeat && (
          <div className="text-center p-8">
            {/* Defeat Header */}
            <div className="mb-6">
              <div className="text-6xl mb-4">💀</div>
              <h2 className="text-3xl font-bold text-red-600 dark:text-red-400 mb-2">
                RUGGED!
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Your market cap hit zero!
              </p>
            </div>

            {/* Stats */}
            <div className="bg-red-50 dark:bg-red-900/20 rounded-2xl p-6 mb-6">
              <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-4">
                📊 Final Stats
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Market Cap:</span>
                  <span className="font-bold text-red-600 dark:text-red-400">
                    $0
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Total Clicks:</span>
                  <span className="font-bold text-gray-900 dark:text-white">
                    {totalClicks.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Failure Message */}
            <div className="mb-6">
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                💔 The obstacles got the best of you this time! Don't worry - every great crypto entrepreneur 
                faces setbacks. Learn from the experience and try again! 💪
              </p>
            </div>

            {/* Tips */}
            <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-2xl p-4 mb-6">
              <h4 className="text-sm font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
                💡 Tips for Next Time:
              </h4>
              <ul className="text-xs text-yellow-700 dark:text-yellow-300 space-y-1 text-left">
                <li>• Click obstacles quickly to avoid losses</li>
                <li>• Invest in upgrades early for passive income</li>
                <li>• Diamond Hands upgrade helps protect against losses</li>
                <li>• Watch out for pump traps - they hurt the most!</li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={() => shareOnX(false)}
                className="w-full px-6 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold text-lg rounded-2xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                🐦 Share on X
              </button>
              <button
                onClick={onResetGame}
                className="w-full px-6 py-4 bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold text-lg rounded-2xl hover:from-red-600 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                🔄 Try Again
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Background animation */}
      {isVictory && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute text-2xl animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random()}s`,
              }}
            >
              {['🎉', '🎊', '💰', '🚀', '💎'][Math.floor(Math.random() * 5)]}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
