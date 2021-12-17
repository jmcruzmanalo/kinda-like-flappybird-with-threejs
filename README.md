# Kinda like flappy bird but not really.

The goal of this project is just to practice using ThreeJS with some Physics. \
React for state management

## Tech

- react - <3
- @react-three/fiber - ThreeJS renderer
- @react-three/cannon (physics engine)
- zustand - state management

## Concepts applied

- Basic physics and collision
- Making sure physics/animation state does not cause issues with react state. Re-rendering in animation frames vs react state is completely different and one must be aware of it
- Infinite generation of "pillars". Destroying objects and creating new ones as long as the react state says the game isn't over.
