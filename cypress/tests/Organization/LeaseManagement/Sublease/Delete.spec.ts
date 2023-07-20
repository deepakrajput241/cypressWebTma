import { faker } from "@faker-js/faker";

it("Delete Sublease", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/SubLease/Create");
  cy.openFlyoutAndSelectRandomValue("Lease #");
  cy.EditInputElement("StatusNote", faker.random.words(1));
  cy.clickSaveAndCheckResponse();

  cy.wait(1000);
  cy.clickDeleteAndCheckResponse();
});
