import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IUser } from '../../interfaces/IUser';
import { UpperCasePipe } from '@angular/common';


@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [UpperCasePipe],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss'
})
export class UserCardComponent {
  @Input() user!: IUser;
  @Output() deleteUser = new EventEmitter();
  @Output() editUser = new EventEmitter();
  @Output() openDialog = new EventEmitter();

  id = 'id';

  deleteUserCard(){
    this.deleteUser.emit(this.user);
  }
  editUserCard() {
    this.editUser.emit(this.user)
  }
  openDialogCard(){
    this.openDialog.emit();
  }
}
