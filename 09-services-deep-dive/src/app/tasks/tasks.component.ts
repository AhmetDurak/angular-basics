import { Component } from '@angular/core';

import { NewTaskComponent } from './new-task/new-task.component';
import { TasksListComponent } from './tasks-list/tasks-list.component';
import { TasksService } from './tasks-list/tasks.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  imports: [NewTaskComponent, TasksListComponent],
  // providers: [TasksService],
})
export class TasksComponent {}


// The TasksService is provided at the component level here,
// meaning each instance of TasksComponent gets its own instance of TasksService.
// This is useful for encapsulating task management within this component and its children.