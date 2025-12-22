import { provideZoneChangeDetection } from "@angular/core";
import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { provideRouter, withComponentInputBinding, withRouterConfig } from '@angular/router';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
    providers: [
        provideZoneChangeDetection(),provideRouter(
            routes, //NOTE: obj where the routes are defined
            withComponentInputBinding(), //NOTE: with this method, we can pass args from router obj to components
            withRouterConfig({paramsInheritanceStrategy: 'always'})), //NOTE: Args will be passed to all child Components
    ]
}).catch((err) => console.error(err));
