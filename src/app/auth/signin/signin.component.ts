import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule, FormsModule, MatInputModule, MatButtonModule, MatCardModule, MatFormFieldModule, RouterLink],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss',
})
export class SigninComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.getUser().subscribe(user => {
      if (user) {
        console.log(user);
        // this.router.navigate(['/home']);
      }
    });
  }

  login() {
    this.errorMessage = '';
    console.log(this.email, this.password);
    this.authService.login(this.email, this.password)
      .then((res) => {
        console.log("Login Successful:", res);
        this.router.navigate(['/home']);
      })
      .catch((error) => {
        console.error('Login Error:', error);
        this.errorMessage = "Invalid Credentials";
      });
  }
}