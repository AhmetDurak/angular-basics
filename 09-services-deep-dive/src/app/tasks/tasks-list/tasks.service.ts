import { inject, Injectable, signal } from "@angular/core";
import { Task, TaskStatus } from "../task.model";
import { LoggerService } from "../../logger.service";

@Injectable({
    providedIn: 'root',
})
export class TasksService {
    private tasks = signal<Task[]>([]);
    private logger = inject(LoggerService)

    allTasks = this.tasks.asReadonly();

    addTask(taskData: { title: string; description: string }) {
        const newTask: Task = {
            ...taskData,
            id: Math.random().toString(),
            status: 'OPEN'
        }
        this.tasks.update(oldTasks => [...oldTasks, newTask])
        // this.loggingService.log(`Task added: ${taskData.title}`)
        this.logger.critical('Task added: ', taskData.title, 'TasksService');
    }

    updateTasksStatus(taskId: string, newStatus: TaskStatus) {
        this.tasks.update(tasks => tasks.map((task) => task.id === taskId ? {...task, status: newStatus } : task));
        // this.loggingService.log(`Change status to ${newStatus}`)
        this.logger.warn('Task status updated: ', {newStatus}, 'TasksService');
    }

}


//NOTE: If LoggingService was an element-level provider (defined as provider in a component), TasksService can not inject it here.
// Because services are not part of the DOM.