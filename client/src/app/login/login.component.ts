import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,

})
export class LoginComponent implements OnInit {

  loginForm = this.fb.group({
    email : [''],
    password : ['']
  })

  constructor(
    private router:Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private userService: UserService) { }

  ngOnInit() {
  }

  login()
  {
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    this.authService.login(email, password)
      .subscribe(
          results => {
          this.userService.loadUser().subscribe(result => {
            this.router.navigateByUrl('admin');
          })
        },
        error => {
        }
      );

  }

}
