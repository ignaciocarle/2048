import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  boardSize: number = 16;
  board!: Number[];
  goal: number = 2048;

  constructor() { }

  ngOnInit(): void {
    this.newgame()
  }

  newgame() {
    this.board = [
      2, 2, 0, 0,
      0, 0, 0, 0,
      0, 0, 2, 4,
      0, 4, 2, 2
    ]
  }

  moveDown() {
    const newBoard = this.board.map(
      (e, i, board) => {
        if (board[i + 4] !== e) return e;
        return board[i - 4]
      }
    )
    this.board = newBoard
  }


}
