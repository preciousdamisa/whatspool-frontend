import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

import { AuthResponseData } from './auth-response-data.model';

import { User } from './user.model';
import { environment } from '../../environments/environment';
import { MyHttpService } from '../shared/services/my-http.service';

@Injectable({ providedIn: 'root' })
export class UserService {
  userSubj = new Subject<User | null>();
  private tokenExpirationTimer: any;

  constructor(
    private http: HttpClient,
    private myHttp: MyHttpService,
    private router: Router
  ) {}

  getUser() {
    const user = this.getStoredUserData();
    if (user?.token) return user;
    return null;
  }

  private getStoredUserData() {
    const userData = localStorage.getItem('userData');
    if (!userData) return;

    return User.fromJson(JSON.parse(userData));
  }

  signup(
    firstName: string,
    lastName: string,
    phone: string,
    email: string,
    password: string
  ) {
    return this.http
      .post<AuthResponseData>(environment.whatspoolApiUrl + 'users', {
        firstName,
        lastName,
        phone,
        email,
        password,
      })
      .pipe(
        tap((res) => {
          this.handleAuth(res);
        }),
        catchError(this.myHttp.handleErr)
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(environment.whatspoolApiUrl + 'auth', {
        email,
        password,
      })
      .pipe(
        tap((res) => {
          this.handleAuth(res);
        }),
        catchError(this.myHttp.handleErr)
      );
  }

  autoLogin() {
    const user = this.getStoredUserData();

    // If the token has not expired.
    if (user?.token) {
      this.userSubj.next(user);
      this.router.navigate(['']);

      const tokenLifeSpan =
        user.tokenExpiryTime.getTime() - new Date().getTime();
      this.autoLogout(tokenLifeSpan);
    }
  }

  logout() {
    this.userSubj.next(null);
    this.router.navigate(['/login']);
    localStorage.removeItem('userData');

    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
  }

  private autoLogout(tokenLifeSpan: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, tokenLifeSpan);
  }

  private handleAuth(res: AuthResponseData) {
    const tokenLifeSpan = res.expiresIn * 1000;
    const tokenExpiryTime = new Date(new Date().getTime() + tokenLifeSpan);
    const user = new User(
      res.id,
      res.firstName,
      res.lastName,
      res.email,
      res.phone,
      res.balance,
      res.referralBonus,
      res.roles,
      res.wins,
      res.referralCode,
      res.token,
      tokenExpiryTime
    );

    this.userSubj.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
    this.autoLogout(tokenLifeSpan);
  }
}
