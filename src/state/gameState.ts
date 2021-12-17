import create from 'zustand';
import Pillar, { calculateOffset } from '../Models/Pillar';
import { v4 } from 'uuid';
import produce from 'immer';
import { devtools } from 'zustand/middleware';
import getRandomNumber from '../utils/randomNumber';

interface GameState {
  gameStarted: boolean;
  startGame: () => void;
  endGame: () => void;

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
        return { ...state, gameStarted: false, pillars: [] };
      });
    },
    pillars: [],
    addPillar: () => {
      const currentState = get();
      const height = getRandomNumber(1, 6);
      const distanceToFloor = calculateOffset(height);
      const newPillar: Pillar = {
        id: v4(),
        height: height,
        distanceToFloor,
        offset: getRandomNumber(distanceToFloor * -1, distanceToFloor),
      };

      console.log(`Height: ${height}`);
      console.log(`Distance to floor: ${distanceToFloor}`);
      const newState = produce(currentState, (draft) => {
        draft.pillars.push(newPillar);
      });
      set(newState);
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

export default useGameState;
