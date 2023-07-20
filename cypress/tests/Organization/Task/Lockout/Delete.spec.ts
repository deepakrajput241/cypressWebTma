import { faker } from "@faker-js/faker";

it("Delete Lockout", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/Lockout/Create");
  cy.EditInputElement("Code", faker.datatype.number(999999999999));
  cy.EditInputElement("Name", faker.random.words(2));
  cy.editTextarea("Lock-out Procedure", faker.random.words(5));
  cy.selectRepairCenter();
  cy.clickSaveAndCheckResponse();

  cy.wait(1000);
  cy.contains("a", "Identity").click();
  cy.clickDeleteAndCheckResponse();
});
