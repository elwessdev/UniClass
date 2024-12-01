import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../service/auth.service';
import { ClassService } from '../../service/class.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [MatButtonModule,CommonModule],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss'
})
export class CardsComponent {
  classes: any[] = [];
  constructor(private authService: AuthService, private classService: ClassService) {}
  
  ngOnInit(): void {
    this.authService.getUser().subscribe((user) => {
      // this.userData = user;
      if (user) {
        this.classService.getClassesForUser(user.uid).subscribe((classes: any[]) => {
          this.classes = classes;
          console.log('Classes for this user:', this.classes);
        });
      } else {
        console.log("Error: User not found");
      }
    });
  }

  removeClass(classId: string) {
    this.classService.removeClass(classId).then(() => {
      this.classes = this.classes.filter((c) => c.id !== classId);
    });
  }
}
