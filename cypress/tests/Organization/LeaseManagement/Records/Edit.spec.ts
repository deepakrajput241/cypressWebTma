import { faker } from "@faker-js/faker";

it("Edit Lease Management Record", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/Lease/Create/Identity");
  cy.EditInputElement("Number", faker.datatype.number(99999999));
  cy.openFlyoutAndSelectRandomValue("Lease Type");
  cy.clickSaveAndCheckResponse();

  cy.wait(500);
  cy.getButton("Edit").click();
  cy.EditInputElement("Number", faker.datatype.number(9999999));
  cy.openFlyoutAndSelectRandomValue("Lease Type");
  cy.clickSaveAfterEditAndCheckResponse();
});
