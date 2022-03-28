import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  board!: number[][];
  previousBoard!: number[][];
  boardSize!: number;
  goal!: number;
  max!: number;
  score!: number;

  constructor() { }

  ngOnInit(): void {
    this.newgame()
  }


  ////INITIAL SETTINGS
  private newgame(): void {
    this.boardSize = 4;
    this.goal = 2048;
    this.max = 0
    this.score = 0;
    this.board = Array.from({ length: this.boardSize }, () => Array.from({ length: this.boardSize }, () => 0))
    this.previousBoard = this.board
    this.addTile()
    this.addTile()
/*    const testBoard = [
      [0, 0, 0, 2],
      [0, 2, 4, 2],
      [0, 2, 2, 2],
      [0, 2, 0, 0]
    ]
    this.board = testBoard;
*/
/*    const orientationBoard = [
      [0, 1, 2, 3],
      [4, 5, 6, 7],
      [8, 9, 10, 11],
      [12, 13, 14, 15]
    ]
    this.board = orientationBoard;
*/  }

  private addTile(): void {
    const nextBoard = this.board;
    const row = Math.floor(Math.random() * this.boardSize);
    const col = Math.floor(Math.random() * this.boardSize);

    if (nextBoard[col][row] === 0) {
      nextBoard[col][row] = 2
    } else { this.addTile() }
    this.board = nextBoard
  }

  ////USER ACTIONS



  public userMove(dir: string) {
    this.previousBoard = this.board

    switch (dir) {
      case "r":
        this.moveRight()
        break;
      case "l":
        this.moveLeft()
        break;
      case "d":
        this.moveDown()
        break;
      case "u":
        this.moveUp()
        break;
      default:
        console.log("wrong entry");
        break;
    }
    if (this.previousBoard === this.board) return
    this.addTile()
  }

  private moveRight(): void {
    this.board =
      this.move(
        this.board)
  }

  private moveLeft(): void {
    this.board =
      this.reverse(
        this.move(
          this.reverse(
            this.board)))
  }

  private moveDown(): void {
    this.board =
      this.transpose(
        this.move(
          this.transpose(
            this.board)))
  }

  private moveUp(): void {
    this.board =
      this.transpose(
        this.reverse(
          this.move(
            this.reverse(
              this.transpose(
                this.board)))))
  }

  private move(board: number[][]): number[][] {
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

  private collapseRow(row: number[]): number[] {
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

  private reverse(board: number[][]): number[][] {
    const reversed: number[][] = board;

    reversed.forEach((row) => {
      row.reverse()
    });
    return reversed;
  }

  private transpose(board: number[][]): number[][] {
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




  /////////////////////////////////////TESTING///////////////////
  public reset(): void {
    this.newgame()
  }

  public testAddTile(): void {
    this.addTile()
  }


}
