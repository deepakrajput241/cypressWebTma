import { faker } from "@faker-js/faker";

it("Create Report Writer", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/Report/Create");
  cy.EditInputElement("RptTitle", faker.random.words(2));
  cy.fillCombobox("Report Form", "On-Hand Adjustments");
  cy.openFlyoutAndSelectRandomValue("Report Category");
  cy.openFlyoutAndSelectRandomValue("Window Toolbar");
  cy.editTextarea("Description", faker.random.words(5));

  cy.get("#toolbarReportTextFormulaAdd").click();
  cy.EditInputElement("FieldName", faker.random.words(2));
  cy.get("iframe[title='Editable area. Press F10 for toolbar.']")
    .its("0.contentDocument.body")
    .wait(1000)
    .type(
      "' Labor-Hours ' + ' * ' + ' Labor-Charge ' + ' + ' + ' Total Labor Cost '"
    );
  cy.getButtonWithText("Save").click();

  cy.get("#toolbarReportMathFormulaAdd").click();
  cy.EditInputElement("FieldName", faker.random.words(1));
  cy.get("iframe[title='Editable area. Press F10 for toolbar.']")
    .its("0.contentDocument.body")
    .wait(1000)
    .type("[[Quantity]]*[[Unit Cost]]");
  cy.getButtonWithText("Save").click();

  cy.contains("Options").click();
  cy.get("#toolbarReportGroupAdd").click();
  cy.get("input[ng-model='dataItem.selected']").eq(0).click();
  cy.getButtonWithText("Save").click();

  cy.get("#toolbarReportSortAdd").click();
  cy.get("input[ng-model='dataItem.selected']").eq(0).click();
  cy.getButtonWithText("Save").click();

  cy.get("#toolbarReportSummaryAdd").click();
  cy.EditInputElement("SummaryTitle", faker.random.words(1));
  cy.get("select[aria-label='Type']").select("Summary");
  cy.getButtonWithText("Save").click();
  cy.clickSaveAndCheckResponse();
});
