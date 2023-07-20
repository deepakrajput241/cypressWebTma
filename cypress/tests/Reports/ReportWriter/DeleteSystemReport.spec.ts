import { faker } from "@faker-js/faker";

it("Delete Existing System Report", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/Report/Create");
  cy.EditInputElement("RptTitle", faker.datatype.number(99999));
  cy.fillCombobox("Report Form", "Accounts");
  cy.openFlyoutAndSelectRandomValue("Access by Repair Center");
  cy.openFlyoutAndSelectRandomValue("Report Category");
  cy.fillCombobox("Window Toolbar", "Accounts");
  cy.fillTextarea("Comments", faker.random.words(25));
  cy.clickSaveAndCheckResponse();

  cy.clickDeleteAndCheckResponse();
});
