import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-join-class',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './join-class.component.html',
  styleUrl: './join-class.component.scss'
})
export class JoinClassComponent {
  classCode: string = '';
  errorMessage: string | null = null;

  constructor(public dialogRef: MatDialogRef<JoinClassComponent>) {}

  closeDialog() {
    if(this.classCode) {
      this.dialogRef.close(this.classCode);
    } else{
      this.errorMessage = 'Please enter the class code';
    }
  }
}
