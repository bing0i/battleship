const Ship = (pos) => {
  const position = pos;
  const hit = (pos) => {
    position.hitPosition.push(
      position.orientation === 'v'
        ? position.end.y - pos.y
        : position.end.x - pos.x
    );
  };

  const isSunk = () => {
    return position.hitPosition.length === position.length;
  };

  return {
    hit,
    isSunk,
    position,
  };
};

const Gameboard = () => {
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
      orientation: 'v',
    }),
  ];
  const missedAttacks = [];

  const placeShips = () => {};

  const receiveAttack = () => {};
  return {};
};

const Player = () => {
  return {};
};

export { Ship, Gameboard, Player };
