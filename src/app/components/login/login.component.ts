import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.authService.login(this.username, this.password).subscribe({
      next: () => {
        const role = this.authService.getRole();
        if (role === 'Admin') {
          this.router.navigate(['/admin']);
        } else if (role === 'User') {
          this.router.navigate(['/user']);
        }
      },
      error: (err: Error) => {
        if (err.message === 'invalidRole') {
          this.errorMessage = 'Invalid Role recieved.';
        } else if (err.message === 'invalidCredentials') {
          this.errorMessage = 'Invalid credentials.';
        } else {
          this.errorMessage = 'Unexpected error occured.';
        }
      },
    });
  }
}
