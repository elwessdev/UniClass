import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // For handling forms
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-class',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './create-class.component.html',
  styleUrls: ['./create-class.component.scss']
})
export class CreateClassComponent {
  errorMessage: string | null = null;
  classData = { name: '', description: ''};
  constructor(public dialogRef: MatDialogRef<CreateClassComponent>) {}

  closeDialog() {
    if(this.classData.name && this.classData.description) {
      this.dialogRef.close(this.classData);
    } else{
      this.errorMessage = 'Please fill in the fields';
    }
  }
}
