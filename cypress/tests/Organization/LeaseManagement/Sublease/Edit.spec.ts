import { faker } from "@faker-js/faker";

it("Edit Sublease", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/SubLease/Create");
  cy.openFlyoutAndSelectRandomValue("Lease #");
  cy.EditInputElement("StatusNote", faker.random.words(1));
  cy.clickSaveAndCheckResponse();

  cy.wait(500);
  cy.getButton("Edit").click();
  cy.openFlyoutAndSelectRandomValue("TenantId");
  cy.clickSaveAfterEditAndCheckResponse();
});
