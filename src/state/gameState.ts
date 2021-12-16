import create from 'zustand';
import Pillar from '../Models/Pillar';
import { v4 } from 'uuid';
import produce from 'immer';
import { devtools } from 'zustand/middleware';

interface GameState {
  gameStarted: boolean;
  startGame: () => void;

  pillars: Pillar[];
  addPillar: () => void;
  removePillar: (id: string) => void;
}

const useGameState = create<GameState>(
  devtools((set, get) => ({
    gameStarted: false,
    startGame: () => {
      set((state) => {
        return { ...state, gameStarted: true };
      });
    },
    endGame: () => {
      set((state) => {
        return { ...state, gameStarted: true };
      });
    },
    pillars: [],
    addPillar: () => {
      set((state) => {
        return { ...state, pillars: [...state.pillars, { id: v4() }] };
      });
    },
    removePillar: (id) => {
      const currentState = get();
      const newState = produce(currentState, (draft) => {
        const index = draft.pillars.findIndex((p) => p.id === id);
        draft.pillars.splice(index, 1);
      });
      return set(newState);
    },
  }))
);

useGameState.subscribe((state) => {
  console.log('Current state: ', state);
});

export default useGameState;
