import { faker } from "@faker-js/faker";

it("Copy District", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/District");

  cy.wait(500);
  cy.getButton("Copy").click();
  cy.EditInputElement("Code", faker.datatype.number(9999999));
  cy.EditInputElement("Name", faker.random.words(2));
  cy.openFlyoutAndSelectRandomValue("Region Code");
  cy.clickSaveAndCheckResponse();
});
