import { faker } from "@faker-js/faker";

it("Copy Master Inspection Check Record", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/MasterInspectionCheck");

  cy.getButton("Copy").click();
  cy.wait(500);
  cy.fillCheckbox("Pass / Fail");
  cy.fillCheckbox("Reading");
  cy.fillCheckbox("Rating");
  cy.fillCheckbox("Comments");
  cy.editTextarea("Description", faker.random.words(5));
  cy.clickSaveAndCheckResponse();
});
