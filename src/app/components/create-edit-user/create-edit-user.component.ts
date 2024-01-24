import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IUser } from '../../interfaces/IUser';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { NgIf } from '@angular/common';

import {
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';


@Component({
  selector: 'app-create-edit-user',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    ReactiveFormsModule,
    NgIf,
  ],
  templateUrl: './create-edit-user.component.html',
  styleUrl: './create-edit-user.component.scss'
})

export class CreateEditUserComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CreateEditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IUser,
  ) {}

  titleButtonName: string = 'Создать';
  userForm!: FormGroup;

  onNoClick(): void {
    this.dialogRef.close();
  }

  submitFormValue(){
    this.dialogRef.close(this.userForm.value);
  }

  ngOnInit(): void {
    this.userForm = new FormGroup ({
      'id': new FormControl(''),
      'username': new FormControl('', [Validators.required, Validators.minLength(4)]),
      'email': new FormControl('', [Validators.required, Validators.email]),
      'phone': new FormControl('', [Validators.required, Validators.pattern(/^[\+]?[(]?[0-9]{1,3}[)]?[-\s\.]?[0-9]{2,3}[-\s\.]?[0-9]{2,8}$/)]),
      'company': new FormControl('', [Validators.required, Validators.minLength(5)])
    })

    if (this.data) {
      this.userForm.patchValue({'id': this.data.id})
      this.userForm.patchValue({'username': this.data.name})
      this.userForm.patchValue({'email': this.data.email})
      this.userForm.patchValue({'phone': this.data.phone})
      this.userForm.patchValue({'company': this.data.company.name})
      this.titleButtonName = 'Редактировать';
    }
  }
}
