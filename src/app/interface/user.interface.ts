import { EventEmitter } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { BsModalRef } from "ngx-bootstrap/modal";
import { Observable } from "rxjs";

export interface IUser {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

interface Geo {
  lat: string;
  lng: string;
}

export interface IUserService {
  getUsers(): Observable<unknown>;
  createUser(user: IUser): Observable<unknown>;
  updateUser(id: number, user: IUser): Observable<unknown>;
  deleteUser(id: number): Observable<unknown>;
}

export interface IUserComponent {
  bsModalRef?: BsModalRef;
  data: IUser[];
  selectedUser: IUser | null;
  accessForm: boolean;
  isEditing: boolean;
  loadData(): void;
  handleFormSubmit(formData: any): void;
  handleInsert(): void;
  handleEdit(item: IUser): void;
  handleDelete(id: number): void;
  openDetailModal(item: IUser): void;
  openDeleteModal(item: IUser): void;
  resetForm(): void;
}

export interface IUserTable {
  data: IUser[];
  onInsert: EventEmitter<null>;
  onEdit: EventEmitter<IUser>;
  onDelete: EventEmitter<IUser>;
  onViewDetails: EventEmitter<IUser>;
  viewDetails(item: IUser): void;
  add(): void;
  edit(item: IUser): void;
  delete(item: IUser): void;
}

export interface IUserForm {
  formSubmit: EventEmitter<any>;
  formReset: EventEmitter<any>;
  user: IUser | null;
  isEditing: boolean;
  userForm: FormGroup;
  ngOnInit(): void;
  onAddUser(): void
  onEditUser(user: IUser): void
  onSubmit(): void
  onCancel(): void
}

export interface IUserDetail {
  user: IUser;
  closeModal(): void;
}
