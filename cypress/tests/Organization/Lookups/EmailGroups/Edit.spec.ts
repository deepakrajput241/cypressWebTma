import { faker } from "@faker-js/faker";

it("Edit Email Groups record", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/Lookup/EmailGroup/Create");
  cy.EditInputElement("Code", faker.datatype.number(9999999));
  cy.EditInputElement("Description", faker.random.words(2));
  cy.clickSaveAndCheckResponse();

  cy.getButton("Edit").click();
  cy.EditInputElement("Code", faker.datatype.number(9999999));
  cy.EditInputElement("Description", faker.random.words(2));
  cy.clickSaveAfterEditAndCheckResponse;
});
