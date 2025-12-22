import { Component, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { TasksService } from '../tasks.service';
import { CanDeactivateFn, Router, RouterLink } from "@angular/router";

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent {
  userId = input.required<string>();
  enteredTitle = signal('');
  enteredSummary = signal('');
  enteredDate = signal('');
  submitted = false
  private tasksService = inject(TasksService);
  private router = inject(Router)

  onSubmit() {
    this.tasksService.addTask(
      {
        title: this.enteredTitle(),
        summary: this.enteredSummary(),
        date: this.enteredDate(),
      },
      this.userId()
    );
    this.submitted = true

    this.router.navigate(['users', this.userId(), 'tasks'],{
      replaceUrl: true //NOTE: User can not use the back button to go back
    })
  }
}

//NOTE: Good to ask user before leaving form. If user submit form, then don' ask
export const canLeaveEdit: CanDeactivateFn<NewTaskComponent> = (component) => {
  return (component.enteredTitle() || component.enteredSummary() || component.enteredDate()) && !component.submitted
    ? window.confirm('Do you really want to leave? You\'ll lose the entered data.')
    : true
}