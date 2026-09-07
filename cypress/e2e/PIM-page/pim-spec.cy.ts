import { faker } from "@faker-js/faker";

describe("PIM Page Test", () => {
  it("TC11 - Create employee and verify information", () => {
    const employeeId = faker.string.numeric(6);
    const username = `reem${faker.string.numeric(5)}`;

    cy.visit(
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
    );

    cy.get(".oxd-input-group").eq(0).find("input").type("Admin");
    cy.get(".oxd-input-group").eq(1).find("input").type("admin123");
    cy.get('button[type="submit"]').click();

    cy.intercept("GET", "**/api/v2/pim/employees*").as("pim");
    cy.get(".oxd-main-menu-item").contains("PIM").click();
    cy.wait("@pim").its("response.statusCode").should("eq", 200);

    cy.get(".oxd-button").contains("Add").click();
    cy.contains("Add Employee").should("be.visible");

    cy.fixture("employee").then((employee) => {
      cy.get('input[name="firstName"]').type(employee.firstName);
      cy.get('input[name="middleName"]').type(employee.middleName);
      cy.get('input[name="lastName"]').type(employee.lastName);
      cy.contains("label", "Employee Id")
        .parents(".oxd-input-group")
        .find("input")
        .clear()
        .type(employeeId);

      cy.get(".oxd-switch-input").click();
      cy.get(".oxd-input--active").eq(5).type(username);
      cy.get('input[type="password"]').eq(0).type(employee.password);
      cy.get('input[type="password"]').eq(1).type(employee.password);

      cy.intercept("POST", "**/api/v2/pim/employees").as("createEmployee");
      cy.intercept("GET", "**/api/v2/pim/employees/*/personal-details").as(
        "personalDetails",
      );
      cy.get('button[type="submit"]').contains("Save").click();
      cy.wait("@createEmployee").its("response.statusCode").should("eq", 200);

      cy.url({ timeout: 10000 }).should("include", "/pim/viewPersonalDetails/");
      cy.wait("@personalDetails").its("response.statusCode").should("eq", 200);

      cy.contains("label", "Employee Full Name")
        .parents(".oxd-input-group")
        .find("input")
        .eq(0)
        .should("have.value", employee.firstName);

      cy.contains("label", "Employee Full Name")
        .parents(".oxd-input-group")
        .find("input")
        .eq(1)
        .should("have.value", employee.middleName);

      cy.contains("label", "Employee Full Name")
        .parents(".oxd-input-group")
        .find("input")
        .eq(2)
        .should("have.value", employee.lastName);

      cy.contains("label", "Employee Id")
        .parents(".oxd-input-group")
        .find("input")
        .should("have.value", employeeId);

      cy.contains("label", "Other Id")
        .parents(".oxd-input-group")
        .find("input")
        .clear()
        .type(employee.otherId);

      cy.contains("label", "Driver's License Number")
        .parents(".oxd-input-group")
        .find("input")
        .type(employee.driversLicenseNumber);

      cy.contains("label", "License Expiry Date")
        .parents(".oxd-input-group")
        .find(".oxd-date-input input")
        .type(employee.licenseExpiryDate);

      cy.contains("label", "Nationality")
        .parents(".oxd-input-group")
        .find(".oxd-select-text")
        .click({ force: true });

      cy.get(".oxd-select-dropdown")
        .contains(employee.nationality)
        .click({ force: true });
      cy.contains("label", "Date of Birth")
        .parents(".oxd-input-group")
        .find(".oxd-date-input input")
        .type(employee.dateOfBirth);

      cy.contains("label", "Marital Status")
        .parents(".oxd-input-group")
        .find(".oxd-select-text")
        .click();

      cy.get(".oxd-select-dropdown").contains(employee.maritalStatus).click();

      cy.contains("label", "Gender")
        .parents(".oxd-input-group")
        .find(".oxd-radio-wrapper")
        .contains(employee.gender)
        .click({ force: true });

      cy.intercept("PUT", "**/api/v2/pim/employees/*/personal-details").as(
        "savePersonalDetails",
      );
      cy.get(".oxd-button--secondary").eq(0).contains("Save").click();

      cy.wait("@savePersonalDetails")
        .its("response.statusCode")
        .should("eq", 200);

      cy.get(".oxd-userdropdown-tab").click();
      cy.contains("a", "Logout").click();

      cy.url().should("include", "/auth/login");
      cy.get(".oxd-input-group").eq(0).find("input").type(username);
      cy.get(".oxd-input-group").eq(1).find("input").type(employee.password);
      cy.get(".orangehrm-login-button").click();
      cy.get(".oxd-userdropdown-tab").should("be.visible");

      cy.intercept("GET", "**/api/v2/pim/employees/*/personal-details").as(
        "myInfoDetails",
      );
      cy.get(".oxd-main-menu-item").contains("My Info").click();
      cy.wait("@myInfoDetails").its("response.statusCode").should("eq", 200);

      cy.contains("label", "Employee Full Name")
        .parents(".oxd-input-group")
        .find("input")
        .eq(0)
        .should("have.value", employee.firstName);

      cy.contains("label", "Employee Full Name")
        .parents(".oxd-input-group")
        .find("input")
        .eq(1)
        .should("have.value", employee.middleName);

      cy.contains("label", "Employee Full Name")
        .parents(".oxd-input-group")
        .find("input")
        .eq(2)
        .should("have.value", employee.lastName);

      cy.contains("label", "Employee Id")
        .parents(".oxd-input-group")
        .find("input")
        .should("have.value", employeeId);

      cy.contains("label", "Other Id")
        .parents(".oxd-input-group")
        .find("input")
        .should("have.value", employee.otherId);

      cy.contains("label", "Driver's License Number")
        .parents(".oxd-input-group")
        .find("input")
        .should("have.value", employee.driversLicenseNumber);

      cy.contains("label", "License Expiry Date")
        .parents(".oxd-input-group")
        .find(".oxd-date-input input")
        .should("have.value", employee.licenseExpiryDate);

      cy.contains("label", "Nationality")
        .parents(".oxd-input-group")
        .find(".oxd-select-text")
        .should("contain.text", employee.nationality);

      cy.contains("label", "Date of Birth")
        .parents(".oxd-input-group")
        .find(".oxd-date-input input")
        .should("have.value", employee.dateOfBirth);

      cy.contains("label", "Marital Status")
        .parents(".oxd-input-group")
        .find(".oxd-select-text")
        .should("contain.text", employee.maritalStatus);

      cy.contains("label", "Gender")
        .parents(".oxd-input-group")
        .find(".oxd-radio-wrapper")
        .contains(employee.gender)
        .find("input")
        .should("be.checked");
    });
  });
});
