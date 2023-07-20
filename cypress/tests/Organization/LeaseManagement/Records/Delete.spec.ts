import { faker } from "@faker-js/faker";

it("Delete Lease Management Record", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/Lease/Create");
  cy.EditInputElement("Number", faker.datatype.number(99999999));
  cy.openFlyoutAndSelectRandomValue("Lease Type");
  cy.clickSaveAndCheckResponse();

  cy.wait(1000);
  cy.clickDeleteAndCheckResponse();
});
