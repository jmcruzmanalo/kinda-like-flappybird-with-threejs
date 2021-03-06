import { usePlane } from '@react-three/cannon';
import { useFrame } from '@react-three/fiber';
import { FC, useRef } from 'react';

const Floor: FC = () => {
  const [ref] = usePlane(() => ({
    args: [8, 8],
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, -5, 0],
  }));
  return (
    <group ref={ref}>
      <mesh>
        <planeBufferGeometry args={[10, 10]} />
        <meshBasicMaterial color="#ffb385" />
      </mesh>
      <mesh receiveShadow>
        <planeBufferGeometry args={[10, 10]} />
        <shadowMaterial color="lightsalmon" />
      </mesh>
    </group>
  );
};

export default Floor;
