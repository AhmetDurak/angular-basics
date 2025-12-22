import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { of } from 'rxjs';

//NOTE: Here, we can define our custom validation method depending on our needs.
function mustContainQuestionMark(control: AbstractControl) {
  if (!control.value.includes('?')) {
    return null
  }
  return { containQuestionMark: true }
}

//NOTE: Here, we can also define a async mehtod('of' returns an observable obj)
//NOTE: Useful, if want to do validation through api calls while form get filled.
function isUnique(control: AbstractControl) {
  return control.value === 'test@example.com' // already exist
    ? of({ notUnique: true })
    : of(null)
}

@Component({
  selector: 'app-login-reactive',
  standalone: true,
  imports: [ReactiveFormsModule], //Instead FormModule -> Template-Driven Form
  templateUrl: './login-reactive.component.html',
  styleUrl: './login-reactive.component.css'
})
export class LoginReactiveComponent {
  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.email, Validators.required],
      asyncValidators: [isUnique]
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6), mustContainQuestionMark]
    })
  })

  get emailIsValid(){
    return (
        this.form.controls.email.touched && 
        this.form.controls.email.dirty &&
        this.form.controls.email.invalid
      )
  }

  get passwordIsValid(){
    return (
        this.form.controls.password.touched && 
        this.form.controls.password.dirty &&
        this.form.controls.password.invalid
      )
  }


  onSubmit(){
    console.log(this.form)
    console.log(this.form.value.email, this.form.value.password)
  }
}
