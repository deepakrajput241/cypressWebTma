import { faker } from "@faker-js/faker";

it("Edit Master Inspection Check Record", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/MasterInspectionCheck/Create");
  cy.editTextarea("Description", faker.random.words(5));
  cy.clickSaveAndCheckResponse();

  cy.getButton("Edit").click();
  cy.fillCheckbox("Pass / Fail");
  cy.fillCheckbox("Reading");
  cy.fillCheckbox("Rating");
  cy.fillCheckbox("Comments");
  cy.editTextarea("Description", faker.random.words(5));
  cy.clickSaveAfterEditAndCheckResponse();
});
