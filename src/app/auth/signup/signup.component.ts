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

  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  onSubmit() {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match!';
      return;
    }
    this.afAuth
      .createUserWithEmailAndPassword(this.email, this.password)
      .then((userCredential) => {
        // Successfully signed up
        console.log('User registered:', userCredential.user);

        // Optionally, update user profile with the username
        userCredential.user?.updateProfile({
          displayName: this.username,
        });

        // Redirect to home page
        // this.router.navigate(['/home']);
      })
      .catch((error) => {
        // Handle errors
        this.errorMessage = "The email address is already in use by another account."
        console.log(error);
      });
  }
}
