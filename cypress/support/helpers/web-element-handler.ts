import { LOCATORS } from "@cypress/support/helpers/constants";

/**
 * WebElementHandler
 * Groups reusable web element actions and assertions.
 */
export default class WebElementHandler {
  /**
   * Returns the input group that contains the given label.
   * @param {string} label - the label text of the field
   */
  static getInputGroup(label: string) {
    return cy.contains(LOCATORS.label, label).parents(LOCATORS.inputGroup);
  }

  /**
   * Types a value in the field identified by its label.
   * @param {string} label - the label text of the field
   * @param {string} value - the value to type
   * @param {string} [selector] - the input selector inside the group
   * @param {boolean} [clear] - whether to clear the field first
   */
  static typeField(
    label: string,
    value: string,
    selector = LOCATORS.input,
    clear = true,
  ) {
    const field = this.getInputGroup(label).find(selector);
    if (clear) field.clear();
    field.type(value, { force: !clear });
  }

  /**
   * Opens a dropdown by its label and selects an option.
   * @param {string} label - the label text of the dropdown
   * @param {string} option - the option text to select
   */
  static selectOption(label: string, option: string) {
    this.getInputGroup(label)
      .find(LOCATORS.selectText)
      .should("be.visible")
      .click({ force: true });

    cy.get(LOCATORS.selectDropdown, { timeout: 10000 })
      .should("be.visible")
      .contains(option)
      .click();
  }

  /**
   * Returns an element using the given locator.
   * @param {string} locator - the locator of the element
   */
  static getElement(locator: string) {
    return cy.get(locator);
  }

  /**
   * Clears an input field and types the given value.
   * @param {string} locator - the locator of the input field
   * @param {string} value - the value to type
   */
  static type(locator: string, value: string) {
    cy.get(locator).clear().type(value);
  }

  /**
   * Clicks an element using the given locator.
   * @param {string} locator - the locator of the element
   */
  static click(locator: string) {
    cy.get(locator).click();
  }

  /**
   * Verifies the value or text of a field identified by its label.
   * @param {string} label - the label text of the field
   * @param {string} selector - the selector inside the input group
   * @param {string} value - the expected value or text
   * @param {"have.value" | "contain.text"} [assertion] - the assertion type
   */
  static verifyField(
    label: string,
    selector: string,
    value: string,
    assertion: "have.value" | "contain.text" = "have.value",
  ) {
    this.getInputGroup(label).find(selector).should(assertion, value);
  }

  /**
   * Verifies that an element is visible or exists.
   * @param {string} locator - the locator of the element
   * @param {"be.visible" | "exist"} [assertion] - the assertion type
   * @param {object} [options] - optional Cypress timeout/log options
   */
  static verifyElement(
    locator: string,
    assertion: "be.visible" | "exist" = "be.visible",
    options?: Partial<Cypress.Loggable & Cypress.Timeoutable>,
  ) {
    return cy.get(locator, options).should(assertion);
  }
}
