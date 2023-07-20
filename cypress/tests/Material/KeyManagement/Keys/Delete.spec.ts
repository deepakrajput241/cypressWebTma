import { faker } from "@faker-js/faker";

it("Delete Key record", { tags: "@smoke" }, () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/Key/Create");
  cy.EditInputElement("Description", faker.random.words(2));
  cy.EditInputElement("No", faker.datatype.number(9999999999));
  cy.clickSaveAndCheckResponse();

  cy.wait(500);
  cy.clickDeleteAndCheckResponse();
});
