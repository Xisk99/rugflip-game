'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

// Game configuration constants
export const GAME_CONFIG = {
  TARGET_MARKET_CAP: 11_300_000_000, // 11.3B
  BASE_CLICK_VALUE: 10_000, // 10K per click
  PASSIVE_INCOME_INTERVAL: 1000, // 1 second
  OBSTACLE_SPAWN_INTERVAL: 5000, // 5 seconds
  OBSTACLE_LIFETIME: 3000, // 3 seconds before auto-remove
} as const;

// Upgrade types
export interface Upgrade {
  id: string;
  name: string;
  description: string;
  baseCost: number;
  level: number;
  passiveIncome: number; // Market cap per second
  costMultiplier: number;
}

// Obstacle types
export interface Obstacle {
  id: string;
  type: 'fake-rug' | 'scam-bot' | 'pump-trap';
  x: number;
  y: number;
  createdAt: number;
}

// Game state interface
export interface GameState {
  marketCap: number;
  totalClicks: number;
  clickValue: number;
  upgrades: Upgrade[];
  obstacles: Obstacle[];
  gameStarted: boolean;
  gameWon: boolean;
  gameLost: boolean;
  showInstructions: boolean;
}

// Initial upgrades configuration
const INITIAL_UPGRADES: Upgrade[] = [
  {
    id: 'auto-flipper',
    name: 'Auto Flipper',
    description: 'Automatically flips rugs for passive income',
    baseCost: 50_000,
    level: 0,
    passiveIncome: 100,
    costMultiplier: 1.5,
  },
  {
    id: 'whale-investor',
    name: 'Whale Investor',
    description: 'Attracts big investors for massive passive gains',
    baseCost: 500_000,
    level: 0,
    passiveIncome: 1_000,
    costMultiplier: 1.8,
  },
  {
    id: 'marketing-bot',
    name: 'Marketing Bot',
    description: 'Spreads hype and increases market cap generation',
    baseCost: 2_000_000,
    level: 0,
    passiveIncome: 5_000,
    costMultiplier: 2.0,
  },
  {
    id: 'diamond-hands',
    name: 'Diamond Hands',
    description: 'Prevents market cap loss from obstacles',
    baseCost: 10_000_000,
    level: 0,
    passiveIncome: 20_000,
    costMultiplier: 2.2,
  },
];

// Initial game state
const INITIAL_STATE: GameState = {
  marketCap: 0,
  totalClicks: 0,
  clickValue: GAME_CONFIG.BASE_CLICK_VALUE,
  upgrades: INITIAL_UPGRADES,
  obstacles: [],
  gameStarted: false,
  gameWon: false,
  gameLost: false,
  showInstructions: false, // Start as false, will be set correctly after localStorage check
};

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>(INITIAL_STATE);
  const [isInitialized, setIsInitialized] = useState(false);
  const passiveIncomeRef = useRef<NodeJS.Timeout>();
  const obstacleSpawnRef = useRef<NodeJS.Timeout>();

  // Load game state from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem('rugflip-game-state');
    
    if (savedState) {
      try {
        const parsed = JSON.parse(savedState);
        // Always load the saved state but ALWAYS show instructions on page load
        setGameState(prev => ({
          ...prev,
          ...parsed,
          obstacles: [], // Don't restore obstacles
          showInstructions: true, // ALWAYS show instructions when entering the game
        }));
      } catch (error) {
        console.error('Failed to load saved game state:', error);
        // If error loading, show instructions for new game
        setGameState(prev => ({
          ...prev,
          showInstructions: true,
        }));
      }
    } else {
      // No saved state, show instructions for new game
      setGameState(prev => ({
        ...prev,
        showInstructions: true,
      }));
    }
    
    setIsInitialized(true);
  }, []);

  // Save game state to localStorage
  const saveGameState = useCallback((state: GameState) => {
    const stateToSave = {
      ...state,
      obstacles: [], // Don't save obstacles
    };
    localStorage.setItem('rugflip-game-state', JSON.stringify(stateToSave));
  }, []);

  // Start passive income generation
  useEffect(() => {
    if (gameState.gameStarted && !gameState.gameWon && !gameState.gameLost) {
      passiveIncomeRef.current = setInterval(() => {
        setGameState(prev => {
          const totalPassiveIncome = prev.upgrades.reduce((total, upgrade) => 
            total + (upgrade.passiveIncome * upgrade.level), 0
          );
          
          if (totalPassiveIncome > 0) {
            const newState = {
              ...prev,
              marketCap: prev.marketCap + totalPassiveIncome,
            };
            
            // Check for victory condition
            if (newState.marketCap >= GAME_CONFIG.TARGET_MARKET_CAP) {
              newState.gameWon = true;
            }
            
            saveGameState(newState);
            return newState;
          }
          return prev;
        });
      }, GAME_CONFIG.PASSIVE_INCOME_INTERVAL);
    }

    return () => {
      if (passiveIncomeRef.current) {
        clearInterval(passiveIncomeRef.current);
      }
    };
  }, [gameState.gameStarted, gameState.gameWon, gameState.gameLost, saveGameState]);

  // Start obstacle spawning
  useEffect(() => {
    if (gameState.gameStarted && !gameState.gameWon && !gameState.gameLost) {
      obstacleSpawnRef.current = setInterval(() => {
        setGameState(prev => {
          // Only spawn obstacles if market cap is high enough
          if (prev.marketCap < 100_000) return prev;

          const obstacleTypes: Obstacle['type'][] = ['fake-rug', 'scam-bot', 'pump-trap'];
          const randomType = obstacleTypes[Math.floor(Math.random() * obstacleTypes.length)];
          
          const newObstacle: Obstacle = {
            id: Date.now().toString(),
            type: randomType,
            x: Math.random() * 80 + 10, // 10-90% of screen width
            y: Math.random() * 60 + 20, // 20-80% of screen height
            createdAt: Date.now(),
          };

          return {
            ...prev,
            obstacles: [...prev.obstacles, newObstacle],
          };
        });
      }, GAME_CONFIG.OBSTACLE_SPAWN_INTERVAL);
    }

    return () => {
      if (obstacleSpawnRef.current) {
        clearInterval(obstacleSpawnRef.current);
      }
    };
  }, [gameState.gameStarted, gameState.gameWon, gameState.gameLost]);

  // Remove expired obstacles and apply damage
  useEffect(() => {
    const interval = setInterval(() => {
      setGameState(prev => {
        const now = Date.now();
        const expiredObstacles = prev.obstacles.filter(
          obstacle => now - obstacle.createdAt >= GAME_CONFIG.OBSTACLE_LIFETIME
        );
        
        // Calculate total damage from expired obstacles
        let totalDamage = 0;
        expiredObstacles.forEach(obstacle => {
          switch (obstacle.type) {
            case 'fake-rug':
              totalDamage += Math.floor(prev.marketCap * 0.1); // 10%
              break;
            case 'scam-bot':
              totalDamage += Math.floor(prev.marketCap * 0.05); // 5%
              break;
            case 'pump-trap':
              totalDamage += Math.floor(prev.marketCap * 0.15); // 15%
              break;
          }
        });

        const newMarketCap = Math.max(0, prev.marketCap - totalDamage);
        const newState = {
          ...prev,
          marketCap: newMarketCap,
          obstacles: prev.obstacles.filter(
            obstacle => now - obstacle.createdAt < GAME_CONFIG.OBSTACLE_LIFETIME
          ),
        };

        // Check for defeat condition
        if (newMarketCap <= 0 && prev.marketCap > 0) {
          newState.gameLost = true;
        }

        // Save state if there were changes
        if (totalDamage > 0) {
          saveGameState(newState);
        }

        return newState;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [saveGameState]);

  // Game actions
  const clickMainButton = useCallback(() => {
    if (!gameState.gameStarted || gameState.gameWon || gameState.gameLost) return;

    setGameState(prev => {
      const newState = {
        ...prev,
        marketCap: prev.marketCap + prev.clickValue,
        totalClicks: prev.totalClicks + 1,
      };

      // Check for victory condition
      if (newState.marketCap >= GAME_CONFIG.TARGET_MARKET_CAP) {
        newState.gameWon = true;
      }

      saveGameState(newState);
      return newState;
    });
  }, [gameState.gameStarted, gameState.gameWon, gameState.gameLost, saveGameState]);

  const clickObstacle = useCallback((obstacleId: string) => {
    setGameState(prev => {
      const obstacle = prev.obstacles.find(o => o.id === obstacleId);
      if (!obstacle) return prev;

      // Clicking an obstacle removes it WITHOUT causing damage
      const newState = {
        ...prev,
        obstacles: prev.obstacles.filter(o => o.id !== obstacleId),
      };

      saveGameState(newState);
      return newState;
    });
  }, [saveGameState]);

  const buyUpgrade = useCallback((upgradeId: string) => {
    setGameState(prev => {
      const upgrade = prev.upgrades.find(u => u.id === upgradeId);
      if (!upgrade) return prev;

      const cost = Math.floor(upgrade.baseCost * Math.pow(upgrade.costMultiplier, upgrade.level));
      if (prev.marketCap < cost) return prev;

      const newUpgrades = prev.upgrades.map(u =>
        u.id === upgradeId
          ? { ...u, level: u.level + 1 }
          : u
      );

      const newState = {
        ...prev,
        marketCap: prev.marketCap - cost,
        upgrades: newUpgrades,
      };

      saveGameState(newState);
      return newState;
    });
  }, [saveGameState]);

  const startGame = useCallback(() => {
    setGameState(prev => {
      const newState = {
        ...prev,
        gameStarted: true,
        showInstructions: false,
      };
      saveGameState(newState);
      return newState;
    });
  }, [saveGameState]);

  const resetGame = useCallback(() => {
    localStorage.removeItem('rugflip-game-state');
    setGameState({
      ...INITIAL_STATE,
      showInstructions: true, // Always show instructions when resetting
    });
  }, []);

  const toggleInstructions = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      showInstructions: !prev.showInstructions,
    }));
  }, []);

  return {
    gameState,
    isInitialized,
    actions: {
      clickMainButton,
      clickObstacle,
      buyUpgrade,
      startGame,
      resetGame,
      toggleInstructions,
    },
  };
};
