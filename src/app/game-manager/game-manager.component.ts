import { Component } from '@angular/core';
import { GameBoardComponent } from '../game-board/game-board.component';

@Component({
  selector: 'app-game-manager',
  standalone: true,
  imports: [GameBoardComponent],
  template: `<section class="  w-full h-full ">
    <h3>Turn {{ turn }}</h3>
    <app-game-board [gameBoard]="{ state: state }" />
  </section>`,
})
export class GameManagerComponent {
  turn = 0;
  size = 20;
  state = Array.from({ length: this.size }, () =>
    Array.from({ length: this.size }, () => false)
  );

  constructor() {
    // this.size = 12;
    this.state = Array.from({ length: this.size }, () =>
      Array.from({ length: this.size }, () => Math.random() > 0.9)
    );
    setInterval(() => {
      // this.size++;
      // this.state = Array.from({ length: this.size }, () =>
      //   Array.from({ length: this.size }, () => Math.random() > 0.9)
      // );
      this.turn++;
      this.state = calcNextState(this.state);
    }, 1000);
  }
}

const calcNextState = (state: boolean[][]): boolean[][] => {
  const nextState = Array.from({ length: state.length }, () =>
    Array.from({ length: state[0].length }, () => false)
  );
  for (let i = 0; i < state.length; i++) {
    for (let j = 0; j < state[i].length; j++) {
      const neighbors = [
        state[i - 1]?.[j - 1],
        state[i - 1]?.[j],
        state[i - 1]?.[j + 1],
        state[i]?.[j - 1],
        state[i]?.[j + 1],
        state[i + 1]?.[j - 1],
        state[i + 1]?.[j],
        state[i + 1]?.[j + 1],
      ].filter((x) => x).length;
      if (state[i][j]) {
        nextState[i][j] = neighbors === 2 || neighbors === 3;
      } else {
        nextState[i][j] = neighbors === 3;
      }
    }
  }
  return nextState;
};
