import { Ship } from './scripts/Ship.js';
import { Gameboard } from './scripts/Gameboard.js';
import { Player } from './scripts/Player.js';
import { Computer } from './scripts/Computer.js';
import { UserInterface } from './scripts/UserInterface.js';

const gameboardsInfo = [
  Gameboard([
    Ship({
      start: {
        x: 1,
        y: 6,
      },
      end: {
        x: 1,
        y: 7,
      },
      length: 2,
      hitPosition: [],
      orientation: 'v',
    }),
    Ship({
      start: {
        x: 3,
        y: 2,
      },
      end: {
        x: 6,
        y: 2,
      },
      length: 4,
      hitPosition: [],
      orientation: 'h',
    }),
  ]),
  Gameboard([
    Ship({
      start: {
        x: 1,
        y: 6,
      },
      end: {
        x: 1,
        y: 7,
      },
      length: 2,
      hitPosition: [],
      orientation: 'v',
    }),
    Ship({
      start: {
        x: 3,
        y: 2,
      },
      end: {
        x: 6,
        y: 2,
      },
      length: 4,
      hitPosition: [],
      orientation: 'h',
    }),
  ]),
];
const userInterface = UserInterface(gameboardsInfo);
userInterface.createGameboards();
userInterface.placeShips();
userInterface.clickToAttack();
