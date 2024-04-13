import { Component, Input } from '@angular/core';
import { GameBoard } from '../game-board';
import { CommonModule, NgClass } from '@angular/common';

@Component({
  selector: 'app-game-board',
  standalone: true,
  imports: [CommonModule, NgClass],
  template: `
    <div class="border   aspect-square rounded-lg overflow-hidden">
      <div
        style=" 
        grid-template-columns: repeat({{
          gameBoard.state.length
        }}, minmax(0, 1fr));
      grid-template-rows: repeat(gameBoard.state.length, minmax(0, 1fr));
      "
        class="grid h-full  bg-gray-800 "
      >
        <div *ngFor="let row of gameBoard.state">
          <div
            *ngFor="let cell of row"
            class=" aspect-square "
            [ngClass]="cell ? 'bg-black border border-white' : 'bg-white'"
          >
            &nbsp;
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrl: './game-board.component.css',
})
export class GameBoardComponent {
  @Input() gameBoard!: GameBoard;
}
