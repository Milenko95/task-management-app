import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const requiredRoles = route.data['roles'];
    const userRole = this.authService.getRole();
    const loggedIn = this.authService.isLoggedIn();
    console.log('can activate', loggedIn);

    // extract the base URL
    const baseUrl = state.url.split('?')[0];

    // allow access to the login route if not logged in
    if (!loggedIn && baseUrl === '/login') {
      return true;
    }

    if (!loggedIn && state.url !== '/login') {
      this.router.navigate(['/login'], {
        queryParams: { returnUrl: state.url },
      });
      // block access to other routes
      return false;
    }

    // prevent navigation to login page if logged in
    if (state.url === '/login' && loggedIn) {
      // redirect logged-in users based on their role
      if (userRole === 'Admin') {
        this.router.navigate(['/admin']);
      } else if (userRole === 'User') {
        this.router.navigate(['/user']);
      }
      // block access to login
      return false;
    }

    // redirect unauthenticated users to login page
    if (!this.isLoggedIn && state.url === '/login') {
      return true;
    }

    // check if the user has the required role for the route
    if (requiredRoles && requiredRoles.includes(userRole)) {
      // allow navigation if role matches
      return true;
    }

    this.router.navigate(['/unauthorized']);
    return false;
  }
}
