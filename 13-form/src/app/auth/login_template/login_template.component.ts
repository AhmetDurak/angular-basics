import { afterNextRender, Component, DestroyRef, inject, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login_template.component.html',
  styleUrl: './login_template.component.css',
})
export class LoginComponent_Template {
  private form = viewChild.required<NgForm>('myform') // NOTE: var name in the form element
  private destroyRef = inject(DestroyRef)
  private SAVED_LOGIN_FORM = 'saved-login-form'

  constructor() {
    afterNextRender(()=> {
      const savedForm = window.localStorage.getItem(this.SAVED_LOGIN_FORM)
      if(savedForm){
        const loadedFormData = JSON.parse(savedForm)
        const savedEmail = loadedFormData.email
        setTimeout(() => {
          //NOTE: because form is not render fully yet, we need to set a timeout as workaround
          this.form().controls['email'].setValue(savedEmail)
        },1)
      }

      //NOTE: debounceTime emits the value if there is no new emit for 500 ms
      const subs = this.form().valueChanges?.pipe(debounceTime(500)).subscribe({
        next: (value) => window.localStorage.setItem(this.SAVED_LOGIN_FORM, JSON.stringify({email: value.email}))
      })
      this.destroyRef.onDestroy(() => subs?.unsubscribe())
    })
  }

  onSubmit(formData: NgForm) {
    console.log(formData)
    const email = formData.form.value.email
    const password = formData.form.value.password

    console.log(email, password)

    formData.form.reset()
  }
}
