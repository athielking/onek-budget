import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, from, of } from 'rxjs';

import { map, tap } from 'rxjs/operators';
import { UserService } from './user.service';
import { User } from '../models/user.model';
import { StorageService } from '../shared/storage.service';
import { StorageKeys } from '../shared/constants';


@Injectable({
  providedIn: 'root'
})
export class UserStore {

  private _user: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  public user: Observable<User> = this._user.asObservable();

  constructor(private userService: UserService,
              private storageService: StorageService) {
  }

  public registerUser(user: User) {
    this.userService.registerUser(user).subscribe();
  }

  public login(formValue: any) {
    this.userService.login(formValue).subscribe( (result: any) => {
      const user = new User(result.user);
      this.storageService.setItem(StorageKeys.userObj, JSON.stringify(user));
      this._user.next(user);
    });
  }

  public isLoggedIn(): Observable<boolean> {

    let user = this._user.getValue();
    if (user) {
      return of(true);
    }

    const storage = this.storageService.getItem(StorageKeys.userObj);
    if (storage) {
      user = new User(JSON.parse(storage));

      if ( user._id ) {
        this._user.next(user);
        return of(true);
      }
    }

    return this.userService.isLoggedIn().pipe(
      tap( (result: any) => {
        user = new User(result);

        if ( user._id ) {
          this.storageService.setItem(StorageKeys.userObj, user);
          this._user.next(user);
        }
      }),
      map( (result: any) => result !== null, error => false ));
  }
}
