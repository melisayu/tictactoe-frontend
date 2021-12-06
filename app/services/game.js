import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action, set, get } from '@ember/object';

export default class GameService extends Service {
  boardSize = 3;
  firstPlayer = 'Banana Pudding';
  secondPlayer = 'Strawberry Soup';

  @tracked board = [];
  @tracked currentPlayer = this.firstPlayer;
  @tracked gameResult = '';
  @tracked hasGameEnded = false;

  constructor() {
    super(...arguments);
    this.initBoard();
  }

  // initialize board
  initBoard() {
    let board = new Array(this.boardSize);
    for (let i = 0; i < this.boardSize; i++) {
      let row = new Array(this.boardSize);
      for (let j = 0; j < this.boardSize; j++) {
        row[j] = { coords: [i, j], value: '' }
      }
      board[i] = row;
    }
    set(this, 'board', board);
  }

  // assign symbol/mark with their own color when user select a tile
  @action
  selectTile(coords) {
    if (this.hasGameEnded) {
      return;
    }

    let value = '';
    let color = '';
    if (this.currentPlayer === this.firstPlayer) {
      value = 'X';
      color = 'red';
    } else {
      value = 'O';
      color = 'green';
    }

    // set the marking
    const tile = this.board[coords[0]][coords[1]]
    if (tile.value === '') {
       set(tile, 'value', value);
       set(tile, 'color', color);
    }

    this.hasWinner();
  }

  // check if a player wins, execute everytime a player select a tile
  hasWinner() {
    if (
      this.checkRows() ||
      this.checkColumns() ||
      this.checkDiagonals()
    ) {
      this.gameResult = `${this.currentPlayer} won the game!`;
      this.hasGameEnded = true;
    } else {
      this.assignPlayer(this.currentPlayer);
      this.areAllTilesFilled();
    }
  }

  // take current player you want to change to take turn to another player
  assignPlayer(player) {
    if (player === this.firstPlayer) {
      this.currentPlayer = this.secondPlayer;
    } else {
      this.currentPlayer = this.firstPlayer;
    }
  }

  areAllTilesFilled() {
    let hasEmptyTile = false;
    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board.length; j++) {
        if (this.board[i][j].value === '') {
          hasEmptyTile = true;
        }
      }
    }
    if (!hasEmptyTile) {
      this.gameResult = 'Game over! Nobody wins.';
    }
  }

  // check horizontally
  checkRows() {
    for (let row of this.board) {
      if (row[0].value !== '' && row[0].value === row[1].value && row[0].value === row[2].value) {
        return true;
      }
    }
    return false;
  }

  // check vertically
  checkColumns() {
    for (let i = 0; i < this.boardSize; i++) {
     if (this.board[0][i].value !== '' &&
        this.board[0][i].value === this.board[1][i].value &&
        this.board[0][i].value === this.board[2][i].value) {
        return true;
      } 
    }
    return false;
  }

  // check diagonally
  checkDiagonals() {
    let diagonalOne = [];
    let diagonalTwo = [];
    for (let i = 0; i < this.boardSize; i++) {
      for (let j = 0; j < this.boardSize; j++) {
        if (i === j) {
          diagonalOne.push(this.board[i][j]);
        }

        if (i + j === this.boardSize - 1) {
          diagonalTwo.push(this.board[i][j]);
        }
      }
    }

    if (!diagonalOne.find((d) => d.value === '')) {
      return (
        diagonalOne[0].value === diagonalOne[1].value &&
        diagonalOne[0].value === diagonalOne[2].value
      );
    }

    if (!diagonalTwo.find((d) => d.value === '')) {
      return (
        diagonalTwo[0].value === diagonalTwo[1].value &&
        diagonalTwo[0].value === diagonalTwo[2].value
      );
    }
  }

  // clear board everytime there's a winner or when the game reset
  @action
  clearBoard() {
    this.assignPlayer(this.playerTwo);
    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board.length; j++) {
        set(this.board[i][j], 'value', '');
      }
    }
    this.gameResult = '';
    this.hasGameEnded = false;
  }
}
