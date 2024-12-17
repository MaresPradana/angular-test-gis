import { Component, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { IUser, IUserDetail } from '../../interface/user.interface';

@Component({
  selector: 'app-user-detail',
  imports: [],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent implements IUserDetail {
  @Input() user!: IUser;

  constructor(public bsModalRef: BsModalRef) {}

  closeModal(): void {
    this.bsModalRef.hide();
  }
}
