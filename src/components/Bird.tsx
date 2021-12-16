import { useBox, useSphere } from '@react-three/cannon';
import { FC, useCallback, useEffect } from 'react';
import useGameState from '../state/gameState';

const Bird: FC = () => {
  const { gameStarted, startGame } = useGameState(
    ({ gameStarted, startGame }) => ({ gameStarted, startGame })
  );
  const [ref, api] = useSphere(() => ({
    mass: 1,
    position: [0, 3, 0],
    onCollideBegin: () => {
      console.log('Hit me');
    },
    linearFactor: [0, 0, 0],
    angularDamping: 1,
  }));

  console.log(gameStarted);

  useEffect(() => {
    const event = (event: KeyboardEvent) => {
      // Spacebar was clicked
      const key = event.key;
      if (key === ' ' || key === 'j') {
        if (gameStarted) {
          api.applyLocalForce([0, 900, 0], [0, 0, 0]);
        } else {
          startGame();
        }
      }
    };
    document.addEventListener('keypress', event);

    return () => {
      document.removeEventListener('keypress', event);
    };
  }, [gameStarted]);

  useEffect(() => {
    if (gameStarted) {
      api.linearFactor.set(0, 1, 0);
    }
  }, [gameStarted]);

  return (
    <mesh
      ref={ref}
      onClick={() => {
        console.log('Testing');
      }}
    >
      <sphereGeometry args={[1]} />
      <meshStandardMaterial />
    </mesh>
  );
};

export default Bird;
