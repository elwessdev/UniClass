import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [MatButtonModule,RouterLink],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {
  constructor(private authService: AuthService, private router:Router) {}

  ngOnInit() {
    this.authService.getUser().subscribe((user) => {
      if(user) {
        this.router.navigate(['/home']);
      }
    });
  }
}
