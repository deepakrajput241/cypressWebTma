import { faker } from "@faker-js/faker";

it("Delete Floor Record", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/Floor/Create");
  cy.EditInputElement("Number", faker.datatype.number(9999999));
  cy.openFlyoutAndSelectRandomValue("Building Code");
  cy.openFlyoutAndSelectRandomValue("Type");
  cy.clickSaveAndCheckResponse();

  cy.clickDeleteAndCheckResponse();
});
