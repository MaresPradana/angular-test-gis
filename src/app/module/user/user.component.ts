import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { ConfirmDialogData, ConfirmDialogResponse } from '../../interface/confirm-dialog.interface';
import { IUser, IUserComponent } from '../../interface/user.interface';

import { UserService } from '../../service/user.service';

import { UserFormComponent } from '../../form/user-form/user-form.component';
import { UserTableComponent } from '../../table/user-table/user-table.component';
import { UserDetailComponent } from '../../modal/user-detail/user-detail.component';
import { ConfirmDialogComponent } from '../../modal/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-user',
  imports: [CommonModule, UserFormComponent, UserTableComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements IUserComponent {

  bsModalRef?: BsModalRef;

  data: IUser[] = [];
  selectedUser: IUser | null = null;
  accessForm = false;
  isEditing = false;

  constructor(
    private userService: UserService,
    private modalService: BsModalService ) {}

  ngOnInit(): void {
    this.accessForm = false
    this.loadData();
  }

  loadData(): void {
    this.userService.getUsers().subscribe((res: IUser[] | any) => {
      this.data = res;
    });
  }

  handleFormSubmit(formData: any): void {
    if (this.isEditing && this.selectedUser) {
      this.userService.updateUser(this.selectedUser.id, formData).subscribe(() => {
        this.loadData();
        this.resetForm();
      });
    } else {
      this.userService.createUser(formData).subscribe(() => {
        this.loadData();
        this.resetForm();
      });
    }
  }

  handleInsert(): void {
    this.accessForm = true;
    this.isEditing = false;
    this.selectedUser = null;
  }

  handleEdit(item: IUser): void {
    this.accessForm = true;
    this.isEditing = true;
    this.selectedUser = item;
  }

  handleDelete(id: number): void {
    this.userService.deleteUser(id).subscribe(() => {
      this.loadData();
    });
  }

  openDetailModal(item: IUser): void {
    this.bsModalRef = this.modalService.show(UserDetailComponent, {
      initialState: {
        user: item // Kirim data user ke modal
      }
    });
  }

  openDeleteModal(item: IUser): void {
    const dialogData: ConfirmDialogData = {
      message: `Are you sure you want to delete ${item.name}?`
    };

    this.bsModalRef = this.modalService.show(ConfirmDialogComponent, { initialState: {
      data: dialogData
    } });

    this.bsModalRef.content.result.subscribe((response: ConfirmDialogResponse) => {
      if (response.confirmed) {
        this.handleDelete(item.id);
      }
    });
  }

  resetForm(): void {
    this.accessForm = false;
    this.isEditing = false;
    this.selectedUser = null;
  }
}
