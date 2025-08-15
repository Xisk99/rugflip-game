'use client';

import React, { useEffect } from 'react';
import { useGameState } from '../hooks/useGameState';
import { InstructionsModal } from '../components/InstructionsModal';
import { GameHeader } from '../components/GameHeader';
import { MainClickButton } from '../components/MainClickButton';
import { UpgradesPanel } from '../components/UpgradesPanel';
import { ObstaclesLayer } from '../components/ObstaclesLayer';
import { GameEndModals } from '../components/GameEndModals';

export default function Home() {
  const { gameState, isInitialized, actions } = useGameState();

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!gameState.gameStarted || gameState.gameWon || gameState.gameLost) return;
      
      // Space bar for main click
      if (e.code === 'Space') {
        e.preventDefault();
        actions.clickMainButton();
      }
      
      // ESC for instructions
      if (e.code === 'Escape') {
        e.preventDefault();
        actions.toggleInstructions();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState.gameStarted, gameState.gameWon, gameState.gameLost, actions]);

  // Prevent zoom on mobile
  // Set dynamic viewport height for mobile browsers
  useEffect(() => {
    const setVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    // Set initial value
    setVH();

    // Update on resize and orientation change
    window.addEventListener('resize', setVH);
    window.addEventListener('orientationchange', setVH);

    return () => {
      window.removeEventListener('resize', setVH);
      window.removeEventListener('orientationchange', setVH);
    };
  }, []);

  useEffect(() => {
    const preventDefault = (e: TouchEvent) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    };

    document.addEventListener('touchstart', preventDefault, { passive: false });
    document.addEventListener('touchmove', preventDefault, { passive: false });

    return () => {
      document.removeEventListener('touchstart', preventDefault);
      document.removeEventListener('touchmove', preventDefault);
    };
  }, []);

  return (
    <div className="overflow-hidden select-none flex flex-col"
         style={{ 
           height: 'calc(var(--vh, 1vh) * 100)', 
           maxHeight: 'calc(var(--vh, 1vh) * 100)',
           background: 'linear-gradient(135deg, #0a0f1c 0%, #1a1a2e 50%, #16213e 100%)',
           fontFamily: 'Rajdhani, system-ui, sans-serif'
         }}>
      {/* Game Header */}
      <GameHeader
        marketCap={gameState.marketCap}
        onShowInstructions={actions.toggleInstructions}
        onResetGame={actions.resetGame}
      />

      {/* Main Game Area */}
      <div className="relative px-2 lg:px-4 pb-1 lg:pb-4 flex-1 flex flex-col">
        <div className="max-w-6xl mx-auto flex-1 flex flex-col">
          <div className="grid grid-cols-3 lg:grid-cols-3 gap-2 lg:gap-4 flex-1">
            {/* Left Column - Game Play Area (Mobile: 2/3 width, Desktop: 2 columns) */}
            <div className="col-span-2 lg:col-span-2 relative flex flex-col">
              {/* Main Game Container */}
              <div className="relative cyberpunk-panel rounded-2xl lg:rounded-3xl p-2 lg:p-6 min-h-[200px] lg:min-h-[600px] overflow-hidden flex-1">
                {/* Game Started State */}
                {gameState.gameStarted && (
                  <>
                    {/* Main Click Button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <MainClickButton
                        clickValue={gameState.clickValue}
                        onClick={actions.clickMainButton}
                        disabled={gameState.gameWon || gameState.gameLost}
                      />
                    </div>

                    {/* Obstacles Layer */}
                    <ObstaclesLayer
                      obstacles={gameState.obstacles}
                      onClickObstacle={actions.clickObstacle}
                    />
                  </>
                )}

                                    {/* Game Not Started State */}
                    {!gameState.gameStarted && (
                      <div className="flex flex-col items-center justify-center h-full text-center py-12">
                        <div className="text-6xl mb-6 neon-cyan">⚡</div>
                        <h1 className="text-4xl font-bold mb-4 neon-cyan font-mono">
                          RUGFLIP TAP
                        </h1>
                        <p className="text-lg mb-8 max-w-md text-gray-300">
                          The ultimate <span className="neon-orange font-semibold">crypto clicker</span> game! 
                          <br />Flip rugs, avoid scams, reach <span className="neon-cyan font-bold">11.3B market cap!</span>
                        </p>
                        <button
                          onClick={actions.startGame}
                          className="cyberpunk-button px-8 py-4 font-bold text-xl rounded-2xl neon-cyan font-mono"
                        >
                          ⚡ INITIALIZE
                        </button>
                        <div className="mt-6 text-sm text-gray-400">
                          <span className="neon-orange">⌨️</span> SPACE = CLICK | <span className="neon-orange">ESC</span> = MENU
                        </div>
                      </div>
                    )}
              </div>
            </div>

            {/* Right Column - Upgrades Panel (Mobile: 1/3 width, Desktop: Side panel) */}
            <div className="col-span-1 lg:col-span-1 flex flex-col">
              <UpgradesPanel
                upgrades={gameState.upgrades}
                marketCap={gameState.marketCap}
                onBuyUpgrade={actions.buyUpgrade}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Game State Modals */}
      <InstructionsModal
        isOpen={isInitialized && gameState.showInstructions}
        onClose={actions.toggleInstructions}
        onStartGame={actions.startGame}
        gameStarted={gameState.gameStarted}
      />

      <GameEndModals
        isVictory={gameState.gameWon}
        isDefeat={gameState.gameLost}
        marketCap={gameState.marketCap}
        totalClicks={gameState.totalClicks}
        onResetGame={actions.resetGame}
      />

      {/* Mobile-specific controls hint */}
      {gameState.gameStarted && !gameState.gameWon && !gameState.gameLost && (
        <div className="lg:hidden fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-black/70 text-white text-xs px-2 py-1 rounded-full z-40">
          💡 Tap obstacles!
        </div>
      )}

                {/* Footer */}
          <footer className="p-1.5 lg:p-4 flex-shrink-0 bg-black/30 backdrop-blur-sm border-t border-cyan-500/20">
        <div className="flex items-center justify-between w-full max-w-6xl mx-auto">
          {/* Left: Credits */}
          <div className="text-xs lg:text-sm text-gray-400 font-mono">
            <span className="text-gray-500">CRAFTED BY</span>{' '}
            <a
              href="https://x.com/xisk_99"
              target="_blank"
              rel="noopener noreferrer"
              className="neon-cyan hover:neon-orange transition-colors font-medium"
            >
              @XISK_99
            </a>
          </div>

          {/* Right: Share Progress Button */}
          <button
            onClick={() => {
              const gameUrl = window.location.href;
                              const shareText = `🎮 Playing RugFlip Tap!\n\n💰 Current Market Cap: $${gameState.marketCap.toLocaleString()}\n🎯 Target: $11.3B\n⚡ Clicks: ${gameState.totalClicks}\n\n🎮 Play now: ${gameUrl}\n\n🎯 Join the narrative to flip the 11.3B rugged in memecoins! @RugFlip\n\n💎 CA: FAMfdnr3daYqxP7g9iaSa65RNXnzLWDD8c2uPENKpump`;
              const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
              window.open(shareUrl, '_blank');
            }}
            className="cyberpunk-button px-2 lg:px-3 py-1 lg:py-1.5 rounded text-xs lg:text-sm neon-cyan font-mono font-medium hover:scale-105 transition-transform"
          >
            📤 Share Progress
          </button>
        </div>
      </footer>
    </div>
  );
}
