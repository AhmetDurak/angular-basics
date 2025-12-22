import { Component } from '@angular/core';

// import { LoginComponent_Template } from './auth/login_template/login_template.component';
// import { LoginReactiveComponent } from './auth/login-reactive/login-reactive.component';
import { SignupComponent } from "./auth/signup/signup.component";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [SignupComponent],
})
export class AppComponent {}
