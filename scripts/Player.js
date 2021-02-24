const Player = (enemyGameboard) => {
  const play = (pos) => {
    enemyGameboard.receiveAttack(pos);
  };

  return { play };
};

export { Player };
