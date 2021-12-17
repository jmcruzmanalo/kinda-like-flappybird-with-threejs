interface Pillar {
  id: string;
  height: number;
  distanceToFloor: number;
  offset: number;
}

export const calculateOffset = (pillarHeight: number) => {
  const floorOffset = -5;
  const distanceToFloor = Math.abs(floorOffset) - pillarHeight / 2;
  return distanceToFloor * -1;
};

export default Pillar;
