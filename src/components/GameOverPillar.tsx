import { useBox } from '@react-three/cannon';
import { FC, useEffect, useState } from 'react';

const GameOverPillar: FC = () => {
  const [ref, api] = useBox(() => ({
    args: [1, 60, 10],
    position: [-6, 0, 0],
    allowSleep: false,
  }));

  return (
    <mesh ref={ref}>
      <boxGeometry />
      <meshStandardMaterial />
    </mesh>
  );
};

export default GameOverPillar;
