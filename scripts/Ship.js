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

export { Ship };
