'use client';

import React, { useState } from 'react';

interface MainClickButtonProps {
  clickValue: number;
  onClick: () => void;
  disabled?: boolean;
}

export const MainClickButton: React.FC<MainClickButtonProps> = ({
  clickValue,
  onClick,
  disabled = false,
}) => {
  const [isClicked, setIsClicked] = useState(false);
  const [showValue, setShowValue] = useState(false);

  const formatNumber = (num: number): string => {
    if (num >= 1_000_000) {
      return `${(num / 1_000_000).toFixed(1)}M`;
    } else if (num >= 1_000) {
      return `${(num / 1_000).toFixed(1)}K`;
    }
    return num.toLocaleString();
  };

  const handleClick = () => {
    if (disabled) return;
    
    setIsClicked(true);
    setShowValue(true);
    onClick();
    
    // Reset animations
    setTimeout(() => setIsClicked(false), 150);
    setTimeout(() => setShowValue(false), 1000);
  };

  // Handle keyboard interaction
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.code === 'Space' || e.code === 'Enter') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center">
      {/* Value popup animation */}
      {showValue && (
        <div 
          className="absolute -top-8 text-green-500 font-bold text-lg animate-bounce pointer-events-none z-10"
          style={{
            animation: 'fadeUpOut 1s ease-out forwards',
          }}
        >
          +${formatNumber(clickValue)}
        </div>
      )}
      
      {/* Main click button */}
      <button
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        className={`
          relative w-32 h-32 sm:w-40 sm:h-40 lg:w-56 lg:h-56 rounded-full 
          bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600
          hover:from-cyan-300 hover:via-blue-400 hover:to-purple-500
          disabled:from-gray-600 disabled:via-gray-700 disabled:to-gray-800
          shadow-xl lg:shadow-2xl hover:shadow-2xl lg:hover:shadow-3xl
          transform transition-all duration-150 ease-out
          focus:outline-none focus:ring-4 focus:ring-cyan-300/50
          select-none touch-manipulation
          border-2 border-cyan-400/50
          ${isClicked ? 'scale-95' : 'hover:scale-105'}
          ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer active:scale-95 hover:border-cyan-300'}
        `}
        style={{
          touchAction: 'manipulation',
          boxShadow: !disabled 
            ? '0 0 30px rgba(0, 212, 255, 0.3), inset 0 0 30px rgba(255, 255, 255, 0.1)' 
            : 'none',
          background: isClicked 
            ? 'linear-gradient(to bottom right, #22d3ee, #3b82f6, #8b5cf6)' 
            : undefined
        }}
      >
        {/* Cyberpunk pattern overlay */}
        <div className="absolute inset-2 lg:inset-4 rounded-full bg-gradient-to-br from-orange-500 to-red-600 opacity-60" />
        
        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <div className="text-2xl sm:text-3xl lg:text-5xl mb-1 lg:mb-2 neon-cyan">⚡</div>
          <div className="text-xs sm:text-sm lg:text-base font-bold text-center leading-tight neon-text" style={{ fontFamily: 'Orbitron, monospace' }}>
            FLIP<br />RUG
          </div>
          <div className="text-xs opacity-90 mt-0.5 lg:mt-1 neon-cyan" style={{ fontFamily: 'Orbitron, monospace' }}>
            +${formatNumber(clickValue)}
          </div>
        </div>
        
        {/* Shine effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/30 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
      </button>
      
      {/* Instructions text */}
      <div className="mt-2 lg:mt-4 text-center text-gray-600 dark:text-gray-400 text-xs lg:text-sm">
        {disabled ? 'Game Over' : 'Tap to flip rugs and earn market cap!'}
      </div>
      
      {/* CSS for animations */}
      <style jsx>{`
        @keyframes fadeUpOut {
          0% {
            opacity: 1;
            transform: translateY(0);
          }
          100% {
            opacity: 0;
            transform: translateY(-30px);
          }
        }
      `}</style>
    </div>
  );
};
