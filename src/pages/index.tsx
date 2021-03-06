import { Debug, Physics } from '@react-three/cannon';
import { Canvas } from '@react-three/fiber';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import Bird from '../components/Bird';
import CameraController from '../components/CameraController';
import Floor from '../components/Floor';
import GameOverPillar from '../components/GameOverPillar';
import Pillar from '../components/Pillar';
import useGameState from '../state/gameState';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  const { pillars, addPillar, gameStarted, endGame } = useGameState();

  useEffect(() => {
    document.addEventListener('keypress', (event) => {
      // Spacebar was clicked
      const key = event.key;
      if (key === 'r') {
        endGame();
      }
    });
  }, []);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (gameStarted) {
      addPillar();
      interval = setInterval(() => {
        addPillar();
      }, 2000);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [gameStarted]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Canvas
          camera={{
            fov: 75,
            near: 0.1,
            far: 1000,
            position: [0, 0, 20],
          }}
        >
          <CameraController />
          <ambientLight intensity={0.5} castShadow />

          <pointLight position={[-10, 10, 0]} intensity={0.3} castShadow />
          <pointLight position={[10, 10, 0]} intensity={0.3} castShadow />
          <Physics gravity={[0, -20, 0]} allowSleep={false}>
            {/* <Debug color="black" scale={1}> */}
            <GameOverPillar />
            <Bird />
            {pillars.map((pillar) => {
              return <Pillar key={pillar.id} pillar={pillar} />;
            })}
            <Floor />
            {/* </Debug> */}
          </Physics>
        </Canvas>
      </main>
    </div>
  );
};

export default Home;
