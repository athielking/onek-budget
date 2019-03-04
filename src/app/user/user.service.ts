import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { shareReplay } from 'rxjs/operators';

import { User } from '../models/user.model';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  private serviceUri = 'http://localhost:4040/api/auth';

  constructor(private httpClient: HttpClient) { }

  public registerUser(user: User) {
    return this.httpClient.post(this.serviceUri + '/register', user).pipe(shareReplay());
  }

  public login(formValue: any) {
    return this.httpClient.post(this.serviceUri + '/login', formValue).pipe(shareReplay());
  }

  public isLoggedIn() {
    return this.httpClient.get(this.serviceUri + '/me');
  }
}
