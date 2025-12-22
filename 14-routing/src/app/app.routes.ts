import { CanMatchFn, RedirectCommand, Router, Routes } from "@angular/router";
import { NoTaskComponent } from "./tasks/no-task/no-task.component";
import { resolveTitle, resolveUserName, UserTasksComponent } from "./users/user-tasks/user-tasks.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { userRoutes } from "./users/users.routes";
import { inject } from "@angular/core";

const dummyCanMatch: CanMatchFn = (route, segment) => {
    return Math.random() < 1
        ? true
        //NOTE: instead of just returning false, we can redirect the router
        : new RedirectCommand(inject(Router).parseUrl('/unauthorized'))
}

export const routes: Routes = [
    {
        title: 'No Task Selected',
        path: '',
        component: NoTaskComponent
    },
    {   
        title: resolveTitle,
        path: 'users/:userId', // app-domain/tasks/:userId
        component: UserTasksComponent,
        // children: userRoutes,
        //NOTE: loadComponent/loadChildren make the code bundle small, and fetch the data when it's only needed
        loadChildren: () => import('./users/users.routes').then(mod => mod.userRoutes),
        //NOTE: we can pass any static data using data property
        data: {
            message: 'Hello World!'
        },
        //NOTE: It guards the router, whether user have access to the navigated address
        canMatch: [dummyCanMatch],
        runGuardsAndResolvers: "always",
        //NOTE: we can pass also dynamic data using resolve
        resolve:{
            //NOTE: we define method here only, not execute it!
            userName: resolveUserName
        }
    },
    {
        path: '**',
        component: NotFoundComponent
    }
]