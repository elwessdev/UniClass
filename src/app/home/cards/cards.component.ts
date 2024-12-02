import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../service/auth.service';
import { ClassService } from '../../service/class.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [MatButtonModule,CommonModule],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss'
})
export class CardsComponent {
  classes: any[] = [];
  userClasses: any[] = [];
  userId: string = '';

  constructor(private authService: AuthService, private classService: ClassService, private router: Router) {}

  private _snackBar = inject(MatSnackBar);
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  durationInSeconds = 3;
  
  ngOnInit(): void {
    this.authService.getUser().subscribe((user) => {
      // this.userData = user;
      if (user) {
        this.classService.getClassesForUser(user.uid).subscribe((classes: any[]) => {
          this.classes = classes;
          this.userId = user.uid;
          this.getJoinedClasses(user.uid);
          console.log('Classes for this user:', this.classes);
        });
      } else {
        console.log("Error: User not found");
      }
    });
  }

  // Delete class
  removeClass(classId: string) {
    this.classService.removeClass(classId).then(() => {
      this.classes = this.classes.filter((c) => c.id !== classId);
    });
  }
  // Class Details
  goToDetails(classId: string): void {
    this.router.navigate(['home/details', classId]);
  }
  // Get joined classes
  async getJoinedClasses(id: string) {
    try {
        this.userClasses = await this.classService.getUserClasses(id);
        console.log("get join classes:", this.userClasses);
    } catch (error) {
      console.error('Error:', error);
    }
  }
  // Unroll class
  async Unroll(classId: string) {
    try {
      console.log(this.userId);
      let message = await this.classService.unrollClass(this.userId, classId);
      this.userClasses = this.userClasses.filter((classItem: any) => classItem.id !== classId);
      this._snackBar.open(message, '', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: this.durationInSeconds * 1000,
      });
    } catch (error) {
      console.error('Error:', error);
      this._snackBar.open('An error occurred while unrolling from the class', '', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: this.durationInSeconds * 1000,
      });
    }
  }
}
