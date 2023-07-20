import "./commands";

const registerCypressGrep = require("@cypress/grep");
registerCypressGrep();

require("@cypress/xpath");

Cypress.on("uncaught:exception", (err, runnable) => {
  // returning false here prevents Cypress from failing the test
  return false;
});

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to open a slide-over element and add the first item from the table.
       * @example cy.addFirstItemFromSlideOverTable('Add Repair Center')
       */
      addFirstItemFromSlideOverTable(
        openSlideOverLinkText: string,
        addItemButtonText: string
      ): Chainable<JQuery<HTMLElement>>;

      /**
       * Custom command to select DOM element by data-cy attribute.
       * @example cy.dataCy('greeting')
       */
      addRepairCenter(): Chainable<JQuery<HTMLElement>>;

      /**
       * Custom command to make a POST to the API to create an item.
       * @example cy.apiCreate("/Equipment", {name: "Blue Truck", type: "Truck"})
       */
      apiCreate(url: string, body: object): Chainable<JQuery<HTMLElement>>;

      /**
       * Custom command to make POST to the API to authenticate and save a bearer token.
       * @example cy.apiLogin('{"loginId": "api","password": "api","clientName": "TMA7 Azure Staging Test"}')
       */
      apiLogin(user: {
        loginId: string;
        password: string;
        clientName: string;
      }): Chainable<JQuery<HTMLElement>>;

      /**
       * Custom command to select DOM element by data-cy attribute.
       * @example cy.dataCy('greeting')
       */
      getButton(buttonname: string): Chainable<JQuery<HTMLElement>>;

      /**
       * Custom command to select DOM element by data-cy attribute.
       * @example cy.dataCy('greeting')
       */
      clickCheckbox(fieldName: string): Chainable<JQuery<HTMLElement>>;

      /**
       * Custom command to click "Save" button and then check for expected successful server response.
       * @example cy.clickSaveAndCheckResponse()
       */
      clickSaveAndCheckResponse(): Chainable<JQuery<HTMLElement>>;

      /**
       * Custom command to select a combobox element by aria label and then uncheck it.
       * @example cy.clearCheckbox('Active')
       */
      clearCheckbox(ariaLabel: string): Chainable<JQuery<HTMLElement>>;

      /**
       * Custom command to select a combobox element by aria label and then clear it.
       * @example cy.clearCombobox('Building')
       */
      clearCombobox(ariaLabel: string): Chainable<JQuery<HTMLElement>>;

      /**
       * Custom command to select a date input element by arial label and then clear it.
       * @example cy.fillDateInput(faker.date.recent().toLocaleDateString('en-US'))
       */
      clearDateInput(ariaLabel: string): Chainable<JQuery<HTMLElement>>;

      /**
       * Custom command to select an input element by aria label and then clear it.
       * @example cy.clearInput('Facility')
       */
      clearInput(ariaLabel: string): Chainable<JQuery<HTMLElement>>;

      /**
       * Custom command to select an input element that is the first child of a parent <numeric-text-box/> by aria label of the parent, and then clear it.
       * @example cy.clearNumericTextBoxInput('Payment Amount')
       */
      clearNumericTextBoxInput(
        ariaLabel: string
      ): Chainable<JQuery<HTMLElement>>;

      /**
       * Custom command to select a select element by aria label and then clear it.
       * @example cy.clearSelect('Type')
       */
      clearSelect(ariaLabel: string): Chainable<JQuery<HTMLElement>>;

      /**
       * Custom command to select a textarea element by aria label and then clear it.
       * @example cy.clearTextarea('Comments')
       */
      clearTextarea(ariaLabel: string): Chainable<JQuery<HTMLElement>>;

      // edit
      /**
       * Custom command to clear a combobox element selected by aria label and then fill it with the value.
       * @example cy.editCombobox('Technician ID', '9004')
       */
      editCombobox(
        ariaLabel: string,
        value: string
      ): Chainable<JQuery<HTMLElement>>;

      /**
       * Custom command to clear an input element selected by aria label and then fill it with the value.
       * @example cy.editInput('Description', 'This is a test.')
       */
      editInput(
        ariaLabel: string,
        value: string
      ): Chainable<JQuery<HTMLElement>>;

      /**
       * Custom command to clear a Numeric Text Box element (<numeric-text-box/>) selected by aria label and then fill it with the value.
       * @example cy.editNumericTextBoxInput('Amount', faker.finance.amount(1, 999, 2))
       */
      editNumericTextBoxInput(
        ariaLabel: string,
        value: string
      ): Chainable<JQuery<HTMLElement>>;

      /**
       * Custom command to clear a textarea element selected by aria label and then fill it with the value.
       * @example cy.editTextarea('Comment', 'We need a new comment here in place of an old one.')
       */
      editTextarea(
        ariaLabel: string,
        value: string
      ): Chainable<JQuery<HTMLElement>>;

      /**
       * Custom command to select an input element of type checkbox by aria label and then fill it.
       * @example cy.fillCheckbox('Markup')
       */
      fillCheckbox(ariaLabel: string): Chainable<JQuery<HTMLElement>>;

      /**
       * Custom command to select a combobox element by aria label and then fill it.
       * @example cy.fillCombobox('Building', 'West Practice Facility')
       */
      fillCombobox(
        ariaLabel: string,
        value: string,
        options?: { force: boolean }
      ): Chainable<JQuery<HTMLElement>>;

      /*/
       * Custom command to select a date input element and then fill it with either the provided value or the current date.
       * @example cy.fillDateInput("Authorization Date", faker.date.recent().toLocaleDateString('en-US'))
       * @example cy.fillDateInput("Authorization Date")
       */
      fillDateInput(
        ariaLabel: string,
        value?: string
      ): Chainable<JQuery<HTMLElement>>;

      /**
       * Custom command to select an input element by aria label and then fill it.
       * @example cy.fillInput('Facility', "Administrative")
       */
      fillInput(
        ariaLabel: string,
        value: string
      ): Chainable<JQuery<HTMLElement>>;

      /**
       * Custom command to select an input element that is the first child of a parent <numeric-text-box/> by aria label of the parent, and then fill it.
       * @example cy.fillNumericTextBoxInput('Facility', "Administrative")
       */
      fillNumericTextBoxInput(
        ariaLabel: string,
        value: string
      ): Chainable<JQuery<HTMLElement>>;

      /**
       * Custom command to select an input element of type radio by value and check it.
       * @example cy.fillRadio("MeterOther", "Other")
       */
      fillRadio(name: string, value: string): Chainable<JQuery<HTMLElement>>;

      /**
       * Custom command to select a select element by aria label and then fill it.
       * @example cy.fillSelect('Type', 'Equipment')
       */
      fillSelect(
        ariaLabel: string,
        value: string
      ): Chainable<JQuery<HTMLElement>>;

      /**
       * Custom command to select a textarea element by aria label and then fill it.
       * @example cy.fillTextarea('Comments', 'This is a high priority')
       */
      fillTextarea(
        ariaLabel: string,
        value: string
      ): Chainable<JQuery<HTMLElement>>;

      /**
       * Custom command to select a time input element and then fill it with the provided value.
       * @example cy.fillTimeInput(faker.date.recent().toLocaleDateString('en-US'))
       */
      fillTimeInput(
        ariaLabel: string,
        value: string
      ): Chainable<JQuery<HTMLElement>>;

      

      /**
       * Custom command to add a set wait period.
       * @example cy.setWait()
       */
      setWait(): Chainable<JQuery<HTMLElement>>;

      /**
       * Custom command to select DOM element by data-cy attribute.
       * @example cy.dataCy('greeting')
       */
      EditInputElement(
        fieldName: string,
        value: any
      ): Chainable<JQuery<HTMLElement>>;

      /**
       * Custom command to select DOM element by data-cy attribute.
       * @example cy.dataCy('greeting')
       */
      getButtonWithText(buttonName: string): Chainable<JQuery<HTMLElement>>;

      /**
       * Custom command to select DOM element by data-cy attribute.
       * @example cy.dataCy('greeting')
       */
      selectRadioBtnById(idValue: string): Chainable<JQuery<HTMLElement>>;

      /**
       * Custom command to select DOM element by data-cy attribute.
       * @example cy.dataCy('greeting')
       */
      openFlyoutAndSelectRandomValue(
        nameField: string
      ): Chainable<JQuery<HTMLElement>>;

      /**
       * Custom command to select DOM element by data-cy attribute.
       * @example cy.dataCy('greeting')
       */
      EditRepairCenter(): Chainable<JQuery<HTMLElement>>;

      /**
       * Custom command to select DOM element by data-cy attribute.
       * @example cy.dataCy('greeting')
       */
      selectCheckBoxFromGrid(xpath: string): Chainable<JQuery<HTMLElement>>;

      /**
       * Custom command to select DOM element by data-cy attribute.
       * @example cy.dataCy('greeting')
       */
      clickAndCheckAlert(
        element: string,
        alert: string
      ): Chainable<JQuery<HTMLElement>>;

      /**
       * Custom command to select DOM element by data-cy attribute.
       * @example cy.dataCy('greeting')
       */
      clickSaveAndCheckAlert(alert: string): Chainable<JQuery<HTMLElement>>;

      /**
       * Custom command to select DOM element by data-cy attribute.
       * @example cy.dataCy('greeting')
       */
      fillNumericTextBox(
        index: number,
        value: any
      ): Chainable<JQuery<HTMLElement>>;

      /**
       * Custom command to select DOM element by data-cy attribute.
       * @example cy.dataCy('greeting')
       */
      selectRandomCheckBoxFromGrid(
        index: number,
        xpath: string
      ): Chainable<JQuery<HTMLElement>>;

      /**
       * Custom command to select DOM element by data-cy attribute.
       * @example cy.dataCy('greeting')
       */
      login(user: {
        loginId: string;
        password: string;
        clientName: string;
      }): Chainable<JQuery<HTMLElement>>;

      /**
       * Custom command to click delete button and check for expected network response.
       * @example cy.clickDeleteAndCheckResponse()
       */
      clickDeleteAndCheckResponse(): Chainable<JQuery<HTMLElement>>;

      /**
       * Custom command to select DOM element by data-cy attribute.
       * @example cy.dataCy('greeting')
       */
      getCriteria3DotMenu(dropdownName: string): Chainable<JQuery<HTMLElement>>;

      /**
       * Custom command to select DOM element by data-cy attribute.
       * @example cy.dataCy('greeting')
       */
      getCriteriaDropdown(dropdownName: string): Chainable<JQuery<HTMLElement>>;

      /**
       * Custom command to select DOM element by data-cy attribute.
       * @example cy.dataCy('greeting')
       */
      getColumnOnBrowse(columnName: string): Chainable<JQuery<HTMLElement>>;

      /**
       * Custom command to select DOM element by data-cy attribute.
       * @example cy.dataCy('greeting')
       */
      getCriteriaCheckbox(criteriaName: string): Chainable<JQuery<HTMLElement>>;

      /**
       * Custom command to select DOM element by data-cy attribute.
       * @example cy.dataCy('greeting')
       */
      clickAndCheckResponse(
        element: string,
        method: string,
        url: string,
        code: number,
        bodyKey?: string,
        bodyValue?: string | boolean
      ): Chainable<JQuery<HTMLElement>>;
    }
  }
}
