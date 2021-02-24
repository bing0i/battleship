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
    ships,
  };
};

export { Gameboard };
