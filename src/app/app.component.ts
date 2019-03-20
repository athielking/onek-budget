import { Component } from '@angular/core';
import { UserService } from './user/user.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { UserStore } from './user/user.store';



@Component({
  selector: 'okb-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'onek-budget';

  public isLoggedIn: boolean;

  constructor(private loginStore: UserStore) {
    loginStore.user.subscribe( user => {
      this.isLoggedIn = user !== null;
    });

  }
}
