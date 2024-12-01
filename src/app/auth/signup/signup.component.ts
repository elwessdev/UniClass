import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterLink } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth'; // Import Firebase Auth
import { Router } from '@angular/router'; // Import Router for navigation
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../service/auth.service';
import { User } from 'firebase/auth';

@Component({
  selector: 'app-signup',
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
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.getUser().subscribe((user: User | null) => {  // Type the 'user' as 'User | null'
      if (user) {
        console.log('User already logged in:', user);
        this.router.navigate(['/home']);
      }
    });
  }

  async signup(): Promise<void> {
    try {
      if (this.password !== this.confirmPassword) {
        this.errorMessage = 'Passwords do not match!';
        return;
      }
      await this.authService.signup(this.email, this.password, this.username);
      this.router.navigate(['/home']);
    } catch (error: any) {
      this.errorMessage = "Something went wrong. Please try again.";
      console.log(error.message);
    }
  }
}
