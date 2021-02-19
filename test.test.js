import { Ship, Gameboard, Player } from './script';

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
  expect(aShip.isSunk()).toBe(false);
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
  expect(aShip.isSunk()).toBe(true);
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
  expect(aShip.isSunk()).toBe(true);
});
