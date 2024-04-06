import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, UrlTree, Router, Route } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const { path } = route.routeConfig as Route;
    const isAuthenticated = this.authService.isAuthenticated();

    if (path === 'login' && isAuthenticated) {
      this.router.navigate(['/gallery']);
    }

    if (!isAuthenticated) {
      this.router.navigate(['/login']);

      return false;
    }

    return true;
  }

}
