import { Component, OnInit, OnChanges } from '@angular/core';
import { MatchService } from 'src/app/services/match.service';


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit, OnChanges {

  constructor(public match: MatchService) { }

  ngOnInit(): void {
    this.match.reset()
  }

  ngOnChanges(): void {
  }


}
