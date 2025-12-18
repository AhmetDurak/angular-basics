import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';

bootstrapApplication(AppComponent, {
    providers: [] //NOTE: provideExperimentalZonelessChangeDetection() can be added here to enable zoneless change detection
}).catch((err) => console.error(err));
