import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { LoginService } from '../login.service';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  constructor(
    private loginService: LoginService,
    public authenticationService: AuthenticationService) {

    }

  ngOnInit(): void {
  }

  onSubmit() {
    const username = this.loginForm.value['username'];
    const password = this.loginForm.value['password'];

    this.loginService.login(username, password);
  }
}
