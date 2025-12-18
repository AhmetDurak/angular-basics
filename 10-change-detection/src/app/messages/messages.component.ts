import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { MessagesListComponent } from './messages-list/messages-list.component';
import { NewMessageComponent } from './new-message/new-message.component';

@Component({
  selector: 'app-messages',
  standalone: true,
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css',
  imports: [MessagesListComponent, NewMessageComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessagesComponent {
  messages = signal<string[]>([]);

  get debugOutput() {
    console.log('[Messages] "debugOutput" binding re-evaluated.');
    return 'Messages Component Debug Output';
  }

  // onAddMessage(message: string) {
  //   this.messages.update((oldMessages) => [...oldMessages, message]);
  // }
}


//NOTE: Using ChangeDetectionStrategy.OnPush to optimize change detection for this component.
// This strategy tells Angular to check the component only when its inputs change or when an event is triggered within the component.
// This can improve performance by reducing unnecessary checks, especially in components with complex templates or large data sets.
// However, be cautious when using OnPush, as it may lead to situations where the UI does not update as expected if changes occur outside of Angular's change detection mechanisms.
// In such cases, you may need to manually trigger change detection using ChangeDetectorRef or other methods.