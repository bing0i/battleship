import { Ship } from './scripts/Ship';
import { Gameboard } from './scripts/Gameboard';
import { Player } from './scripts/Player';
import { Computer } from './scripts/Computer';

test('Ship: Make ship not sink', () => {
  const aShip = Ship({
    start: {
      x: 1,
      y: 1,
    },
    end: {
      x: 2,
      y: 1,
    },
    length: 2,
    hitPosition: [0],
    orientation: 'v',
  });
  expect(aShip.isSunken()).toBe(false);
});

test('Ship: Make ship sink', () => {
  const aShip = Ship({
    start: {
      x: 1,
      y: 1,
    },
    end: {
      x: 2,
      y: 1,
    },
    length: 2,
    hitPosition: [0, 1],
    orientation: 'v',
  });
  expect(aShip.isSunken()).toBe(true);
});

test('Ship: Those positions are hit', () => {
  const aShip = Ship({
    start: {
      x: 1,
      y: 1,
    },
    end: {
      x: 2,
      y: 1,
    },
    length: 2,
    hitPosition: [],
    orientation: 'v',
  });
  aShip.hit({ x: 1, y: 2 });
  aShip.hit({ x: 3, y: 2 });
  expect(aShip.isSunken()).toBe(true);
});

test('Gameboard: Make missed attacks', () => {
  const ships = [
    Ship({
      start: {
        x: 1,
        y: 1,
      },
      end: {
        x: 2,
        y: 1,
      },
      length: 2,
      hitPosition: [],
      orientation: 'h',
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
  ];

  const gameboard = Gameboard(ships);
  gameboard.receiveAttack({ x: 4, y: 3 });
  gameboard.receiveAttack({ x: 5, y: 1 });
  expect(gameboard.isAllSunken()).toBe(false);
  expect(gameboard.missedAttacks).toEqual([
    { x: 4, y: 3 },
    { x: 5, y: 1 },
  ]);
});

test('Gameboard: Make hit attacks', () => {
  const ships = [
    Ship({
      start: {
        x: 1,
        y: 1,
      },
      end: {
        x: 2,
        y: 1,
      },
      length: 2,
      hitPosition: [],
      orientation: 'h',
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
  ];

  const gameboard = Gameboard(ships);
  gameboard.receiveAttack({ x: 1, y: 1 });
  gameboard.receiveAttack({ x: 4, y: 2 });
  expect(gameboard.missedAttacks.length).toBe(0);
  expect(gameboard.isAllSunken()).toBe(false);
});

test('Gameboard: Make all ships sink', () => {
  const ships = [
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
  ];

  const gameboard = Gameboard(ships);
  gameboard.receiveAttack({ x: 1, y: 6 });
  gameboard.receiveAttack({ x: 1, y: 7 });
  gameboard.receiveAttack({ x: 3, y: 2 });
  gameboard.receiveAttack({ x: 4, y: 2 });
  gameboard.receiveAttack({ x: 5, y: 2 });
  gameboard.receiveAttack({ x: 6, y: 2 });
  expect(gameboard.missedAttacks.length).toBe(0);
  expect(gameboard.isAllSunken()).toBe(true);
});

test('Player: Attack', () => {
  const ships = [
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
  ];

  const gameboard = Gameboard(ships);
  const player = Player(gameboard);
  player.play({ x: 5, y: 6 });
  expect(gameboard.missedAttacks.length).toBe(1);
  expect(gameboard.missedAttacks).toEqual([{ x: 5, y: 6 }]);
});

test('Computer: Attack', () => {
  const ships = [
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
  ];

  const gameboard = Gameboard(ships);
  const computer = Computer(gameboard);
  computer.play();
  expect(computer.movedPosition.length).toBe(1);
});
