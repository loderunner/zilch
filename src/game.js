import { useState } from 'react';

export const DieState = {
  THROWN: 'thrown',
  SELECTED: 'selected',
  USED: 'used',
};

export const GameStage = {
  READY: 'ready',
  THROWING: 'throwing',
  SELECTING: 'selecting',
  LOSE: 'lose',
};

export function useStage() {
  return useState(GameStage.READY);
}

/**
 *
 * @param {string[]} players
 */
export function usePlayers(...players) {
  return useState(players.map((p) => ({ name: p, score: 0 })));
}

export function useCurrentPlayer() {
  return useState(0);
}

export function useRunScore() {
  return useState(0);
}

export function useAddScore() {
  return useState(0);
}

export function useDice() {
  return useState([
    { value: 1, state: DieState.USED },
    { value: 1, state: DieState.USED },
    { value: 1, state: DieState.USED },
    { value: 1, state: DieState.USED },
    { value: 1, state: DieState.USED },
  ]);
}
