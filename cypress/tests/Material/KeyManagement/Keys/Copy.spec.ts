import { faker } from "@faker-js/faker";

it("Copy Key record", { tags: "@smoke" }, () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/Key");
  cy.wait(500);
  cy.getButton("Copy").click();
  cy.EditInputElement("Description", faker.random.words(2));
  cy.EditInputElement("No", faker.datatype.number(9999999999));
  cy.clickSaveAndCheckResponse();
});
