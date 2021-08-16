import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()

export class AuthAdmin implements CanActivate {

  constructor(private authService: AuthService,
    private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    const isLoggedIn = this.authService.isAuthenticated;
    const isAdmin = this.authService.isAdmin;

    if (isLoggedIn && !isAdmin) {
      this.router.navigate(['/user/home']);
    }
    return isAdmin;
  }
}
