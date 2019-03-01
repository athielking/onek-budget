import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from './user.service';

@Component({
  selector: 'okb-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  public loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  onLogin() {
    console.log(this.loginForm.value);
    this.userService.login(this.loginForm.value);
  }
}
