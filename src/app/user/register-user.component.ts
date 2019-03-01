import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, Validator } from '@angular/forms';
import { MustMatch } from '../core/must-match.validator';
import { UserStore } from './user.store';
import { ClrForm } from '@clr/angular';

@Component({
  selector: 'okb-register-user',
  templateUrl: './register-user.component.html'
})
export class RegisterUserComponent implements OnInit {

  public registerForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    fullname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    repeatPassword: new FormControl('', [Validators.required])
  });

  get f() {
    return this.registerForm.controls;
  }

  @ViewChild(ClrForm) clrForm;

  constructor(private userStore: UserStore) { }

  ngOnInit() {
  }

  onSubmit() {
    if (!this.registerForm.valid) {
      this.clrForm.markAsDirty();
      return;
    }

    this.userStore.registerUser(this.registerForm.value);
  }

}
