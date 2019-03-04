import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from './user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'okb-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  public hasError = false;
  public loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  constructor(private userService: UserService,
              private router: Router) { }

  ngOnInit() {
  }

  onLogin() {
    this.hasError = false;
    this.userService.login(this.loginForm.value).subscribe(
      result => {
        this.router.navigate(['/transaction']);
      }, error => {
        setTimeout(() => this.hasError = true);
      });
  }
}
