/**
 * CommonHelper
 * Groups reusable helper functions shared across different tests.
 */
export default class CommonHelper {
  /**
   * Returns the input-group container for a field using its label text.
   * @param {string} labelText - the visible label text of the field
   */
  static getInputGroup(labelText: string) {
    return cy.contains("label", labelText).parents(".oxd-input-group");
  }

  /**
   * Types a value into the input field associated with the given label.
   * @param {string} labelText - the visible label text of the field
   * @param {string} value - the value to type
   */
  static typeInField(labelText: string, value: string) {
    this.getInputGroup(labelText).find("input").clear().type(value);
  }

  /**
   * Opens the dropdown associated with the given label and selects an option.
   * @param {string} labelText - the visible label text of the dropdown
   * @param {string} optionText - the option text to select
   */
  static selectOption(labelText: string, optionText: string) {
    this.getInputGroup(labelText).find(".oxd-select-text").click();
    cy.get(".oxd-select-dropdown").contains(optionText).click();
  }
}
