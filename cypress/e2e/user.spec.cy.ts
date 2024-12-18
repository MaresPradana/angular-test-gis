describe('User Management', () => {
  it('should display the list of users', () => {
    // Mengunjungi URL aplikasi
    cy.visit('http://localhost:4200/user-list');

    // Memastikan bahwa tabel user ditampilkan
    cy.get('table').should('be.visible');

    // Memastikan bahwa tabel memiliki baris
    cy.get('table tbody tr').should('have.length.greaterThan', 0);
  });

  it('should display error hint when add', () => {
    cy.visit('http://localhost:4200/user-list');

    // Klik tombol tambah user
    cy.contains('Add User').click();
    cy.get('table').should('not.exist');
    cy.get('form').should('exist');
    
    // Submit form
    cy.get('button[type="submit"]').click();

    // Memastikan bahwa validasi berjalan
    cy.get('div').contains('Name is required').should('be.visible');
    cy.get('div').contains('Username is required').should('be.visible');
    cy.get('div').contains('Email is required').should('be.visible');
    cy.get('div').contains('Street is required').should('be.visible');
    cy.get('div').contains('City is required').should('be.visible');
    cy.get('div').contains('Company Name is required').should('be.visible');
  });

  it('should display error hint when edit', () => {
    cy.visit('http://localhost:4200/user-list');

    // Klik tombol tambah user
    cy.contains('Edit').click();
    cy.get('table').should('not.exist');
    cy.get('form').should('exist');

    // Clear form user
    cy.get('input[formcontrolname="name"]').clear();
    cy.get('input[formcontrolname="username"]').clear();
    cy.get('input[formcontrolname="email"]').clear();
    cy.get('input[formcontrolname="street"]').clear();
    cy.get('input[formcontrolname="city"]').clear();
    cy.get('input[formcontrolname="companyName"]').clear();
    
    // Submit form
    cy.get('button[type="submit"]').click();

    // Memastikan bahwa validasi berjalan
    cy.get('div').contains('Name is required').should('be.visible');
    cy.get('div').contains('Username is required').should('be.visible');
    cy.get('div').contains('Email is required').should('be.visible');
    cy.get('div').contains('Street is required').should('be.visible');
    cy.get('div').contains('City is required').should('be.visible');
    cy.get('div').contains('Company Name is required').should('be.visible');
  });

  it('should add a new user', () => {
    cy.visit('http://localhost:4200/user-list');

    // Klik tombol tambah user
    cy.contains('Add User').click();
    cy.get('table').should('not.exist');
    cy.get('form').should('exist');

    // Isi form user
    cy.get('input[formcontrolname="name"]').type('John Doe');
    cy.get('input[formcontrolname="username"]').type('johndoe');
    cy.get('input[formcontrolname="email"]').type('johndoe@example.com');
    cy.get('input[formcontrolname="street"]').type('L.A. Sucipto');
    cy.get('input[formcontrolname="city"]').type('Malang');
    cy.get('input[formcontrolname="companyName"]').type('PT. Angin Ribut');
    
    // Submit form
    cy.get('button[type="submit"]').click();

    // Memastikan bahwa user baru muncul di tabel
    cy.get('form').should('not.exist');
    cy.get('table tbody').contains('td', 'Leanne Graham').should('be.visible');
  });

  it('should edit a user', () => {
    cy.visit('http://localhost:4200/user-list');

    // Klik tombol tambah user
    cy.contains('Edit').click();
    cy.get('table').should('not.exist');
    cy.get('form').should('exist');

    // Isi form user
    cy.get('input[formcontrolname="name"]').clear().type('John Doe');
    cy.get('input[formcontrolname="username"]').clear().type('johndoe');
    cy.get('input[formcontrolname="email"]').clear().type('johndoe@example.com');
    cy.get('input[formcontrolname="street"]').clear().type('L.A. Sucipto');
    cy.get('input[formcontrolname="city"]').clear().type('Malang');
    cy.get('input[formcontrolname="companyName"]').clear().type('PT. Angin Ribut');
    
    // Submit form
    cy.get('button[type="submit"]').click();

    // Memastikan bahwa user baru muncul di tabel
    cy.get('form').should('not.exist');
    cy.get('table tbody').contains('td', 'Leanne Graham').should('be.visible');
  });

  it('should show user details in a modal', () => {
    cy.visit('http://localhost:4200/user-list');

    // Klik tombol lihat detail user
    cy.contains('Lihat Detail').first().click();

    // Memastikan bahwa modal muncul
    cy.get('.modal').should('be.visible');

    // Memastikan bahwa modal menampilkan nama user
    cy.get('.modal').contains('Leanne Graham').should('be.visible');

    // Menutup dialog
    cy.contains('Close').first().click();
    cy.get('.modal').should('not.exist');
  });

  it('should show confirmation dialog', () => {
    cy.visit('http://localhost:4200/user-list');

    // Klik tombol lihat detail user
    cy.contains('Delete').first().click();

    // Memastikan bahwa modal muncul
    cy.get('.modal').should('be.visible');

    // Memastikan bahwa modal menampilkan nama user
    cy.get('.modal').contains('Dialog Confirmation').should('be.visible');

    // Klik hapus user
    cy.contains('Yes').first().click();

    // Memastikan bahwa modal menampilkan nama user
    cy.get('.modal').should('not.exist');
  });

  it('should close confirmation dialog', () => {
    cy.visit('http://localhost:4200/user-list');

    // Klik tombol lihat detail user
    cy.contains('Delete').first().click();

    // Memastikan bahwa modal muncul
    cy.get('.modal').should('be.visible');

    // Memastikan bahwa modal menampilkan nama user
    cy.get('.modal').contains('Dialog Confirmation').should('be.visible');

    // Klik hapus user
    cy.contains('Cancel').first().click();

    // Memastikan bahwa modal menampilkan nama user
    cy.get('.modal').should('not.exist');
  });

  it('should close form when cancel add', () => {
    cy.visit('http://localhost:4200/user-list');

    // Klik tombol tambah user
    cy.contains('Add User').click();
    cy.get('table').should('not.exist');
    cy.get('form').should('exist');
    
    // Cancel form
    cy.contains('Cancel').click();
    cy.get('form').should('not.exist');
    cy.get('table').should('exist');
  });

  it('should close form when cancel edit', () => {
    cy.visit('http://localhost:4200/user-list');

    // Klik tombol tambah user
    cy.contains('Edit').click();
    cy.get('table').should('not.exist');
    cy.get('form').should('exist');
    
    // Cancel form
    cy.contains('Cancel').click();
    cy.get('form').should('not.exist');
    cy.get('table').should('exist');
  });
});
  