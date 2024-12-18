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
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      username: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]*$/)]],
      email: ['', [Validators.required, Validators.email, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)]],
      street: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9., ]*$/)]],
      city: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/), Validators.maxLength(50)]],
      companyName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9. ]*$/), Validators.maxLength(100)]]
    });
  }

  get f() { return this.userForm.controls; }

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
