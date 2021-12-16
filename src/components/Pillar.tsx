import { Triplet, useBox, VectorApi } from '@react-three/cannon';
import { useFrame, useThree } from '@react-three/fiber';
import { FC, useEffect } from 'react';
import Pillar from '../Models/Pillar';
import useGameState from '../state/gameState';

export interface PillarProps {
  pillar: Pillar;
}

const initialPosition: Triplet = [6, -2, 0];

const Pillar: FC<PillarProps> = ({ pillar }) => {
  const removePillar = useGameState((s) => s.removePillar);

  const [ref, api] = useBox(() => ({
    args: [1, 6, 1],
    position: initialPosition,
    onCollideBegin: () => {
      console.log('GG ka');
    },
  }));

  useFrame((state, delta) => {
    const position = ref.current?.position;
    if (!position) return;

    const newPosition = -0.01 + position.x;
    ref.current.position.x = newPosition;
    api.position.set(newPosition, -2, 0);
  });

  useEffect(() => {
    api.position.subscribe(([x, y, z]) => {
      if (x <= -20) {
        removePillar(pillar.id);
      }
    });
  }, []);

  return (
    <mesh ref={ref}>
      <boxGeometry args={[1, 6]} />
      <meshStandardMaterial />
    </mesh>
  );
};

export default Pillar;
