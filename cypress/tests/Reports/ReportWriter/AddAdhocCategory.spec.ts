import { faker } from "@faker-js/faker";

it("View Report Writer to add HTML Print", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/Report/Create");
  cy.get("span[ng-bind='WindowTitle']:contains('Report Writer')").should(
    "be.visible"
  );
  cy.EditInputElement("RptTitle", faker.random.words(2));
  cy.fillCombobox("Report Form", "Account Types");
  cy.fillTextarea("Comments", `Auto test${faker.random.words(2)}`);
  cy.fillCombobox("Report Category", "All/Adhoc");
  cy.wait(2000);
  cy.get("a[id='toolbarReportTextFormulaAdd']").click();
  cy.EditInputElement("FieldName", `Auto${faker.random.words(2)}`);
  cy.get("iframe[title='Editable area. Press F10 for toolbar.']")
    .its("0.contentDocument.body")
    .wait(2000)
    .type(
      "' Labor-Hours ' + ' * ' + ' Labor-Charge ' + ' + ' + ' Total Labor Cost '"
    );
  cy.get("a[ng-click='customSave()']").click();
  cy.clickSaveAndCheckResponse();
});
