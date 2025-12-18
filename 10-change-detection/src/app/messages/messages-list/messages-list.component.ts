import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { MessagesService } from '../messages.service';
import { AsyncPipe } from '@angular/common';

//NOTE: If there is no input, signal, event, or any other reactive data source used in the component,
// the component will not re-evaluate its bindings or trigger change detection,
// even if ChangeDetectionStrategy.OnPush is applied.
// In such cases, the component behaves like a static component, rendering its template only once during initialization.
// To make the component reactive, ensure that it uses at least one of these mechanisms to trigger updates.
//NOTE: Or we can use ChangeDetectorRef to manually trigger change detection when needed.
// And BehviorSubject in the service to provide a stream of messages that the component can subscribe to and update its view accordingly.

//NOTE: Using AsyncPipe in the template to automatically subscribe to the messages$ observable
// and trigger change detection when new messages are emitted.

//NOTE: Zoneless is available from Angular 18+. input, output, signal, event binding will trigger change detection.
// Zoneless is default in Angular 21+. Remove Zone.js from angular.json not to use Zone.js and add provider at main.ts

@Component({
  selector: 'app-messages-list',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './messages-list.component.html',
  styleUrl: './messages-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessagesListComponent {
  private messagesService = inject(MessagesService);
  messages$ = this.messagesService.messages$; // is required to activate async pipe in the template

  
  //NOTE: Following code block is an alternative to signal for triggering change detection in OnPush components without inputs.
  // private cdRef = inject(ChangeDetectorRef);
  // private destroyRef = inject(DestroyRef);

  // messages : string[] = [];

  /*
  ngOnInit()  {
    this.destroyRef.onDestroy(() => { // Clean up subscriptions on destroy of the component
      this.messagesService.messages$.subscribe((messages) => { // Subscribe to the messages stream
      this.messages = messages;
      this.cdRef.markForCheck(); // Notify Angular to check for changes
    }).unsubscribe(); // Unsubscribe on destroy to prevent memory leaks
    })
  }
  */

  get debugOutput() {
    console.log('[MessagesList] "debugOutput" binding re-evaluated.');
    return 'MessagesList Component Debug Output';
  }
}