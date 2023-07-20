import { faker } from "@faker-js/faker";

it("Edit Key record", { tags: "@smoke" }, () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/Key/Create");
  cy.EditInputElement("Description", faker.random.words(2));
  cy.EditInputElement("No", faker.datatype.number(9999999999));
  cy.clickSaveAndCheckResponse();

  cy.getButton("Edit").click();
  cy.wait(1000);
  cy.EditInputElement("Description", faker.random.words(2));
  cy.EditInputElement("No", faker.datatype.number(9999999999));
  cy.clickSaveAfterEditAndCheckResponse();
});
