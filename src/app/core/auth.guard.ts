import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { UserStore } from '../user/user.store';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router,
              private userStore: UserStore) {}

    canActivate(): boolean | Observable<boolean> {
        const obs = this.userStore.isLoggedIn();

        obs.subscribe(isLoggedIn => {
            if (!isLoggedIn) {
                this.router.navigate(['/login']);
            }
        });

        return obs;
    }
}
