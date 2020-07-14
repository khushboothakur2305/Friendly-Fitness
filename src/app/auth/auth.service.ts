import { Subject } from 'rxjs';

import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
@Injectable()
export class AuthService {
  private user: User;
  authChange = new Subject<boolean>();
constructor(private router:Router){}
  registeruser(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() + 10000).toString(),
    };
    this.authSuccessfully();
  }
  Login(authdata: AuthData) {
    this.user = {
      email: authdata.email,
      userId: Math.round(Math.random() + 10000).toString(),
    };
    this.authSuccessfully();
  }
  logout() {
    this.user = null;
    this.authChange.next(false);
    this.router.navigate(['/login']);
  }
  getUser() {
    return { ...this.user };
  }
  isAuth() {
    return this.user != null;
  }
  private authSuccessfully(){
    this.authChange.next(true);
    this.router.navigate(['/training'])
  }
}
