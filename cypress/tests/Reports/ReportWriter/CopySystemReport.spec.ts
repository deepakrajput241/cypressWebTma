import { faker } from "@faker-js/faker";

it("Copy Existing System Report", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/Report/Create");
  cy.EditInputElement("RptTitle", faker.datatype.number(1000));
  cy.fillCombobox("Report Form", "Accounts");
  cy.openFlyoutAndSelectRandomValue("Access by Repair Center");
  cy.openFlyoutAndSelectRandomValue("Report Category");
  cy.fillCombobox("Window Toolbar", "Accounts");
  cy.fillTextarea("Comments", faker.random.words(25));
  cy.clickSaveAndCheckResponse();

  cy.getButton("Copy").click();
  cy.get("input[aria-label='Report Name']").clear();
  cy.EditInputElement("RptTitle", faker.random.words(2));
  cy.fillCombobox("Report Form", "Account Types");
  cy.fillTextarea("Comments", faker.random.words(25));
  cy.getButton("Save").click();
  cy.getButton("Delete").click();
});
