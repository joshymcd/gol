import { Component, Inject, inject } from '@angular/core';
import { GameBoardComponent } from '../game-board/game-board.component';
import { GameBoardState, GameManagerService } from '../game-manager.service';

@Component({
  selector: 'app-game-manager',
  standalone: true,
  imports: [GameBoardComponent],
  template: `<section
    class=" flex-1 lg:flex  flex-col items-center justify-center relative"
  >
    <section class="flex flex-row gap-2 p-2 items-center justify-center">
      <h3>Turn {{ turn }}</h3>
      <button class="border rounded-md px-2 py-1" (click)="nextTurn()">Step</button>
      <button class="border rounded-md px-2 py-1" (click)="intervalId ? stop() :start()">Auto {{intervalId ? "Stop" : "Start"}}</button> 
    </section>
    <app-game-board
      class=" w-100 h-100 aspect-square flex-1  lg:flex  flex-col relative "
      [gameBoardState]="currentGameState"
    />
  </section>`,
})
export class GameManagerComponent {
  intervalId?: number;
  gameManagerService: GameManagerService = inject(GameManagerService);
  currentGameState: GameBoardState;
  turn = 0;
  size = 20;
 

  constructor() {
    this.currentGameState = this.gameManagerService.createNewGame(this.size, true);
 
  }

  nextTurn() {
    this.turn++;
    this.currentGameState = this.gameManagerService.getNextState();
  }

  start() {
    console.log(this);
    this.intervalId = setInterval(this.nextTurn.bind(this), 1000) ;
  }

  stop() {
    clearInterval(this.intervalId);
    this.intervalId = undefined;
  }
}
