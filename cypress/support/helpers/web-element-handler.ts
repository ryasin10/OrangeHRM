/**
 * WebElementHandler
 * Groups reusable web element actions and assertions.
 */
export default class WebElementHandler {
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
   * Verifies that an element has the expected value.
   * @param {string} locator - the element locator
   * @param {string} value - the expected value
   */
  static verifyValue(locator: string, value: string) {
    cy.get(locator).should("have.value", value);
  }

  /**
   * Verifies that an element contains the expected text.
   * @param {string} locator - the element locator
   * @param {string} value - the expected text
   */
  static verifyText(locator: string, value: string) {
    cy.get(locator).should("contain.text", value);
  }

  /**
   * Verifies that a checkbox or radio button is checked.
   * @param {string} locator - the element locator
   */
  static verifyChecked(locator: string) {
    cy.get(locator).should("be.checked");
  }
}
