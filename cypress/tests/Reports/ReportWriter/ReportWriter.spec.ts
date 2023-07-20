import { faker } from "@faker-js/faker";

it("View Report Writer ", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/Report/Create");

  cy.EditInputElement("RptTitle", faker.random.numeric(8));
  cy.fillCombobox("Report Form", "On-Hand Adjustments");
  cy.editTextarea("Description", faker.random.words(5));
  cy.wait(2000);
  cy.get("a[id='toolbarReportTextFormulaAdd']").click();
  cy.EditInputElement("FieldName", faker.random.words(2));
  cy.wait(3000);
  cy.get("iframe[title='Editable area. Press F10 for toolbar.']")
    .its("0.contentDocument.body")
    .wait(2000)
    .type(
      "' Labor-Hours ' + ' * ' + ' Labor-Charge ' + ' + ' + ' Total Labor Cost '"
    );
  cy.get("a[ng-click='customSave()']").should("be.visible").click();
  cy.wait(2000);
  cy.get("a[id='toolbarReportMathFormulaAdd']").click();
  cy.EditInputElement("FieldName", faker.random.words(1));
  cy.wait(2000);
  cy.get("iframe[title='Editable area. Press F10 for toolbar.']")
    .its("0.contentDocument.body")
    .wait(1000)
    .type("[[Quantity]]*[[Unit Cost]]");
  cy.get("a[ng-click='customSave()']").should("be.visible").click();
  cy.clickSaveAndCheckResponse();
});
