import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { debounceTime } from 'rxjs';

function getStoredEmail() {
  const localData = window.localStorage.getItem('local-data-email')
  return localData ? JSON.parse(localData).email : ''
}

//NOTE: if you pass control: AbstractControl as parameter, you don't have to call method
//Angular call the method by itself
//NOTE: But for common usage of the method, it is better to define following structure, then it can be called for any validation
function equalValues(controlName1: string, controlName2: string) {
  return (control: AbstractControl) => {
    const value = control.get(controlName1)?.value === control.get(controlName2)?.value
    ? null
    : { passwordsNotEqual: true }
    console.log(`equalValues: ${value} => ${control.get(controlName1)?.value} : ${control.get(controlName2)?.value}`)  
    return value
  }
}

@Component({
  selector: 'app-signup',
  standalone: true,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
  imports: [ReactiveFormsModule],
})
export class SignupComponent implements OnInit {
  private destroyRef = inject(DestroyRef)
  form = new FormGroup({
    email: new FormControl(getStoredEmail(), { validators: [Validators.email, Validators.required] }),
    //NOTE: we can group the form control with FormGroup like the form obj.
    passwords: new FormGroup({
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('',[Validators.required, Validators.minLength(6)]),
    }, { validators: [equalValues('password', 'confirmPassword')] }),
    firstName: new FormControl('', { validators: [Validators.required] }),
    lastName: new FormControl('', { validators: [Validators.required] }),
    address: new FormGroup({
      street: new FormControl('', { validators: [Validators.required] }),
      number: new FormControl('', { validators: [Validators.required] }),
      postalCode: new FormControl('', { validators: [Validators.required] }),
      city: new FormControl('', { validators: [Validators.required] }),
    }),
    role: new FormControl<'student' | 'teacher' | 'employee' | 'founder' | 'other'>('student'),
    //NOTE: It makes sense to use FormArray, when we need to group checkboxes
    source: new FormArray([
      //NOTE: No name need to be specified
      new FormControl(false),
      new FormControl(false),
      new FormControl(false),
      new FormControl(false),
    ]),
    agree: new FormControl(false, { validators: [Validators.requiredTrue] }),
  })

  ngOnInit(): void {
    //NOTE: It is important to track the live value changes in form
    const valueSubs = this.form.valueChanges.pipe(debounceTime(300)).subscribe({
      next: value => window.localStorage.setItem('local-data-email', JSON.stringify({ email: value.email }))
    })
    this.destroyRef.onDestroy(() => valueSubs.unsubscribe())
  }


  onSubmit() {
    if (this.form.invalid) {
      console.log('INVALID FORM')
      return
    }
  }
  onReset() {
    this.form.reset()
  }

  checkController(controller: FormControl) {
    console.log(`checkController: ${controller.touched} ${controller.dirty} ${controller.invalid}`)
    return (controller.touched && controller.dirty && controller.invalid)
  }
}
