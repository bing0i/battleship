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

export { userInterface };
