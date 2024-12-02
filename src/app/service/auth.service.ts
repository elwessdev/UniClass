import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, User, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';
import { Firestore, doc, setDoc,getDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { from, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject = new ReplaySubject<User | null>(1);

  constructor(private auth: Auth, private firestore: Firestore, private router: Router) {
    // this.auth.onAuthStateChanged((user) => {
    //   this.userSubject.next(user);
    // });
    this.auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userDoc = doc(this.firestore, `users/${user.uid}`);
        const docSnapshot = await getDoc(userDoc);
        if (docSnapshot.exists()) {
          const userData = docSnapshot.data();
          // Extend the user object with Firestore data
          const updatedUser = { ...user, photoURL: userData['photoURL'] || null };
          return this.userSubject.next(updatedUser);
        }
      }
      this.userSubject.next(user);
    });
  }

  async signup(email: string, password: string, displayName: string): Promise<void> {
    const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
    const user = userCredential.user;
    if (user) {
      await updateProfile(user, { displayName });
      const userRef = doc(this.firestore, `users/${user.uid}`);
      await setDoc(userRef, {
        uid: user.uid,
        email: user.email,
        name: displayName,
        photoURL: `https://api.dicebear.com/9.x/thumbs/svg?seed=${displayName}`,
        createdAt: new Date(),
      });
    }
  }

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password).then(() => {
      this.router.navigate(['/home']);
    });
  }

  async logout() {
    await this.auth.signOut();
    this.router.navigate(['/signin']);
  }

  // getUser(): Observable<User | null> {
  //   return from(new Promise<User | null>((resolve) => {
  //     this.auth.onAuthStateChanged((user) => {
  //       resolve(user);
  //     });
  //   }));
  // }

  getUser(): Observable<User | null> {
    return this.userSubject.asObservable();
  }
  async getUserDetails(userId: string): Promise<any> {
    const userDocRef = doc(this.firestore, `users/${userId}`);
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists()) {
      return userDoc.data();
    } else {
      throw new Error('User not found in Firestore');
    }
  }

  async googleLogin(): Promise<any> {
    const provider = new GoogleAuthProvider();
    try {
      const userCredential = await signInWithPopup(this.auth, provider);
      const user = userCredential.user;
      if (user) {
        const userDocRef = doc(this.firestore, `users/${user.uid}`);
        const userDoc = await getDoc(userDocRef);
        if (!userDoc.exists()) {
          await setDoc(userDocRef, {
            uid: user.uid,
            email: user.email,
            name: user.displayName,
            photoURL: user.photoURL,
            createdAt: new Date(),
          });
        }
        this.router.navigate(['/home']);
      }
    } catch (error) {
      return 'Google Login Error:' +error;
      // throw error;
    }
  }
}