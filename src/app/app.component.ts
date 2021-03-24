import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loginForm: FormGroup;
  phoneNumber="^(\+\d{1,3}[- ]?)?\d{10}$"

  error_messages = {
    'fname': [
      { type: 'required', message: 'First Name is required.' },
      { type: 'minlength', message: 'First Name length should be minimum 3.' },
      { type: 'maxlength', message: 'First Name length should not exceed 16' }
    ],

    'lname': [
      { type: 'required', message: 'Last Name is required.' },
      { type: 'minlength', message: 'Last Name length should be minimum 3.' },
      { type: 'maxlength', message: 'Last Name length should not exceed 16' }
    ],

    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'required', message: 'please enter a valid email address.' }
    ],

    'contact': [
      { type: 'required', message: 'Contact is required.' },
      { type: 'pattern', message: 'It is not a valid mobile number(0-10 Numbers, Start with 9, 8, 7).' },
    ],
    

    'password': [
      { type: 'required', message: 'password is required.' },
    ],
    'confirmpassword': [
      { type: 'required', message: 'password is required.' },
      
    ],
  }
 
  constructor(
    public formBuilder: FormBuilder
  ) {
    this.loginForm = this.formBuilder.group({
      fname: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(16)
      ])),
      lname: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(16)
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      contact: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('[7-9]\\d{9}'),
        Validators.minLength(10),
        Validators.maxLength(10)
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      confirmpassword: new FormControl('', Validators.compose([
        Validators.required,
      ])),
    }, { 
      validators: this.password.bind(this)
    });
  }

  ngOnInit() {
  }

  password(formGroup: FormGroup) {
    const { value: password } = formGroup.get('password');
    const { value: confirmPassword } = formGroup.get('confirmpassword');
    return password === confirmPassword ? null : { passwordNotMatch: true };
  }


  numberValidation(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
        event.preventDefault();

    }
}

  onSubmit(){
      let body={
        "firstName":this.loginForm.value['fname'],
        "lastName":this.loginForm.value['lname'],
        "email":this.loginForm.value['email'],
        "contact":this.loginForm.value['contact'],
        "password":this.loginForm.value['password'],
        "confpassword":this.loginForm.value['confirmpassword'],
      }
      console.log("body:",body)
    
}

}
