describe('OrangeHRM Login Page Tests', () => {
  const baseUrl = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login';

  beforeEach(() => {
    cy.visit(baseUrl);
  });

  // TC01 - تسجيل دخول صحيح
  it('TC01 - Check valid login', () => {
    cy.get('.oxd-input-group').eq(0).find('input').type('Admin');
    cy.get('.oxd-input-group').eq(1).find('input').type('admin123');
    cy.get('.orangehrm-login-button').click();
    cy.url().should('include', '/dashboard');
  });

  // TC02 - اسم مستخدم خاطئ
  it('TC02 - Check invalid username and valid password', () => {
    cy.get('.oxd-input-group').eq(0).find('input').type('wronguser');
    cy.get('.oxd-input-group').eq(1).find('input').type('admin123');
    cy.get('.orangehrm-login-button').click();
    cy.get('.oxd-alert-content-text').should('have.text', 'Invalid credentials');
  });

  // TC03 - كلمة مرور خاطئة
  it('TC03 - Check valid username and invalid password', () => {
    cy.get('.oxd-input-group').eq(0).find('input').type('Admin');
    cy.get('.oxd-input-group').eq(1).find('input').type('wrongpass');
    cy.get('.orangehrm-login-button').click();
    cy.get('.oxd-alert-content').should('contain', 'Invalid credentials');
  });

  // TC04 - الإثنين خطأ
  it('TC04 - Check invalid username and invalid password', () => {
    cy.get('.oxd-input-group').eq(0).find('input').type('wronguser');
    cy.get('.oxd-input-group').eq(1).find('input').type('wrongpass');
    cy.get('.orangehrm-login-button').click();
    cy.get('.oxd-alert-content-text').should('exist');
  });

  // TC05 - اسم مستخدم فارغ
  it('TC05 - Check empty username and valid password', () => {
    cy.get('.oxd-input-group').eq(1).find('input').type('admin123');
    cy.get('.orangehrm-login-button').click(); // الضغط أولاً
    cy.get('.oxd-input-group').eq(0).find('.oxd-input-field-error-message').should('have.text', 'Required');
  });

  // TC06 - كلمة مرور فارغة
  it('TC06 - Check valid username and empty password', () => {
    cy.get('.oxd-input-group').eq(0).find('input').type('Admin');
    cy.get('.orangehrm-login-button').click(); // الضغط أولاً
    cy.get('.oxd-input-group').eq(1).find('.oxd-input-field-error-message').should('have.text', 'Required');
  });

  // TC07 - الحقلان فارغان
  it('TC07 - Check empty username and empty password', () => {
    cy.get('.orangehrm-login-button').click(); // الضغط أولاً
    cy.get('.oxd-input-group').eq(0).find('.oxd-input-field-error-message').should('have.text', 'Required');
    cy.get('.oxd-input-group').eq(1).find('.oxd-input-field-error-message').should('have.text', 'Required');
  });

  // TC08 - حالة الأحرف في كلمة المرور
  it('TC08 - Check password case sensitivity', () => {
    cy.get('.oxd-input-group').eq(0).find('input').type('Admin');
    cy.get('.oxd-input-group').eq(1).find('input').type('Admin123');
    cy.get('.orangehrm-login-button').click();
    cy.get('.oxd-alert-content-text').should('have.text', 'Invalid credentials');
  });

  // TC09 - مسافات في البداية
  it('TC09 - Check username with leading spaces', () => {
    cy.get('.oxd-input-group').eq(0).find('input').type('   Admin');
    cy.get('.oxd-input-group').eq(1).find('input').type('admin123');
    cy.get('.orangehrm-login-button').click();
    cy.get('.oxd-alert-content-text').should('contain', 'Invalid credentials');
  });
});