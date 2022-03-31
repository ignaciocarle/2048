import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  private board!: number[][];
  private previousBoard!: number[][];
  private boardSize!: number;
  private goal!: number;
  private max!: number;
  private score!: number;

  constructor() { }

  ngOnInit(): void {
    this.newgame()
  }

  /////////////////////////////////////////////////////////////////DRAW METHODS


  public get getBoard(): number[][] {
    return this.board
  }


  public get getScore(): number {
    return this.score
  }


  /////////////////////////////////////////////////////////////INITIAL SETTINGS
  private newgame(): void {
    this.boardSize = 4;
    this.goal = 2048;
    this.max = 0
    this.score = 0;
    this.board = Array.from(
      { length: this.boardSize }, () => Array.from(
        { length: this.boardSize }, () => 0))
    this.addTile()
    this.addTile()
    this.previousBoard = this.board.map(x => x)
    console.log(`Juego iniciado`);
  }



  /////////////////////////////////////////////////////////////////USER ACTIONS

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
  }

  public reset(): void {
    this.newgame()
  }


  /////////////////////////////////////////////////////TURN LOGIC
  private hasLost(): boolean {//recorrer el array para ver si hay movimientos posibles
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

    this.previousBoard = this.board

    switch (dir) {
      case "r":
        this.board = this.moveRight()
        break;
      case "l":
        this.board = this.moveLeft()
        break;
      case "d":
        this.board = this.moveDown()
        break;
      case "u":
        this.board = this.moveUp()
        break;
      default:
        console.log("wrong entry");
        break;
    }

    if (this.previousBoard === this.board) return

    this.addTile()
  }

  ///////////////////////////////////////////////////////////////BOARD HANDLING

  private addTile(): void {
    const nextBoard = this.board;
    const num = Math.random() > 0.9 ? 4 : 2;
    const row = Math.floor(Math.random() * this.boardSize);
    const col = Math.floor(Math.random() * this.boardSize);

    if (nextBoard[col][row] === 0) {
      nextBoard[col][row] = num
    } else { this.addTile() }
    this.board = nextBoard
  }

  private moveRight(): number[][] {
    return this.move(
      this.board)
  }

  private moveLeft(): number[][] {
    return this.reverse(
      this.move(
        this.reverse(
          this.board)))
  }

  private moveDown(): number[][] {
    return this.transpose(
      this.move(
        this.transpose(
          this.board)))
  }

  private moveUp(): number[][] {
    return this.transpose(
      this.reverse(
        this.move(
          this.reverse(
            this.transpose(
              this.board)))))
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



  //////////////////////////////////////////////////////////////////////TESTING


  public testAddTile(): void {
    this.addTile()
  }


}
