import { Component,OnInit,inject } from '@angular/core';
import { ClassComponent } from './class/class.component';
import { RouterOutlet, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { CreateClassComponent } from './create-class/create-class.component';
import { JoinClassComponent } from './join-class/join-class.component';
import { User } from 'firebase/auth';
import { AuthService } from '../service/auth.service';
import { Firestore, doc, setDoc, getDoc } from '@angular/fire/firestore';
import { firstValueFrom } from 'rxjs';
import { ClassService } from '../service/class.service';
import { UserService } from '../service/user.service';

import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

/* Material Modules */
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatDialogModule,
    RouterLink,
    MatButtonModule,
    CommonModule,
    RouterModule,
    RouterOutlet,
    ClassComponent,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatCardModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  userData: User | null = null;
  userDetails: any = null;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  classes: any[] = [];
  userClasses: any[] = [];

  private _snackBar = inject(MatSnackBar);
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  durationInSeconds = 3;
  // openSnackBar() {
  //   this._snackBar.open('Test', '', {
  //     horizontalPosition: this.horizontalPosition,
  //     verticalPosition: this.verticalPosition,
  //     // duration: this.durationInSeconds * 1000,
  //   });
  // }

  constructor(private authService: AuthService, private dialog: MatDialog, private classService: ClassService, private userService: UserService, private router: Router) {}

  // Join Class
  openJoinClass() {
    const dialogRef = this.dialog.open(JoinClassComponent, { width: '430px'});
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        let userDt = {
          user_id: this.userData?.uid,
          user_name: this.userData?.displayName,
          user_photo: this.userData?.photoURL
        }
        this.joinClass(userDt, result);
      }
    });
  }
  joinClass(userDt: any, code: string) {
    this.classService.joinClass(userDt, code)
      .then((res) => {
        this._snackBar.open(res, '', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: this.durationInSeconds * 1000,
        });
      })
      .catch((error) => {
        console.error('Error:', error.message);
      })
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
    
  // }
  async ngOnInit() {
    this.authService.getUser().subscribe((user) => {
      // this.userData = user;
      if (user) {
        // console.log('Firebase user data:', user);
        this.fetchUserDetails(user.uid);
        this.getJoinedClasses(user.uid);
        this.userData = user;
        this.classService.getClassesForUser(user.uid).subscribe((classes: any[]) => {
          this.classes = classes;
          // console.log('Classes for this user:', this.classes);
        });
      } else {
        this.userDetails = null;
        console.log(this.userDetails);
      }
    });
  }
  private async fetchUserDetails(userId: string): Promise<void> {
    try {
      this.userDetails = await this.authService.getUserDetails(userId);
      console.log('Firestore user details:', this.userDetails);
      this.userService.setUserData(this.userDetails);
    } catch (error) {
      console.error('Error fetching Firestore user details:', error);
    }
  }

  // Logout
  logout(): void {
    this.authService.logout();
  }
  
  // Create Class
  openCreateClass() {
    const dialogRef = this.dialog.open(CreateClassComponent, { width: '430px'});
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.createClass(result);
      }
    });
  }
  createClass(classData: any): void {
    this.authService.getUser().subscribe((user: User | null) => {
      console.log("user", user);
      if (user) {
        let cover = this.getRandomLink();
        let code = this.generateRandomCode();
        const classToAdd = {
          name: classData.name,
          description: classData.description,
          code: code,
          cover: cover,
          date: new Date(),
          user_id: user.uid,
          user_name: user.displayName || user.email,
          user_photo: user.photoURL || '',
        };
        this.classService.addClass(classToAdd).then(() => {
          this.successMessage = 'Class created successfully!';
          this.errorMessage = null;
          this._snackBar.open("Class created successfully!", '', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: this.durationInSeconds * 1000,
          });
          // console.log("class added done");
        }).catch((error) => {
          console.error('Error adding class:', error);
          this.errorMessage = 'Failed to create class. Please try again later.';
          this.successMessage = null;
        });
      } else {
        this.errorMessage = 'User not logged in.';
        this.successMessage = null;
      }
    });
  }
  generateRandomCode(length: number = 6): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomCode = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomCode += characters[randomIndex];
    }
    return randomCode;
  }
  getRandomLink(): string {
    let links = [
      "https://gstatic.com/classroom/themes/img_reachout.jpg", 
      "https://www.gstatic.com/classroom/themes/Chemistry.jpg", 
      "https://www.gstatic.com/classroom/themes/img_read.jpg",
      "https://www.gstatic.com/classroom/themes/img_breakfast.jpg",
      "https://www.gstatic.com/classroom/themes/img_arts.jpg"
    ]
    const randomIndex = Math.floor(Math.random() * links.length);
    return links[randomIndex];
  }

  // Class Details
  goToDetails(classId: string): void {
    this.router.navigate(['home/details', classId]);
  }
}
