import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { TasksService } from './app/tasks/tasks-list/tasks.service';
import { InjectionToken } from '@angular/core';
import { provideLumberjack } from '@ngworker/lumberjack';
import { provideLumberjackConsoleDriver } from '@ngworker/lumberjack/console-driver';

bootstrapApplication(AppComponent,
//     {
//         providers: [TasksService]
//     }
        {
            providers: [
                provideLumberjack({
                // levels: ['debug'],
                }),
                provideLumberjackConsoleDriver()
            ]
        }
).catch((err) => console.error(err));


// If you want to provide the service at the application level without using 'providedIn: root',
// you can uncomment the providers array above.


//NOTE: Costom Injection Tokens can also be provided here at the application level.

// export const TasksServiceToken = new InjectionToken<TasksService>('TasksService');
// bootstrapApplication(AppComponent,
//     {
//         providers: [{provide: TasksServiceToken, useClass: TasksService}]
//     }
// ).catch((err) => console.error(err));