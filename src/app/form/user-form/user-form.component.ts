import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IUser, IUserForm } from '../../interface/user.interface';

@Component({
  selector: 'app-user-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent implements OnInit, IUserForm {
  @Output() formSubmit = new EventEmitter<any>();
  @Output() formReset = new EventEmitter<any>();
  @Input() user: IUser | null = null;
  @Input() isEditing!: boolean;

  userForm: FormGroup;

  constructor(private fb: FormBuilder) {
    // Definisikan form dengan validasi
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      street: ['', Validators.required],
      city: ['', Validators.required],
      companyName: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (!this.isEditing || !this.user) {
      this.onAddUser();
    } else {
      this.onEditUser(this.user);
    }
  }

  // Fungsi untuk membuka form tambah pengguna
  onAddUser(): void {
    this.userForm.reset();
  }

  // Fungsi untuk membuka form ubah pengguna
  onEditUser(user: IUser): void {
    this.userForm.patchValue({
      name: user.name,
      username: user.username,
      email: user.email,
      street: user.address.street,
      city: user.address.city,
      companyName: user.company.name
    });
  }

  // Fungsi submit form
  onSubmit(): void {
    if (this.userForm.valid) {
      this.formSubmit.emit(this.userForm.value);
      this.userForm.reset();  // Reset form saat dibatalkan
    } else {
      this.userForm.markAllAsTouched();
    }
  }

  // Fungsi cancel untuk menyembunyikan form
  onCancel(): void {
    this.formReset.emit();
    this.userForm.reset();  // Reset form saat dibatalkan
  }
}
