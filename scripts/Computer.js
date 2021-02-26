const Computer = (enemyGameboard) => {
  const movedPosition = [];
  const play = () => {
    if (movedPosition.length === 10 * 10) return null;

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
    let isHit = enemyGameboard.receiveAttack(newPos);
    return { isHit, newPos };
  };

  return { play, movedPosition };
};

export { Computer };
