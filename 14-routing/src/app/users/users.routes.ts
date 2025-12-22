import { Routes } from "@angular/router";
import { resolveUserTasks, TasksComponent } from "../tasks/tasks.component";
import { canLeaveEdit, NewTaskComponent } from "../tasks/new-task/new-task.component";
import { TasksService } from "../tasks/tasks.service";

export const userRoutes: Routes = [
    {
        path: '',
        providers: [TasksService],
        children: [
            {
                path: '',
                redirectTo: 'tasks',
                //NOTE: prefix: uses the path and parent's path as prefix/as pattern to check if there is a match in url
                //NOTE: full: looks for the full path match to trigger redirectTo
                pathMatch: "prefix"
            },
            {
                path: 'tasks', // app-domain/tasks/:userId/tasks
                component: TasksComponent,
                runGuardsAndResolvers: 'always',
                resolve: {
                    userTasks: resolveUserTasks
                }
            },
            {
                path: 'tasks/new',
                component: NewTaskComponent,
                //NOTE: It is useful to check/notify whether user may lose data, which may require
                canDeactivate: [canLeaveEdit]
            }
        ]
    }
]