import { Component, computed, DestroyRef, inject, Input, input, OnInit, signal } from '@angular/core';

import { TaskComponent } from './task/task.component';
import { TasksService } from './tasks.service';
import { ResolveFn, RouterLink } from "@angular/router";
import { Task } from './task/task.model';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent, RouterLink]
})
export class TasksComponent {
  // userId = input.required<string>()
  order = signal<'asc' | 'desc'>('desc')
  userTasks = input.required<Task[]>()

  // private tasksService = inject(TasksService)
  // private activatedRoute = inject(ActivatedRoute)
  // private destroyRef = inject(DestroyRef)

  // userTasks = computed(() => this.tasksService
  //   .allTasks()
  //   .filter(task => task.userId === this.userId())
  //   .sort((a,b) => 
  //     this.order() === 'asc' 
  //       ? a.id > b.id ? -1 : 1 
  //       : a.id > b.id ? 1 : -1)
  // )

  // ngOnInit(): void {
  //   //NOTE: Using activatedRoute we can also trigger queryParam
  //   const queryParamSubs = this.activatedRoute.queryParams.subscribe({
  //     next: param => this.order.set(param['order'])
  //   })
  //   this.destroyRef.onDestroy(() => queryParamSubs.unsubscribe())
  // }
}

//NOTE: Using Routing-based keeps the coponent very clean, because all unrelated logic is out to component class
export const resolveUserTasks: ResolveFn<Task[]> = (activatedRouteSnapshot, routerState) => {
  const order = activatedRouteSnapshot.queryParams['order']
  const tasksService = inject(TasksService)
  return tasksService
    .allTasks()
    .filter(task => task.userId == activatedRouteSnapshot.paramMap.get('userId'))
    .sort((a,b) => 
      order === 'asc' 
        ? a.id > b.id ? -1 : 1 
        : a.id > b.id ? 1 : -1)
}
