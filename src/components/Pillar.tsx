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
  const incrementScore = useGameState((s) => s.incrementScore);
  const position: Triplet = [40, pillar.offset, 0];

  const [ref, api] = useBox(() => ({
    args: [1, pillar.height, 10],
    position: position,
    allowSleep: false,
  }));

  const [pointRef, pointApi] = useBox(() => ({
    args: [0.1, 10, 10],
    position: position,
    allowSleep: false,
    collisionResponse: 0,
    onCollideEnd: () => {
      incrementScore();
    },
  }));

  useFrame((state, delta) => {
    const position = ref.current?.position;
    if (!position) return;

    const newPosition = -0.05 + position.x;
    ref.current.position.x = newPosition;
    api.position.set(newPosition, pillar.offset, 0);
    pointApi.position.set(newPosition, 0, 0);
  });

  useEffect(() => {
    api.position.subscribe(([x, y, z]) => {
      if (x <= -20) {
        removePillar(pillar.id);
      }
    });
  }, []);

  return (
    <>
      <mesh ref={ref}>
        <boxGeometry args={[1, pillar.height, 10]} />
        <meshStandardMaterial />
      </mesh>
      <mesh ref={pointRef}>
        <boxGeometry args={[0.1, 10, 10]} />
        <meshStandardMaterial color={0x00f400} opacity={0.3} transparent />
      </mesh>
    </>
  );
};

export default Pillar;
