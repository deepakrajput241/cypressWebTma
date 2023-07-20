import { faker } from "@faker-js/faker";

it("Search and Copy Master Item Data", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/Lookup/CPMasterItem");

  cy.wait(500);
  cy.getButton("Copy").click();
  cy.EditInputElement("Code", faker.datatype.number(1000000));
  cy.EditInputElement("Description", faker.random.words(6));
  cy.openFlyoutAndSelectRandomValue("UniFormat 1");
  cy.clickSaveAndCheckResponse();
});
