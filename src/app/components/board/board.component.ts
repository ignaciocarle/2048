import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  boardSize: number = 4;
  board!: number[][];
  previousBoard!: number[][];
  goal: number = 2048;
  score: number = 0;

  constructor() { }

  ngOnInit(): void {
    this.newgame(this.boardSize)
  }

  newgame(size: number) {
    const newBoard: number[][] = Array(this.boardSize).fill(Array(this.boardSize).fill(0));

    const testBoard = [
      [2, 0, 0, 2],
      [0, 2, 4, 2],
      [0, 2, 2, 2],
      [0, 2, 0, 0]
    ]
    this.board = testBoard;


    /*testBoard.forEach(e => {
      this.board.push(e)
    });*/

  }

  //mover tiene que crear arrays de cada fila y operar cada uno por separado, luego acomodarlos de vuelta como el array orifginal

  collapseRow(row: number[]): number[] {
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

  move(board: number[][]): number[][] {
    const nextBoard: number[][] = [];
    this.previousBoard = this.board;

    board.forEach((row: number[]) => {
      const noZeros: number[] = row.filter(e => e !== 0);
      const collapsed: number[] = this.collapseRow(noZeros);
      const zeros: number[] = Array(row.length - collapsed.length).fill(0);
      const newRow: number[] = zeros.concat(collapsed);
      nextBoard.push(newRow);
    });

    return nextBoard;
  }

  reverse(board: number[][]): number[][] {
    const reversed: number[][] = board;
    reversed.forEach((row) => {
      row.reverse()
    });
    return reversed;
  }

  transpose(board: number[][]): number[][] {
    let transposed: number[][] = Array(this.boardSize).fill(Array(this.boardSize).fill(0));
    board.forEach((row, x) => {
      row.forEach((e, y) => {
        transposed[y][x] = e;
      });
    });


    console.log(transposed);
    this.board = transposed
    return transposed
  }

  testTranspose() {
    this.transpose(this.board)
  }

  moveRight() {
    this.board = this.move(this.board)
  }

  moveLeft() {
    this.board = this.reverse(
      this.move(
        this.reverse(
          this.board)))
  }

  moveDown() {
    this.board = this.transpose(
      this.move(
        this.transpose(
          this.board)))
  }

  moveUp() {
    this.board = this.transpose(this.move(this.transpose(this.board)))
  }



}
