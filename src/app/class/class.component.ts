import {Component} from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
// import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'app-class',
  standalone: true,
  imports: [MatCardModule,MatIconModule,MatButtonModule,MatTabsModule,FormsModule,MatFormFieldModule,MatInputModule,],
  templateUrl: './class.component.html',
  styleUrl: './class.component.scss'
})
export class ClassComponent {

}
