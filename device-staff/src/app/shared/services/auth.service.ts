import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';



const defaultPath = '/';


@Injectable()
export class AuthService {

  get isAuthenticated(): boolean {
    const user = localStorage.getItem('token');
    if (user != null) {
      return true;
    }
    else {
      return false;
    }
  }

  get isAdmin(): boolean {
    const user = localStorage.getItem('permission');
    if (user == '2') {
      return true;
    }
    else {
      return false;
    }
  }

  private _lastAuthenticatedPath: string = defaultPath;
  set lastAuthenticatedPath(value: string) {
    this._lastAuthenticatedPath = value;
  }

  constructor(private router: Router,
    private http: HttpClient) { }


  async logIn(formData) {
    let promise = new Promise((resolve, reject) => {
      this.http.post('api/login/login', formData).subscribe((data: any) => {
        if (data.length > 0) {
          localStorage.setItem('token', data[0].key);
          localStorage.setItem('permission', data[0].value);
          this.router.navigate([this._lastAuthenticatedPath]);
        }
        else {
          reject(false);
        }
      }, error => {
        reject(error);
      });
    });
    return promise;
  }


  async getUser() {
    if (this.isAuthenticated) {
      var tokenHeader = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('token') });
      return this.http.get('api/login/get', { headers: tokenHeader }).toPromise();
    }
    else {
      return null;
    }
  }

  async createAccount(email: string, password: string) {
    try {
      // Send request
      console.log(email, password);

      this.router.navigate(['/create-account']);
      return {
        isOk: true
      };
    }
    catch {
      return {
        isOk: false,
        message: "Failed to create account"
      };
    }
  }

  async changePassword(email: string, recoveryCode: string) {
    try {
      // Send request
      console.log(email, recoveryCode);

      return {
        isOk: true
      };
    }
    catch {
      return {
        isOk: false,
        message: "Failed to change password"
      }
    };
  }

  async resetPassword(email: string) {
    try {
      // Send request
      console.log(email);

      return {
        isOk: true
      };
    }
    catch {
      return {
        isOk: false,
        message: "Failed to reset password"
      };
    }
  }

  async logOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("permission");
    this.router.navigate(['/login-form']);
  }
}

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private router: Router, private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const isLoggedIn = this.authService.isAuthenticated;
    const isAuthForm = [
      'login-form',
      'reset-password',
      'create-account',
      'change-password/:recoveryCode'
    ].includes(route.routeConfig?.path || defaultPath);

    if (isLoggedIn && isAuthForm) {
      this.authService.lastAuthenticatedPath = defaultPath;
      this.router.navigate(['/user/information']);
      return false;
    }

    if (!isLoggedIn && !isAuthForm) {
      this.router.navigate(['/login-form']);
    }

    if (isLoggedIn) {
      this.authService.lastAuthenticatedPath = route.routeConfig?.path || defaultPath;
    }

    return isLoggedIn || isAuthForm;
  }
}

