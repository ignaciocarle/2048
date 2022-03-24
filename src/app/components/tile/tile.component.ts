import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tile',
  template: `
    <h2>{{value}}</h2>
  `,
  styles: [
    `h2 {
      border: dotted 2px lightgreen
    }`
  ]
})
export class TileComponent {

  @Input() value: number = 2;

}
