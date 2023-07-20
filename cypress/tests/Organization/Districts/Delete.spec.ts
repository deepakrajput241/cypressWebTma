import { faker } from "@faker-js/faker";

it("Delete District Records", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/District/Create");
  cy.EditInputElement("Code", faker.datatype.number(9999999));
  cy.EditInputElement("Name", faker.random.words(2));
  cy.openFlyoutAndSelectRandomValue("Region Code");
  cy.clickSaveAndCheckResponse();

  cy.clickDeleteAndCheckResponse();
});
