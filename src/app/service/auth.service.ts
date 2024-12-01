// src/app/auth.service.ts
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private fireAuth: AngularFireAuth, private router: Router) {}

  signUp(email: string, password: string) {
    return this.fireAuth.createUserWithEmailAndPassword(email, password);
  }
  login(email: string, password: string) {
    return this.fireAuth.signInWithEmailAndPassword(email, password)
      .then(() => {
        this.router.navigate(['/home']);
      });
  }
  logout() {
    return this.fireAuth.signOut().then(() => {
      this.router.navigate(['/signin']);
    });
  }
  getUser() {
    return this.fireAuth.authState;
  }
}