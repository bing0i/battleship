const UserInterface = (gbsInfo, pls) => {
  const gameboardsInfo = gbsInfo;
  const players = pls;
  const gameboards = Array.from(document.querySelectorAll('.gameboard'));

  const createGameboards = () => {
    for (let i = 0; i <= 9; i++) {
      for (let j = 0; j <= 9; j++) {
        for (let k = 0; k < gameboards.length; k++) {
          let square = document.createElement('div');
          square.className = `square position-${j}-${i}`;
          gameboards[k].appendChild(square);
        }
      }
    }
  };

  const clickToAttack = () => {
    const squares = Array.from(gameboards[1].querySelectorAll('.square'));
    for (let i = 0; i < squares.length; i++) {
      squares[i].addEventListener('click', (e) => {
        const splittedStrings = e.target.className.split('-');
        const pos = {
          x: parseInt(splittedStrings[1]),
          y: parseInt(splittedStrings[2]),
        };
        attack(e.target, gameboardsInfo[1].receiveAttack(pos));

        const { isHit, newPos } = players[1].play();
        if (newPos) {
          const attackedSquare = gameboards[0].querySelector(
            `.position-${newPos.x}-${newPos.y}`
          );
          attack(attackedSquare, isHit);
        }

        if (
          gameboardsInfo[0].isAllSunken() ||
          gameboardsInfo[1].isAllSunken()
        ) {
          gameboards[1].classList.add('disabled');
        }
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
          let square = gameboards[i].querySelector(`.position-${x}-${y}`);
          square.style.backgroundColor = 'red';
        }
      }
    }
  };

  const attack = (square, isHit) => {
    isHit
      ? (square.style.backgroundColor = 'blue')
      : (square.style.backgroundColor = 'orange');
  };

  return {
    createGameboards,
    placeShips,
    clickToAttack,
    attack,
  };
};

export { UserInterface };
