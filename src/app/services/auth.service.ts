import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environments';
import { Role } from '../models/roles.enum';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private currentUserSubject = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string): Observable<boolean> {
    return this.http
      .get<any>(`${this.apiUrl}/users`, {
        params: {
          username: username,
          password: password,
        },
      })
      .pipe(
        map((response: any) => {
          // find the matching user from the mock response
          const user = response.find(
            (user: any) =>
              user.username === username && user.password === password
          );

          if (user) {
            if (!Object.values(Role).includes(user.role)) {
              throw new Error('invalidRole');
            }

            // mock token
            const token = 'fake-token-for-testing';

            // store user information in localStorage
            localStorage.setItem('token', token);
            localStorage.setItem('role', user.role);

            // update the current user
            this.currentUserSubject.next(user);
            return true;
          }

          // if no valid user found, throw error
          throw new Error('invalidCredentials');
        })
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }
}
