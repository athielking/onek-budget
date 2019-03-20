import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from './user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserStore } from './user.store';

@Component({
  selector: 'okb-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  public loggedOut = false;
  public hasError = false;
  public loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  constructor(private userStore: UserStore,
              private route: ActivatedRoute,
              private router: Router) {
    this.route.data.subscribe( data => {
      this.loggedOut = data.logout;

      if (this.loggedOut) {
        this.userStore.logout();
      }
    });
  }

  ngOnInit() {
  }

  onLogin() {
    this.hasError = false;
    this.userStore.login(this.loginForm.value).subscribe(
      result => {
        this.router.navigate(['/transaction']);
      }, error => {
        setTimeout(() => this.hasError = true);
      });
  }
}
