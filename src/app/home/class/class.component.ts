import {Component,Input} from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
// import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { ClassService } from '../../service/class.service';
import { UserService } from '../../service/user.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../service/auth.service';


@Component({
  selector: 'app-class',
  standalone: true,
  imports: [CommonModule,MatCardModule,MatIconModule,MatButtonModule,MatTabsModule,FormsModule,MatFormFieldModule,MatInputModule,MatMenuModule],
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.scss']
})
export class ClassComponent {
  classId: string | null = null;
  classData: any = null;
  user: any = null;
  announcement: string = '';
  announcements: any[] = [];
  // @Input() userId!: string;

  constructor(private route: ActivatedRoute, private classService: ClassService, private userService: UserService, private authService: AuthService) {}

  ngOnInit() {
    this.user = this.userService.getUserData();
    if(this.user == null){
      this.authService.getUser().subscribe((user) => {
        if (user) {
          this.user = user;
          console.log('User:', this.user); // Debugging
        } else {
          console.error('User is undefined');
        }
      });
    }
    this.route.params.subscribe(params => {
      this.classId = params['id'];
      console.log('Class ID:', this.classId);
      if (this.classId) {
        // console.log("Fetching class data...");
        this.classService.getClassById(this.classId).subscribe((classData: any) => {
          if (classData) {
            console.log('Class Data:', classData);
            this.classData = classData;
            this.announcements = this.classData.materials;
          } else {
            console.error('Class Data is undefined');
          }
        });
        // console.log("Fetching class data finish...");
      }
    });
  }

  // Add Announcement
  addMaterial() {
    let newMaterial = {
      id: this.generateRandomId(),
      content: this.announcement,
      createdAt: new Date()
    };
    this.classService.addMaterialToClass(this.classData.id, newMaterial)
    .then(() => {
      console.log('Material added successfully!');
      this.announcement = '';
    })
    .catch((error) => {
      console.error('Error adding material:', error);
    });
  }
  private generateRandomId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  // Delete Announcement
  // deleteAnnouncement(announcementId: string): void {
  //   console.log('Deleting announcement:', announcementId);
  //   this.announcements = this.announcements.filter((announcement) => announcement.id !== announcementId);
  //   this.classService.deleteMaterialFromClass(this.classData.id, announcementId)
  //     .then(() => {
  //       console.log('Announcement deleted successfully!');
  //     })
  //     .catch((error: any) => {
  //       console.error('Error deleting announcement:', error);
  //     });
  // }
}
