import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  boardSize: number = 4;
  board: number[] = Array(this.boardSize * this.boardSize).fill(0);
  goal: number = 2048;
  score: number = 0;

  constructor() { }

  ngOnInit(): void {
    this.newgame(this.boardSize)
  }

  newgame(size: number) {
    this.board = [];

    const testBoard = [
      2, 0, 0, 2,
      0, 2, 2, 4,
      0, 0, 2, 2,
      0, 2, 4, 2
    ]
    testBoard.forEach(e => {
      this.board.push(e)
    });

  }

  //mover tiene que crear arrays de cada fila y operar cada uno por separado, luego acomodarlos de vuelta como el array orifginal


  moveRight() {//arma las filas de izquierda a derecha
    let newBoard: number[] = []
    const lines: number[][] = []


    this.board.forEach((e, i, a) => {
      if (i % 4 === 0) {//por cada linea tiene que armarla, filtrarla, sumarla, llenarla y ponerla de vuelta en el array
        let line = [a[i], a[i + 1], a[i + 2], a[i + 3]];
        console.log(line);
        const filtered: number[] = line.filter(e => e);
        const missing = this.boardSize - filtered.length
        const zeros = Array(missing).fill(0)
        const newLine = zeros.concat(filtered)
        newBoard = newBoard.concat(newLine)
      }
    });
    this.board = newBoard
  }


}
