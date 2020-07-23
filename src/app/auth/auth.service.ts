import { Subject } from 'rxjs';
import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();
  private isAuthenticated =false;
  constructor(private router: Router, private afAuth: AngularFireAuth) {}

  registeruser(authData: AuthData) {
    this.afAuth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then((result) => {
        console.log(result);
        this.authSuccessfully();
      })
      .catch((error) => {
        console.log(error);
      });
  }
  Login(authData: AuthData) {
    this.afAuth
    .signInWithEmailAndPassword(authData.email, authData.password)
    .then((result) => {
      console.log("success");
      this.authSuccessfully();
    })
    .catch((error) => {
      console.log(error.error);
    });
}
  logout() {
    this.authChange.next(false);
    this.router.navigate(['/login']);
    this.isAuthenticated=false;
  }
  isAuth() {
    return this.isAuthenticated;
  }
  private authSuccessfully() {
    this.isAuthenticated=true;
    this.authChange.next(true);
    this.router.navigate(['/training']);
  }
}
