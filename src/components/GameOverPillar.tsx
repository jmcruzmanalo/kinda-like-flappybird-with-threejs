import { Triplet, useBox } from '@react-three/cannon';
import { FC, useEffect, useState } from 'react';
import useGameState from '../state/gameState';

const GameOverPillar: FC = () => {
  const endGame = useGameState((s) => s.endGame);
  const size: Triplet = [1.01, 60, 10.01];

  const [ref, api] = useBox(() => ({
    args: size,
    position: [-5.5, 0, 0],
    allowSleep: false,
    onCollideBegin: () => {
      endGame();
    },
  }));

  return (
    <mesh ref={ref}>
      <boxGeometry args={size} />
      <meshStandardMaterial color={0xff1f1f} transparent opacity={0.5} />
    </mesh>
  );
};

export default GameOverPillar;
