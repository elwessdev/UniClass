import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from 'firebase/auth';

import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    RouterLink,
  ],
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.getUser().subscribe((user: User | null) => {
      if (user) {
        console.log('User already logged in:', user);
        this.router.navigate(['/home']);
      }
    });
  }

  async login() {
    this.errorMessage = '';
    try {
      console.log('Attempting login with:', this.email, this.password);
      const res = await this.authService.login(this.email, this.password);
      console.log('Login Successful');
      this.router.navigate(['/home']);
    } catch (error: any) {
      console.error('Login Error:', error);
      this.errorMessage = "Invalid email or password. Please try again.";
    }
  }
}
