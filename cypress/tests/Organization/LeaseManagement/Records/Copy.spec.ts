import { faker } from "@faker-js/faker";

it("Copy Lease Management Record", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/Lease/1127/Identity");

  cy.getButton("Copy").click();
  cy.EditInputElement("Number", faker.datatype.number(9999999));
  cy.openFlyoutAndSelectRandomValue("Lease Type");
  cy.clickSaveAndCheckResponse();
});
