import { faker } from "@faker-js/faker";

it("Delete Requestor record", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/Requestor/Create");
  cy.EditInputElement("FirstName", faker.random.words(1));
  cy.EditInputElement("LastName", faker.random.words(1));
  cy.selectRepairCenter();
  cy.clickSaveAndCheckResponse();

  cy.wait(1000);
  cy.contains("a", "Identity").click();
  cy.clickDeleteAndCheckResponse();
});
