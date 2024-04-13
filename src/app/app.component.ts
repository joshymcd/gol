import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GameManagerComponent } from './game-manager/game-manager.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, GameManagerComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'gol';
  test = 'balls';
}
