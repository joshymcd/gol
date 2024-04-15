import { Injectable } from '@angular/core'; 
import { throwError } from 'rxjs';

export type GameBoardState = boolean[][];

@Injectable({
  providedIn: 'root',
})
export class GameManagerService {
  protected gameBoardState: GameBoardState;

  constructor() {
    this.gameBoardState = Array.from({ length: 0 }, () => Array.from({ length: 0 }, () =>  false)) 
  }

  createNewGame(size: number, random: boolean): GameBoardState {
    this.gameBoardState = Array.from({ length: size }, () =>
      Array.from({ length: size }, () => (random ? Math.random() > 0.9 : false))
    ); 
    return this.gameBoardState;
  }

  setGameState(newState: GameBoardState): GameBoardState {
    this.gameBoardState = newState;
    return this.gameBoardState;
  }

  getNextState(): GameBoardState {  
    if(this.gameBoardState.length < 1 ){
      throw new Error(`No Game inititated`);
    }
    const nextState:GameBoardState = Array.from({ length: this.gameBoardState.length }, () =>
      Array.from({ length: this.gameBoardState?.length! }, () => false)
    );
    for (let i = 0; i < this.gameBoardState.length; i++) {
      for (let j = 0; j < this.gameBoardState[i].length; j++) {
        const neighbors = [
          this.gameBoardState[i - 1]?.[j - 1],
          this.gameBoardState[i - 1]?.[j],
          this.gameBoardState[i - 1]?.[j + 1],
          this.gameBoardState[i]?.[j - 1],
          this.gameBoardState[i]?.[j + 1],
          this.gameBoardState[i + 1]?.[j - 1],
          this.gameBoardState[i + 1]?.[j],
          this.gameBoardState[i + 1]?.[j + 1],
        ].filter((x) => x).length;
        if (this.gameBoardState[i][j]) {
          nextState[i][j] = neighbors === 2 || neighbors === 3;
        } else {
          nextState[i][j] = neighbors === 3;
        }
      }
    }
    this.gameBoardState = nextState;
    return this.gameBoardState;
  }
}
