describe('OrangeHRM Login Page Tests', () => {
  const baseUrl = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login';

  beforeEach(() => {
    cy.visit(baseUrl);
  });

  it('TC01 - Check valid login', () => {
    cy.get('.oxd-input-group').eq(0).find('input').type('Admin');
    cy.get('.oxd-input-group').eq(1).find('input').type('admin123');
    cy.get('.orangehrm-login-button').click();
    cy.url().should('eq', 'https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');
  });

  
  it('TC02 - Check invalid username and valid password', () => {
    cy.get('.oxd-input-group').eq(0).find('input').type('wronguser');
    cy.get('.oxd-input-group').eq(1).find('input').type('admin123');
    cy.get('.orangehrm-login-button').click();
    cy.get('.oxd-alert-content-text').should('have.text', 'Invalid credentials');
  });

  
  it('TC03 - Check valid username and invalid password', () => {
    cy.get('.oxd-input-group').eq(0).find('input').type('Admin');
    cy.get('.oxd-input-group').eq(1).find('input').type('wrongpass');
    cy.get('.orangehrm-login-button').click();
    cy.get('.oxd-alert-content').should('contain', 'Invalid credentials');
  });


  it('TC04 - Check invalid username and invalid password', () => {
    cy.get('.oxd-input-group').eq(0).find('input').type('wronguser');
    cy.get('.oxd-input-group').eq(1).find('input').type('wrongpass');
    cy.get('.orangehrm-login-button').click();
    cy.get('.oxd-alert-content-text').should('exist');
  });

  it('TC05 - Check empty username and valid password', () => {
    cy.get('.oxd-input-group').eq(1).find('input').type('admin123');
    cy.get('.orangehrm-login-button').click(); 
    cy.get('.oxd-input-group').eq(0).find('.oxd-input-field-error-message').should('have.text', 'Required');
  });

  it('TC06 - Check valid username and empty password', () => {
    cy.get('.oxd-input-group').eq(0).find('input').type('Admin');
    cy.get('.orangehrm-login-button').click(); 
    cy.get('.oxd-input-group').eq(1).find('.oxd-input-field-error-message').should('have.text', 'Required');
  });

  it('TC07 - Check empty username and empty password', () => {
    cy.get('.orangehrm-login-button').click(); 
    cy.get('.oxd-input-group').eq(0).find('.oxd-input-field-error-message').should('have.text', 'Required');
    cy.get('.oxd-input-group').eq(1).find('.oxd-input-field-error-message').should('have.text', 'Required');
  });

  it('TC08 - Check password case sensitivity', () => {
    cy.get('.oxd-input-group').eq(0).find('input').type('Admin');
    cy.get('.oxd-input-group').eq(1).find('input').type('Admin123');
    cy.get('.orangehrm-login-button').click();
    cy.get('.oxd-alert-content-text').should('have.text', 'Invalid credentials');
  });

  it('TC09 - Check username with leading spaces', () => {
    cy.get('.oxd-input-group').eq(0).find('input').type('   Admin');
    cy.get('.oxd-input-group').eq(1).find('input').type('admin123');
    cy.get('.orangehrm-login-button').click();
    cy.get('.oxd-alert-content-text').should('have.text', 'Invalid credentials');
  });
});