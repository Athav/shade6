import { GenericService } from './../services/generic.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private generic: GenericService,
    private route: Router,
    private loginServ: LoginService
  ) { }

  onLogin() {
    if (this.loginForm.invalid) {
      this.generic.openSnackBar('Invalid', 'Close');
      return;
    } else {
      console.log(this.loginForm);
      const user = {
        name: this.loginForm.value.displayName,
        email: this.loginForm.value.userName,
        password: this.loginForm.value.password
      }
      this.loginServ.onLogin(user).subscribe(arg => {
        console.log(arg);
        if (arg.msg === "User fetched") {
          this.generic.openSnackBar(`Login success`, `Close`);
          this.route.navigateByUrl('/dashboard')
        } else if (arg.msg === 'User not exist') {
          this.generic.openSnackBar('User not exist please register', 'Close');
        } else {
          this.generic.openSnackBar('Can not get user', 'Close');
        }
      })
    }
  }

  onSignUp() {
    this.route.navigateByUrl('/sign-up');
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      userName: new FormControl('', { validators: [Validators.required, Validators.minLength(3)] }),
      password: new FormControl('', { validators: [Validators.required, Validators.minLength(3)] }),
    });
  }

}
