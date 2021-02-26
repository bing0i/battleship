const UserInterface = (gbsInfo) => {
  const gameboardsInfo = gbsInfo;
  const gameboards = Array.from(document.querySelectorAll('.gameboard'));

  const createGameboards = () => {
    for (let i = 1; i <= 10; i++) {
      for (let j = 1; j <= 10; j++) {
        for (let k = 0; k < gameboards.length; k++) {
          let square = document.createElement('div');
          square.className = `square position-${j}-${i}`;
          square.addEventListener('click', () => {
            attack(square, gameboardsInfo[k], { j, i });
          });
          gameboards[k].appendChild(square);
        }
      }
    }
  };

  const clickToAttack = () => {
    const squares = Array.from(document.querySelectorAll('.square'));
    for (let j = 0; j < squares.length; j++) {
      squares[j].addEventListener('click', (e) => {
        const splittedStrings = e.target.className.split('-');
        const pos = {
          x: parseInt(splittedStrings[1]) - 1,
          y: parseInt(splittedStrings[2]) - 1,
        };
        const gameboard = e.target.parentNode;
        gameboard.className.split(' ')[1] === 'player-gb'
          ? attack(e.target, gameboardsInfo[0], pos)
          : attack(e.target, gameboardsInfo[1], pos);
        gameboard.classList.add('disabled');
        const nextGameboard = gameboard.nextElementSibling
          ? gameboard.nextElementSibling
          : gameboard.previousElementSibling;
        nextGameboard.classList.remove('disabled');
      });
    }
  };

  const placeShips = () => {
    for (let i = 0; i < gameboardsInfo.length; i++) {
      for (let j = 0; j < gameboardsInfo[i].ships.length; j++) {
        let position = gameboardsInfo[i].ships[j].position;
        let x = position.start.x;
        let y = position.start.y;
        for (let k = 0; k < position.length; k++) {
          if (position.orientation === 'h') {
            x = position.start.x + k;
            y = position.start.y;
          } else {
            x = position.start.x;
            y = position.start.y + k;
          }
          let square = gameboards[i].querySelector(
            `.position-${x + 1}-${y + 1}`
          );
          square.style.backgroundColor = 'red';
        }
      }
    }
  };

  const attack = (square, gameboardInfo, pos) => {
    if (gameboardInfo.receiveAttack(pos)) {
      square.style.backgroundColor = 'blue';
    } else {
      square.style.backgroundColor = 'orange';
    }
  };

  return {
    createGameboards,
    placeShips,
    clickToAttack,
    attack,
  };
};

export { UserInterface };
