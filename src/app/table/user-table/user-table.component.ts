import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IUser, IUserTable } from '../../interface/user.interface';

@Component({
  selector: 'app-user-table',
  imports: [CommonModule],
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.scss'
})
export class UserTableComponent implements IUserTable {
  @Input() data: IUser[] = [];
  @Output() onInsert = new EventEmitter<null>();
  @Output() onEdit = new EventEmitter<IUser>();
  @Output() onDelete = new EventEmitter<IUser>();
  @Output() onViewDetails = new EventEmitter<IUser>();

  viewDetails(item: IUser): void {
    this.onViewDetails.emit(item);
  }

  add(): void {
    this.onInsert.emit();
  }

  edit(item: IUser): void {
    this.onEdit.emit(item);
  }

  delete(item: IUser): void {
    this.onDelete.emit(item);
  }
}
