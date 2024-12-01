import { Injectable } from '@angular/core';
import { CanActivateChild, Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { map, tap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivateChild {
  constructor(private auth: Auth, private router: Router) {}

  canActivateChild(): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      this.auth.onAuthStateChanged((user) => {
        if (user) {
          observer.next(true);
          observer.complete();
        } else {
          this.router.navigate(['/signin']);
          observer.next(false);
          observer.complete();
        }
      });
    }).pipe(
      take(1),
      map(user => !!user),
      tap(isAuthenticated => {
        if (!isAuthenticated) {
          this.router.navigate(['/signin']);
        }
      })
    );
  }
}