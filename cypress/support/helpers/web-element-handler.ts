/**
 * WebElementHandler
 * Groups reusable web element actions and assertions.
 */
type ElementChain<T extends HTMLElement = HTMLElement> = Cypress.Chainable<
  JQuery<T>
>;

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
   * @param {ElementChain} element - the target element
   * @param {string} value - the expected value
   */
  static verifyValue<T extends HTMLElement>(
    element: ElementChain<T>,
    value: string,
  ) {
    element.should("have.value", value);
  }

  /**
   * Verifies that an element contains the expected text.
   * @param {ElementChain} element - the target element
   * @param {string} value - the expected text
   */
  static verifyText<T extends HTMLElement>(
    element: ElementChain<T>,
    value: string,
  ) {
    element.should("contain.text", value);
  }

  /**
   * Verifies that a checkbox or radio button is checked.
   * @param {ElementChain} element - the target element
   */
  static verifyChecked<T extends HTMLElement>(element: ElementChain<T>) {
    element.should("be.checked");
  }
}
