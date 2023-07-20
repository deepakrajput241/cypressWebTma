import { faker } from "@faker-js/faker";

it("Copy Report", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/Report");

  cy.getButton("Copy").click();
  cy.EditInputElement("RptTitle", faker.random.words(2));
  cy.fillCombobox("Window Toolbar", 1);
  cy.clickSaveAndCheckResponse();
});
