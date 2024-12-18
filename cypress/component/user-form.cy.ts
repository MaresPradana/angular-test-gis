// cypress/component/user-form.cy.ts

import { mount } from 'cypress/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';  // For forms
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserFormComponent } from '../../src/app/form/user-form/user-form.component';

describe('User Form - Empty Validation All Field', () => {
  it('should render the form with validation errors when fields are empty', () => {
    mount(UserFormComponent, {
      imports: [FormsModule, ReactiveFormsModule, BrowserAnimationsModule], // Import necessary modules
    });

    // Assert that all fields are initially empty
    cy.get('input[formcontrolname="name"]').should('be.empty');
    cy.get('input[formcontrolname="username"]').should('be.empty');
    cy.get('input[formcontrolname="email"]').should('be.empty');
    cy.get('input[formcontrolname="street"]').should('be.empty');
    cy.get('input[formcontrolname="city"]').should('be.empty');
    cy.get('input[formcontrolname="companyName"]').should('be.empty');

    // Submit form
    cy.get('form').submit();

    // Assert validation error is shown
    cy.get('input[formcontrolname="name"]').should('have.class', 'ng-invalid');
    cy.get('input[formcontrolname="username"]').should('have.class', 'ng-invalid');
    cy.get('input[formcontrolname="email"]').should('have.class', 'ng-invalid');
    cy.get('input[formcontrolname="street"]').should('have.class', 'ng-invalid');
    cy.get('input[formcontrolname="city"]').should('have.class', 'ng-invalid');
    cy.get('input[formcontrolname="companyName"]').should('have.class', 'ng-invalid');
  });

  it('should show error hint when a field is empty and submit is clicked', () => {
    mount(UserFormComponent, {
      imports: [FormsModule, ReactiveFormsModule],
    });

    // Submit form with empty fields
    cy.get('form').submit();

    // Check for validation error hints
    // Verifikasi bahwa setiap field menampilkan pesan error
    cy.get('input[formControlName="name"]')
      .parent()
      .find('.invalid-feedback')
      .should('contain', 'Name is required.');

    cy.get('input[formControlName="username"]')
      .parent()
      .find('.invalid-feedback')
      .should('contain', 'Username is required.');

    cy.get('input[formControlName="email"]')
      .parent()
      .find('.invalid-feedback')
      .should('contain', 'Email is required.');

    cy.get('input[formControlName="street"]')
      .parent()
      .find('.invalid-feedback')
      .should('contain', 'Street is required.');

    cy.get('input[formControlName="city"]')
      .parent()
      .find('.invalid-feedback')
      .should('contain', 'City is required.');

    cy.get('input[formControlName="companyName"]')
      .parent()
      .find('.invalid-feedback')
      .should('contain', 'Company Name is required.');
  });  
});

describe('User Form - Validasi Error pada Field Tertentu', () => {
  it('should display error only on the empty fields', () => {
    mount(UserFormComponent, {
      imports: [FormsModule, ReactiveFormsModule],
    });

    // Masukkan nilai valid pada beberapa field
    cy.get('input[formControlName="name"]').type('John Doe');
    cy.get('input[formControlName="username"]').type('johndoe123');
    cy.get('input[formControlName="email"]').type('john@example.com');

    // Biarkan beberapa field kosong, misalnya street dan city
    cy.get('input[formControlName="street"]').clear();
    cy.get('input[formControlName="city"]').clear();

    // Klik tombol submit
    cy.get('button[type="submit"]').click();

    // Verifikasi bahwa error hanya muncul pada field yang kosong
    cy.get('input[formControlName="street"]')
      .parent()
      .find('.invalid-feedback')
      .should('contain', 'Street is required.');

    cy.get('input[formControlName="city"]')
      .parent()
      .find('.invalid-feedback')
      .should('contain', 'City is required.');

    // Pastikan field yang lain tidak memiliki error
    cy.get('input[formControlName="name"]')
      .parent()
      .find('.invalid-feedback')
      .should('not.exist');
    
    cy.get('input[formControlName="username"]')
      .parent()
      .find('.invalid-feedback')
      .should('not.exist');
    
    cy.get('input[formControlName="email"]')
      .parent()
      .find('.invalid-feedback')
      .should('not.exist');
  });
  
});

describe('User Form - Validasi Input Tidak Valid', () => {
  it('should display validation errors for invalid input', () => {
    mount(UserFormComponent, {
      imports: [FormsModule, ReactiveFormsModule],
    });

    // Input acak yang tidak valid
    cy.get('input[formControlName="name"]').type('J');
    cy.get('input[formControlName="username"]').type('johndoe!@#');
    cy.get('input[formControlName="email"]').type('john@notvalid');
    cy.get('input[formControlName="street"]').type('Some St.!@#');
    cy.get('input[formControlName="city"]').type('New York123');
    cy.get('input[formControlName="companyName"]').type('InvalidCompany@#$');

    // Klik tombol submit
    cy.get('button[type="submit"]').click();

    // Verifikasi bahwa error ditampilkan untuk input yang tidak valid
    cy.get('input[formControlName="name"]')
      .parent()
      .find('.invalid-feedback')
      .should('contain', 'Name must be at least 3 characters.');

    cy.get('input[formControlName="username"]')
      .parent()
      .find('.invalid-feedback')
      .should('contain', 'Username can only contain letters and numbers.');

    cy.get('input[formControlName="email"]')
      .parent()
      .find('.invalid-feedback')
      .should('contain', 'Please enter a valid email address.');

    cy.get('input[formControlName="street"]')
      .parent()
      .find('.invalid-feedback')
      .should('contain', 'Street can only contain letters, numbers, commas, and periods.');

    cy.get('input[formControlName="city"]')
      .parent()
      .find('.invalid-feedback')
      .should('contain', 'City can only contain letters and spaces.');

    cy.get('input[formControlName="companyName"]')
      .parent()
      .find('.invalid-feedback')
      .should('contain', 'Company Name can only contain letters, numbers, periods, and spaces.');
  });
});