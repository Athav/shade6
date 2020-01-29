import { GenericService } from './../services/generic.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  registerForm: FormGroup;
  constructor(
    private generic: GenericService,
    private route: Router,
    private loginServ: LoginService
  ) { }

  onSignUpUser() {
    if (this.registerForm.invalid) {
      this.generic.openSnackBar('Fields should not be empty', 'Close');
      return;
    } else {
      const user = {
        name: this.registerForm.value.displayName,
        email: this.registerForm.value.userName,
        password: this.registerForm.value.password
      }
      this.loginServ.onRegister(user).subscribe(arg => {
        console.log(arg);
        if (arg.msg === "User registered") {
          this.generic.openSnackBar(`${arg.msg} please login`, `Close`);
          this.route.navigateByUrl('/login')
        } else if (arg.msg === 'User already exist') {
          this.generic.openSnackBar('User already exist please login', 'Close');
        } else {
          this.generic.openSnackBar('Can not add user', 'Close');
        }
      })
    }
  }

  ngOnInit() {
    this.registerForm = new FormGroup({
      userName: new FormControl('', { validators: [Validators.required, Validators.minLength(3)] }),
      password: new FormControl('', { validators: [Validators.required, Validators.minLength(3)] }),
      displayName: new FormControl('', { validators: [Validators.required, Validators.minLength(3)] })
    });
  }

}
