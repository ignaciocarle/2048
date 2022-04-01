import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  private board!: number[][];
  private previousBoard!: number[][];
  private boardSize!: number;
  private goal!: number;
  private max!: number;
  private score!: number;

  constructor() { }

  ///////////////////////////////////////////////////////////////// getters

  public get getBoard(): number[][] {
    return this.board
  }

  public get getScore(): number {
    return this.score
  }

  ///////////////////////////////////////////////////////////// initial settings

  private newGame(): void {
    this.boardSize = 4;
    this.goal = 2048;
    this.max = 0
    this.score = 0;
    this.board = Array.from(
      { length: this.boardSize }, () => Array.from(
        { length: this.boardSize }, () => 0))

    /*[
      [2, 2, 2, 4],
      [4, 2, 4, 2],
      [2, 4, 2, 4],
      [4, 2, 4, 2]
    ]*/

    this.addTile(this.board)
    this.addTile(this.board)
    this.previousBoard = this.board.map(x => x)
    console.log(`Juego iniciado`);
  }

  ///////////////////////////////////////////////////////////////// user actions

  public reset(): void {
    this.newGame()
  }

  takeTurn(dir: string): void {
    //move
    this.moveTo(dir)
    //add score
    //update max
    //if goalReached then win
    //if checkLost then loose and reset
    if (this.hasLost()) {
      alert("You loose")
    }
    this.board = this.addTile(this.board)
  }

  ////////////////////////////////////////////////////////////////// turn logic

  private hasLost(): boolean {
    const testBoard = [
      [2, 4, 8, 16],
      [4, 8, 16, 2],
      [8, 16, 2, 4],
      [16, 2, 4, 8]
    ]

    const areMovesLeft = (board: number[][]): boolean => {
      return board.some((row) => {
        return row.some((num, i, arr) => {
          return num === arr[i + 1]
        })
      })
    }

    if (areMovesLeft(this.board) || areMovesLeft(this.transpose(this.board))) return false
    else { return true }
  }

  private moveTo(dir: string) {
    switch (dir) {
      case "r":
        this.board = this.moveRight(this.board)
        break;
      case "l":
        this.board = this.moveLeft(this.board)
        break;
      case "d":
        this.board = this.moveDown(this.board)
        break;
      case "u":
        this.board = this.moveUp(this.board)
        break;
      default:
        console.log("wrong entry");
        break;
    }
  }

  ///////////////////////////////////////////////////////////// mooves handling

  private addTile(board: number[][]): number[][] {
    const nextBoard = board;
    const num = Math.random() > 0.9 ? 4 : 2;
    const row = Math.floor(Math.random() * this.boardSize);
    const col = Math.floor(Math.random() * this.boardSize);

    if (nextBoard[row][col] === 0) {
      nextBoard[row][col] = num
    } else { this.addTile(this.board) }
    return nextBoard
  }

  private moveRight(board: number[][]): number[][] {
    return this.move(
      board)
  }

  private moveLeft(board: number[][]): number[][] {
    return this.reverse(
      this.move(
        this.reverse(
          board)))
  }

  private moveDown(board: number[][]): number[][] {
    return this.transpose(
      this.move(
        this.transpose(
          board)))
  }

  private moveUp(board: number[][]): number[][] {
    return this.transpose(
      this.reverse(
        this.move(
          this.reverse(
            this.transpose(
              board)))))
  }

  private move(board: number[][]): number[][] {//MOOVES NUMBERS IN EACH ROW FROM LEFT TO RIGHT
    const nextBoard: number[][] = [];

    board.forEach((row: number[]) => {
      const noZeros: number[] = row.filter(e => e !== 0);
      const collapsed: number[] = this.collapseRow(noZeros);
      const zeros: number[] = Array(row.length - collapsed.length).fill(0);
      const newRow: number[] = zeros.concat(collapsed);
      nextBoard.push(newRow);
    });

    return nextBoard;
  }

  private collapseRow(row: number[]): number[] {//COLLAPSE A ROW ADDING EQUAL NEIGHBORS
    const nextRow: number[] = [];
    row.forEach((e, i, arr) => {
      if (arr[i] === 0) return
      if (arr[i] !== arr[i + 1]) {
        nextRow.push(arr[i]);
        return
      }
      nextRow.push(arr[i] * 2)
      arr[i + 1] = 0
    });
    return nextRow
  }

  private reverse(board: number[][]): number[][] {//REVERSE THE MATRIX
    const reversed: number[][] = board;

    reversed.forEach((row) => {
      row.reverse()
    });
    return reversed;
  }

  private transpose(board: number[][]): number[][] {//TRANSPOSE THE MATRIX 
    let transposed: number[][] = board;

    for (let row = 0; row < transposed.length; row++) {
      for (let col = 0; col < row; col++) {
        let tmp = transposed[row][col];
        transposed[row][col] = transposed[col][row]
        transposed[col][row] = tmp
      }
    }
    return transposed
  }
}
