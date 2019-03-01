import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { map } from 'rxjs/operators';
import { UserService } from './user.service';
import { User } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class UserStore {

  constructor(private userService: UserService) {
  }

  public registerUser(user: User) {
    this.userService.registerUser(user).subscribe();
  }
}
