'use client';

import React from 'react';
import { GAME_CONFIG } from '../hooks/useGameState';

interface GameHeaderProps {
  marketCap: number;
  onShowInstructions: () => void;
  onResetGame: () => void;
}

export const GameHeader: React.FC<GameHeaderProps> = ({
  marketCap,
  onShowInstructions,
  onResetGame,
}) => {
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

  const progressPercentage = Math.min((marketCap / GAME_CONFIG.TARGET_MARKET_CAP) * 100, 100);

  return (
    <div className="glass-panel shadow-lg rounded-b-2xl p-1.5 lg:p-4 mb-1.5 lg:mb-4 flex-shrink-0">
      {/* Top row with market cap, buy button, and action buttons */}
      <div className="flex items-center justify-between mb-1.5 lg:mb-4">
        <div className="flex items-center gap-1 lg:gap-2">
          <span className="text-lg lg:text-2xl neon-cyan">⚡</span>
          <div>
            <div className="text-xs text-gray-400 font-mono">MARKET CAP</div>
            <div className="text-lg lg:text-xl font-bold neon-cyan font-mono">
              ${formatNumber(marketCap)}
            </div>
          </div>
        </div>

        {/* Center - Buy RugFlip Button */}
        <div className="hidden sm:block">
          <a
            href="https://pump.fun/coin/FAMfdnr3daYqxP7g9iaSa65RNXnzLWDD8c2uPENKpump"
            target="_blank"
            rel="noopener noreferrer"
            className="cyberpunk-button px-3 lg:px-4 py-1.5 lg:py-2 rounded-lg lg:rounded-xl neon-orange font-mono text-xs lg:text-sm font-bold hover:scale-105 transition-transform"
          >
            🚀 BUY RUGFLIP
          </a>
        </div>
        
        <div className="flex gap-1 lg:gap-2">
          <button
            onClick={onShowInstructions}
            className="cyberpunk-button p-1.5 lg:p-2 rounded-lg lg:rounded-xl neon-cyan"
            title="Instructions"
          >
            <span className="text-sm lg:text-lg">📋</span>
          </button>
          <button
            onClick={onResetGame}
            className="cyberpunk-button p-1.5 lg:p-2 rounded-lg lg:rounded-xl neon-orange"
            title="Reset Game"
          >
            <span className="text-sm lg:text-lg">🔄</span>
          </button>
        </div>
      </div>

      {/* Mobile Buy Button Row */}
      <div className="sm:hidden mb-2">
        <a
          href="https://pump.fun/coin/FAMfdnr3daYqxP7g9iaSa65RNXnzLWDD8c2uPENKpump"
          target="_blank"
          rel="noopener noreferrer"
          className="cyberpunk-button w-full px-4 py-2 rounded-lg neon-orange font-mono text-sm font-bold hover:scale-105 transition-transform text-center block"
        >
          🚀 BUY RUGFLIP
        </a>
      </div>

      {/* Progress bar */}
      <div className="mb-1 lg:mb-2">
        <div className="flex justify-between text-xs text-gray-400 mb-1" style={{ fontFamily: 'Orbitron, monospace' }}>
          <span className="hidden lg:inline">PROGRESS TO 11.3B</span>
          <span className="lg:hidden">TARGET: 11.3B</span>
          <span className="neon-cyan">{progressPercentage.toFixed(4)}%</span>
        </div>
        <div className="w-full bg-gray-800/50 rounded-full h-2 lg:h-3 border border-gray-600/30 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-cyan-400 to-orange-500 rounded-full transition-all duration-500 ease-out"
            style={{ 
              width: `${progressPercentage}%`,
              boxShadow: '0 0 10px rgba(0, 212, 255, 0.5)'
            }}
          />
        </div>
      </div>
      
      {/* Target display */}
      <div className="text-center text-xs text-gray-500 dark:text-gray-400 hidden lg:block">
        Target: $11.30B
      </div>
    </div>
  );
};
