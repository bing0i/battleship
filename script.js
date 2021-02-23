const Ship = (pos) => {
  const position = pos;
  const hit = (pos) => {
    position.hitPosition.push(
      position.orientation === 'v'
        ? position.end.y - pos.y
        : position.end.x - pos.x
    );
  };

  const isSunken = () => {
    return position.hitPosition.length === position.length;
  };

  return {
    hit,
    isSunken,
    position,
  };
};

const Gameboard = (sh) => {
  const ships = Array.from(sh);
  const sunkenShips = [];
  const missedAttacks = [];
  const getDirectionPoints = (shipPos, pos) => {
    const directionPoints = {
      shipPoint: -1,
      posPoint: -1,
    };

    if (shipPos.orientation === 'v' && shipPos.start.x === pos.x) {
      directionPoints.shipPoint = shipPos.start.y;
      directionPoints.posPoint = pos.y;
    } else if (shipPos.orientation === 'h' && shipPos.start.y === pos.y) {
      directionPoints.shipPoint = shipPos.start.x;
      directionPoints.posPoint = pos.x;
    }

    return directionPoints;
  };

  const receiveAttack = (pos) => {
    for (let i = 0; i < ships.length; i++) {
      let { shipPoint, posPoint } = getDirectionPoints(ships[i].position, pos);
      if (shipPoint !== -1 && posPoint !== -1) {
        for (let j = 0; j < ships[i].position.length; j++) {
          if (shipPoint + j === posPoint) {
            ships[i].hit(pos);
            if (ships[i].isSunken()) {
              sunkenShips.push(i);
            }
            return true;
          }
        }
      }
    }

    missedAttacks.push(pos);
    return false;
  };

  const isAllSunken = () => {
    return ships.length === sunkenShips.length;
  };

  return {
    missedAttacks,
    receiveAttack,
    isAllSunken,
  };
};

const Player = (enemyGameboard) => {
  const play = (pos) => {
    enemyGameboard.receiveAttack(pos);
  };

  return { play };
};

const Computer = (enemyGameboard) => {
  const movedPosition = [];
  const play = () => {
    let isPresent = true;
    let newPos;
    while (isPresent) {
      let count = 0;
      newPos = {
        x: Math.floor(Math.random() * (9 - 0 + 1)) + 0,
        y: Math.floor(Math.random() * (9 - 0 + 1)) + 0,
      };
      for (let i = 0; i < movedPosition.length; i++) {
        if (
          movedPosition[i].x === newPos.x &&
          movedPosition[i].y === newPos.y
        ) {
          break;
        }
        count += 1;
      }
      if (count === movedPosition.length) isPresent = false;
    }

    movedPosition.push(newPos);
    enemyGameboard.receiveAttack(newPos);
  };

  return { play, movedPosition };
};

const userInterface = (() => {
  const createGameboards = () => {
    const gameboards = Array.from(document.querySelectorAll('.gameboard'));
    for (let i = 1; i <= 10; i++) {
      for (let j = 1; j <= 10; j++) {
        for (let k = 0; k < gameboards.length; k++) {
          let square = document.createElement('div');
          square.className = `square position-${j}-${i}`;
          let content = document.createElement('div');
          content.className = `content`;
          square.appendChild(content);
          gameboards[k].appendChild(square);
        }
      }
    }
  };

  return {
    createGameboards,
  };
})();

userInterface.createGameboards();

export { Ship, Gameboard, Player, Computer };
