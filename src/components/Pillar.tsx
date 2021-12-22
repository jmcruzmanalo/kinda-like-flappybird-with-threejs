import { Triplet, useBox, VectorApi } from '@react-three/cannon';
import { useFrame, useThree } from '@react-three/fiber';
import { FC, useEffect } from 'react';
import Pillar from '../Models/Pillar';
import useGameState from '../state/gameState';

export interface PillarProps {
  pillar: Pillar;
}

const Pillar: FC<PillarProps> = ({ pillar }) => {
  const { height } = pillar;
  const removePillar = useGameState((s) => s.removePillar);

  const [ref, api] = useBox(() => ({
    args: [1, pillar.height, 10],
    position: [40, pillar.offset, 0],
    onCollideBegin: () => {
      console.log('GG ka');
    },
    allowSleep: false,
  }));

  useFrame((state, delta) => {
    const position = ref.current?.position;
    if (!position) return;

    const newPosition = -0.05 + position.x;
    ref.current.position.x = newPosition;
    api.position.set(newPosition, pillar.offset, 0);
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
      <boxGeometry args={[1, pillar.height, 10]} />
      <meshStandardMaterial />
    </mesh>
  );
};

export default Pillar;
