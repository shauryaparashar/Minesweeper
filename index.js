let board = document.getElementById('board'),
    reset = document.getElementById('reset');

reset.addEventListener('click', ()=> {
  location.reload();
});

let cells = []; //Matrix of cells

let m = 10, //rows
    n = 10, //columns
    counter = 0;

let generateBoard = ()=> {

  for(let i = 0; i < m; i++) {
    cells.push([]);

    let row = document.createElement('div');
    row.className = 'row';

    board.appendChild(row);

    for(let j = 0; j < n; j++) {

      let square = document.createElement('div');
      square.className = 'square';

      row.appendChild(square);

      let cell = {
        square: square,
        x: i,
        y: j,
        val: 0,
        revealed: false
      }

      cells[i].push(cell);

      square.addEventListener('click', ()=> {
        reveal(cell);
      });
    }
  }
}

let generateBombs = ()=> {
  let arr = [];

  for(let i = 0; i < m; i++) {
    for(let j = 0; j < n; j++) {
      arr.push(cells[i][j]);
    }
  }

  for(let i = 0; i < 15; i++) {
    let cell = arr[Math.floor(Math.random() * arr.length)];
    cell.val = -1;
    arr.splice(arr.indexOf(cell), 1);
  }

}

let generateValues = ()=> {

  for(let i = 0; i < m; i++) {
    for(let j = 0; j < n; j++) {

      //Calculating Values of each cell
      for(let xoff = -1; xoff <= 1; xoff++) {
        for(let yoff = -1; yoff <= 1; yoff++) {
          if(
            cells[i][j].val !== -1
            && (i+xoff)>= 0 && (i+xoff) < m
            && (j+yoff)>= 0 && (j+yoff) < n) {
              if(cells[i+xoff][j+yoff].val === -1) {
                cells[i][j].val += 1;
              }
          }
        }
      }

    }
  }

}

let reveal = (cell)=> {

  if(cell.val === -1) {
    gameOver();
  } else if(cell.val > 0) {
    cell.square.innerHTML = cell.val;
    cell.revealed = true;
    cell.square.className += ' revealed';
    counter++;
  } else {

    for(let xoff = -1; xoff <= 1; xoff++) {
      for(let yoff = -1; yoff <= 1; yoff++) {

        if(cell.x+xoff >= 0 && cell.x+xoff < m
          && cell.y+yoff >= 0 && cell.y+yoff < n ){

            if(cells[cell.x + xoff][cell.y + yoff].val !== -1
              && !cells[cell.x + xoff][cell.y + yoff].revealed) {

                cell.revealed = true;
                cell.square.className += ' revealed';
                reveal(cells[cell.x + xoff][cell.y + yoff]);
              }

        }

      }
    }
    counter++;
  }

}

let gameOver = ()=> {
  document.getElementsByClassName('info')[0].innerHTML = '<h3>Oops!! Game Over</h3>';
  reset.hidden = false;

  console.log("game over");
  for(let i = 0; i < m; i++) {
    for(let j = 0; j < n; j++) {

      if(cells[i][j].val === -1) {
        cells[i][j].square.innerHTML = 'X';
      } else {
        cells[i][j].square.innerHTML = cells[i][j].val;
      }

      cells[i][j].square.className += ' revealed';
    }
  }
}

generateBoard();
generateBombs();
generateValues();
