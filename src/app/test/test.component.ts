import { Component } from '@angular/core';
// import { ClassComponent } from '../class/class.component';
// import { RouterOutlet } from '@angular/router';

/* Material Modules */
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
// import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [MatSidenavModule,MatToolbarModule,MatListModule,MatIconModule,MatCardModule],
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss'
})
export class TestComponent {

}
