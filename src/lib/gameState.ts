import { getDay } from './words';

type GameState = {
  currentGuess: string;
  guesses: string[];
  dayIndex: number;
  gameStartedAt: number;
  isGameWon: boolean;
  isGameLost: boolean;
}

export function storeGameState(gameState: GameState) {
  localStorage.setItem(`gameState.${gameState.dayIndex}`, JSON.stringify(gameState));
}

export function clearGameState() {
  const dayIndex = getDay();
  localStorage.removeItem(`gameState.${dayIndex}`);
}

export function getGameState(): GameState | null {
  const dayIndex = getDay();
  const gameState = localStorage.getItem(`gameState.${dayIndex}`);
  if (!gameState){
    return null;
  }
  return JSON.parse(gameState);
}
