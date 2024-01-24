import { Component, OnInit } from '@angular/core';
import { UserCardComponent } from "../user-card/user-card.component";
import { UsersService } from '../../services/users.service';
import { IUser } from '../../interfaces/IUser';
import { AsyncPipe, NgFor } from '@angular/common';
import { CreateEditUserComponent } from '../create-edit-user/create-edit-user.component';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { createUser, deleteUser, editUser, loadUsers } from '../../store/users.actions';
import { selectUsersList } from '../../store/users.selectors';


@Component({
    selector: 'app-users-list',
    standalone: true,
    templateUrl: './users-list.component.html',
    styleUrl: './users-list.component.scss',
    imports: [UserCardComponent, NgFor, AsyncPipe ],
})

export class UsersListComponent implements OnInit {

  constructor(
    public usersService:UsersService,
    private dialog: MatDialog,
    private store: Store,
    ) {}

  createdUser!: IUser;
  editedUser!: IUser;
  users$ = this.store.select(selectUsersList)

  ngOnInit(): void {
    this.store.dispatch(loadUsers());
  }

  deleteUser(user: IUser){
    //this.usersService.deleteUsers(user);
    this.store.dispatch(deleteUser({id: user.id}));
  }

  createUser(newUser: IUser){
    //this.usersService.createUser(newUser);
    this.store.dispatch(createUser({user: newUser}));
  }

  editUser() {
    //this.usersService.editUser(user);
  }

  openCreateDialog(): void {

    const dialogRef = this.dialog.open(CreateEditUserComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.createdUser = {
          id: new Date().getTime(),
          name: result?.username,
          email: result?.email,
          phone: result?.phone,
          company: {
            name: result?.company
          }
        }
        this.createUser(this.createdUser);
      }
    });
  }

  openEditDialog(user: IUser): void {
    const dialogRef = this.dialog.open(CreateEditUserComponent, {
      data: user
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.editedUser = {
        id: result?.id,
        name: result?.username,
        email: result?.email,
        phone: result?.phone,
        company: {
          name: result?.company
        }
      }
      this.store.dispatch(editUser({user: this.editedUser}));
    })
  }
}

