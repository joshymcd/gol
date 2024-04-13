import { Component, Input } from '@angular/core';
import { GameBoard } from '../game-board';
import { CommonModule, NgClass } from '@angular/common';

@Component({
  selector: 'app-game-board',
  standalone: true,
  imports: [CommonModule, NgClass],
  template: `
    <p>Game Board Size {{ gameBoard.state.length }}</p>
    <div
      style="
        display: grid; 
        grid-template-columns: repeat({{
        gameBoard.state.length
      }}, minmax(0, 1fr));
      "
      class=" border w-full gap-1 "
    >
      <div *ngFor="let row of gameBoard.state">
        <div
          *ngFor="let cell of row"
          class="aspect-square"
          [ngClass]="cell ? 'bg-black' : 'bg-white'"
        >
          &nbsp;
        </div>
      </div>
    </div>
  `,
  styleUrl: './game-board.component.css',
})
export class GameBoardComponent {
  @Input() gameBoard!: GameBoard;
}
