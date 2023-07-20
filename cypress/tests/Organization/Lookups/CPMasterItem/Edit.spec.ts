import { faker } from "@faker-js/faker";

it("Edit Master Item Data", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/Lookup/CPMasterItem/Create");
  cy.EditInputElement("Code", faker.datatype.number(1000000));
  cy.EditInputElement("Description", faker.random.words(6));
  cy.fillNumericTextBox(0, faker.datatype.number(10));
  cy.openFlyoutAndSelectRandomValue("UniFormat 1");
  cy.clickSaveAndCheckResponse();

  cy.wait(500);
  cy.getButton("Edit").click();
  cy.EditInputElement("Code", faker.datatype.number(1000000));
  cy.EditInputElement("Description", faker.random.words(6));
  cy.openFlyoutAndSelectRandomValue("UniFormat 1");
  cy.clickSaveAfterEditAndCheckResponse();
});
