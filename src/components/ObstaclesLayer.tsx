'use client';

import React, { useState } from 'react';
import { Obstacle, GAME_CONFIG } from '../hooks/useGameState';

interface ObstaclesLayerProps {
  obstacles: Obstacle[];
  onClickObstacle: (obstacleId: string) => void;
}

export const ObstaclesLayer: React.FC<ObstaclesLayerProps> = ({
  obstacles,
  onClickObstacle,
}) => {
  const [clickedObstacles, setClickedObstacles] = useState<Set<string>>(new Set());

  const getObstacleEmoji = (type: Obstacle['type']): string => {
    switch (type) {
      case 'fake-rug':
        return '🎭';
      case 'scam-bot':
        return '🤖';
      case 'pump-trap':
        return '💸';
      default:
        return '❌';
    }
  };

  const getObstacleLabel = (type: Obstacle['type']): string => {
    switch (type) {
      case 'fake-rug':
        return 'Fake Rug';
      case 'scam-bot':
        return 'Scam Bot';
      case 'pump-trap':
        return 'Pump Trap';
      default:
        return 'Obstacle';
    }
  };

  const getObstacleDamage = (type: Obstacle['type']): string => {
    switch (type) {
      case 'fake-rug':
        return '-10%';
      case 'scam-bot':
        return '-5%';
      case 'pump-trap':
        return '-15%';
      default:
        return '';
    }
  };

  const getTimeRemaining = (obstacle: Obstacle): number => {
    const elapsed = Date.now() - obstacle.createdAt;
    const remaining = GAME_CONFIG.OBSTACLE_LIFETIME - elapsed;
    return Math.max(0, remaining);
  };

  const getProgressPercentage = (obstacle: Obstacle): number => {
    const elapsed = Date.now() - obstacle.createdAt;
    return Math.min((elapsed / GAME_CONFIG.OBSTACLE_LIFETIME) * 100, 100);
  };

  const handleObstacleClick = (obstacleId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    
    // Add click animation
    setClickedObstacles(prev => new Set(prev).add(obstacleId));
    setTimeout(() => {
      setClickedObstacles(prev => {
        const newSet = new Set(prev);
        newSet.delete(obstacleId);
        return newSet;
      });
    }, 200);

    onClickObstacle(obstacleId);
  };

  if (obstacles.length === 0) {
    return null;
  }

  return (
    <div className="absolute inset-0 pointer-events-none">
      {obstacles.map((obstacle) => {
        const isClicked = clickedObstacles.has(obstacle.id);
        const progressPercentage = getProgressPercentage(obstacle);
        
        return (
          <div
            key={obstacle.id}
            className={`
              absolute pointer-events-auto cursor-pointer
              transform transition-all duration-200 ease-out
              ${isClicked ? 'scale-75 opacity-50' : 'hover:scale-110'}
            `}
            style={{
              left: `${obstacle.x}%`,
              top: `${obstacle.y}%`,
              transform: `translate(-50%, -50%) ${isClicked ? 'scale(0.75)' : ''}`,
            }}
            onClick={(e) => handleObstacleClick(obstacle.id, e)}
          >
            {/* Obstacle container */}
            <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-3 shadow-lg border-2 border-red-300 dark:border-red-700 animate-pulse">
              {/* Warning icon and emoji */}
              <div className="text-center mb-2">
                <div className="text-2xl mb-1">{getObstacleEmoji(obstacle.type)}</div>
                <div className="text-xs font-bold text-red-600 dark:text-red-400">
                  {getObstacleLabel(obstacle.type)}
                </div>
                <div className="text-xs font-semibold text-red-700 dark:text-red-300">
                  {getObstacleDamage(obstacle.type)}
                </div>
              </div>

              {/* Timer progress bar */}
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1 mb-2">
                <div 
                  className="h-full bg-red-500 rounded-full transition-all duration-100 ease-linear"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>

              {/* Action text */}
              <div className="text-center text-xs text-gray-600 dark:text-gray-400">
                Tap to remove!
              </div>

              {/* Pulsing warning border */}
              <div className="absolute inset-0 rounded-2xl border-2 border-red-400 animate-ping opacity-75 pointer-events-none" />
            </div>

            {/* Damage preview on hover (desktop only) */}
            <div className="hidden md:block absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 hover:opacity-100 transition-opacity bg-red-600 text-white text-xs px-2 py-1 rounded whitespace-nowrap pointer-events-none">
              Click to avoid {getObstacleDamage(obstacle.type)} loss!
            </div>
          </div>
        );
      })}

      {/* General warning for mobile users */}
      {obstacles.length > 0 && (
        <div className="md:hidden absolute top-4 left-1/2 transform -translate-x-1/2 bg-red-600 text-white text-xs px-3 py-1 rounded-full animate-bounce">
          ⚠️ Tap obstacles to remove them!
        </div>
      )}

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }
        
        @keyframes ping {
          75%, 100% {
            transform: scale(1.1);
            opacity: 0;
          }
        }
        
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0) translateX(-50%);
          }
          50% {
            transform: translateY(-10px) translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
};
