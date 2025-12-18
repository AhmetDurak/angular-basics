import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-info-message',
  standalone: true,
  imports: [],
  templateUrl: './info-message.component.html',
  styleUrl: './info-message.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InfoMessageComponent {
  get debugOutput() {
    console.log('[InfoMessages] "debugOutput" binding re-evaluated.');
    return 'InfoMessage Component Debug Output';
    // return Math.random() // in this case, it would re-evaluate on every change detection cycle, causing error
  }

  onLog() {
    console.log('Clicked!');
  }
}


//NOTE: Avoid using non-pure functions or expressions that yield different results on each call (like Math.random() or Date.now()) in template bindings, as this can lead to excessive change detection cycles and performance issues.
//NOTE: Avoid using long and complex functions in template bindings, as they can slow down change detection and may cause error.
// Instead, use pipes, because it caches the result based on input values, improving performance and reducing unnecessary re-evaluations.
