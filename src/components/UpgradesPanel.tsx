'use client';

import React from 'react';
import { Upgrade } from '../hooks/useGameState';

interface UpgradesPanelProps {
  upgrades: Upgrade[];
  marketCap: number;
  onBuyUpgrade: (upgradeId: string) => void;
}

export const UpgradesPanel: React.FC<UpgradesPanelProps> = ({
  upgrades,
  marketCap,
  onBuyUpgrade,
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

  const getUpgradeEmoji = (upgradeId: string): string => {
    switch (upgradeId) {
      case 'auto-flipper':
        return '🤖';
      case 'whale-investor':
        return '🐋';
      case 'marketing-bot':
        return '📢';
      case 'diamond-hands':
        return '💎';
      default:
        return '⭐';
    }
  };

  const getCost = (upgrade: Upgrade): number => {
    return Math.floor(upgrade.baseCost * Math.pow(upgrade.costMultiplier, upgrade.level));
  };

  const canAfford = (upgrade: Upgrade): boolean => {
    return marketCap >= getCost(upgrade);
  };

  const getTotalPassiveIncome = (): number => {
    return upgrades.reduce((total, upgrade) => 
      total + (upgrade.passiveIncome * upgrade.level), 0
    );
  };

  return (
    <div className="cyberpunk-panel rounded-2xl p-2 lg:p-4 shadow-lg flex-1 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-1.5 lg:mb-4">
        <h2 className="text-sm lg:text-lg font-bold neon-orange flex items-center gap-1 lg:gap-2" style={{ fontFamily: 'Orbitron, monospace' }}>
          <span className="text-xs lg:text-base">⚡</span>
          <span className="hidden lg:inline">UPGRADES</span>
          <span className="lg:hidden">UP</span>
        </h2>
        <div className="text-xs lg:text-sm neon-cyan" style={{ fontFamily: 'Orbitron, monospace' }}>
          +${formatNumber(getTotalPassiveIncome())}/s
        </div>
      </div>

      {/* Upgrades list */}
      <div className="flex flex-col gap-1 lg:gap-2 lg:max-h-80 lg:overflow-y-auto">
        {upgrades.map((upgrade) => {
          const cost = getCost(upgrade);
          const affordable = canAfford(upgrade);
          
          return (
            <div
              key={upgrade.id}
              className={`
                p-1 lg:p-3 rounded-lg border transition-all duration-200
                ${affordable 
                  ? 'border-cyan-400/50 bg-cyan-900/10 hover:bg-cyan-900/20 cursor-pointer cyberpunk-button'
                  : 'border-gray-600/50 bg-gray-900/20 cursor-not-allowed opacity-75'
                }
              `}
              onClick={() => affordable && onBuyUpgrade(upgrade.id)}
            >
              {/* Mobile vertical layout */}
              <div className="lg:hidden">
                <div className="flex flex-col gap-1">
                  {/* Header: emoji + name + level */}
                  <div className="flex items-center gap-1">
                    <span className="text-xs flex-shrink-0">{getUpgradeEmoji(upgrade.id)}</span>
                    <h3 className="font-semibold text-gray-200 text-xs font-sans flex-1">
                      {upgrade.name}
                    </h3>
                    {upgrade.level > 0 && (
                      <span className="px-1 py-0 bg-cyan-500/20 text-cyan-300 text-xs rounded font-medium flex-shrink-0 border border-cyan-500/30 font-mono">
                        {upgrade.level}
                      </span>
                    )}
                  </div>
                  
                  {/* Income */}
                  <div className="text-xs text-gray-400 font-mono">
                    +${formatNumber(upgrade.passiveIncome * (upgrade.level || 1))}/s
                  </div>
                  
                  {/* Cost */}
                  <div className={`
                    text-xs font-bold font-mono
                    ${affordable 
                      ? 'neon-cyan' 
                      : 'text-gray-400'
                    }
                  `}>
                    ${formatNumber(cost)}
                  </div>
                  
                  {/* Button */}
                  <div className={`
                    px-2 py-1 rounded text-xs font-medium transition-colors border text-center font-mono
                    ${affordable
                      ? 'bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 border-cyan-500/50 neon-text'
                      : 'bg-gray-700/30 text-gray-500 border-gray-600/30'
                    }
                  `}>
                    BUY
                  </div>
                </div>
              </div>

              {/* Desktop layout (lg and up) */}
              <div className="hidden lg:block">
                <div className="flex items-start justify-between">
                  {/* Left side - upgrade info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg lg:text-xl">{getUpgradeEmoji(upgrade.id)}</span>
                      <h3 className="font-semibold text-gray-900 dark:text-white text-xs lg:text-sm">
                        {upgrade.name}
                      </h3>
                      {upgrade.level > 0 && (
                        <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 text-xs rounded-full font-medium">
                          Lv.{upgrade.level}
                        </span>
                      )}
                    </div>
                    
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-1 lg:mb-2 leading-relaxed hidden lg:block">
                      {upgrade.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs">
                      <div className="text-gray-500 dark:text-gray-400">
                        +${formatNumber(upgrade.passiveIncome)}/sec
                      </div>
                      {upgrade.level > 0 && (
                        <div className="text-blue-600 dark:text-blue-400 font-medium">
                          Current: +${formatNumber(upgrade.passiveIncome * upgrade.level)}/sec
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right side - cost and buy button */}
                  <div className="ml-2 lg:ml-3 text-right">
                    <div className={`
                      text-xs lg:text-sm font-bold mb-1
                      ${affordable 
                        ? 'text-green-600 dark:text-green-400' 
                        : 'text-red-600 dark:text-red-400'
                      }
                    `}>
                      ${formatNumber(cost)}
                    </div>
                    
                    <div className={`
                      px-2 lg:px-3 py-1 rounded-lg text-xs font-medium transition-colors
                      ${affordable
                        ? 'bg-green-600 text-white hover:bg-green-700'
                        : 'bg-gray-400 text-gray-200 cursor-not-allowed'
                      }
                    `}>
                      {affordable ? 'BUY' : 'NEED'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Help text - only on desktop */}
      <div className="mt-4 text-xs text-gray-500 dark:text-gray-400 text-center hidden lg:block">
        💡 Upgrades generate market cap automatically over time
      </div>
    </div>
  );
};
