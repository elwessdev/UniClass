import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userData: any = null;

  setUserData(data: any) {
    this.userData = data;
  }

  getUserData(): any {
    return this.userData;
  }
}