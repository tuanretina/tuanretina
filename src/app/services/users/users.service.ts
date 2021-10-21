import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private fb: FormBuilder, private http: HttpClient) { }
  readonly BaseURI = 'https://localhost:5001/api';
  formModel = this.fb.group({
    UserName: ['', Validators.required],
    FirstName: [''],
    LastName: [''],
    Email: ['', Validators.email],
    PhoneNumber: [''],
    Passwords: this.fb.group({
      Password: ['', [Validators.required, Validators.minLength(4)]],
      ConfirmPassword: ['', Validators.required]
    }, { validator: this.comparePasswords })
  });

  comparePasswords(fb: FormGroup) {
    let confirmPswrdCtrl = fb.get('ConfirmPassword');
    //passwordMismatch
    //confirmPswrdCtrl.errors={passwordMismatch:true}
    if (confirmPswrdCtrl?.errors == null || 'passwordMismatch' in confirmPswrdCtrl?.errors) {
      if (fb.get('Password')?.value != confirmPswrdCtrl?.value)
        confirmPswrdCtrl?.setErrors({ passwordMismatch: true });
      else
        confirmPswrdCtrl?.setErrors(null);
    }
  }

  register() {
    var body = {
      UserName: this.formModel.value.UserName,
      FirstName: this.formModel.value.FirstName,
      LastName: this.formModel.value.LastName,
      Email: this.formModel.value.Email,
      PhoneNumber: this.formModel.value.PhoneNumber,
      Password: this.formModel.value.Passwords.Password,

    };

    return this.http.post(this.BaseURI + '/Users/register', body);
  }

  login(formData: any) {
    return this.http.post(this.BaseURI + '/Users/authenticate', formData);

  }

  getToken() {
    return localStorage.getItem('token');
  }
}
