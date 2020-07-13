import { Subject } from 'rxjs';

import { User } from './user.model';
import { AuthData } from './auth-data.model';

export class AuthService {
  private user: User;
  authChange = new Subject<boolean>();

  registeruser(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() + 10000).toString(),
    };
    this.authChange.next(true);
  }
  Login(authdata: AuthData) {
    this.user = {
      email: authdata.email,
      userId: Math.round(Math.random() + 10000).toString(),
    };
    this.authChange.next(true);
  }
  logout() {
    this.user = null;

    this.authChange.next(false);
  }
  getUser() {
    return { ...this.user };
  }
  isAuth() {
    return this.user != null;
  }
}
