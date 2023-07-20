import { faker } from "@faker-js/faker";

it("Edit Region with Required fields", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/Region/Create");
  cy.EditInputElement("Name", faker.random.words(2));
  cy.EditInputElement("Code", faker.datatype.number(99999));
  cy.clickSaveAndCheckResponse();

  cy.wait(1000);
  cy.contains("a", "Identity").click();
  cy.getButton("Edit").click();
  cy.EditInputElement("Name", faker.random.words(2));
  cy.EditInputElement("Code", faker.datatype.number(99999));
  cy.clickSaveAfterEditAndCheckResponse();
});
