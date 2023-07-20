import { faker } from "@faker-js/faker";

it("Edit CP Funding Source record", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/Lookup/CPFundingSource/Create");
  cy.EditInputElement("Code", faker.datatype.number(99999));
  cy.EditInputElement("Description", faker.random.words(5));
  cy.clickSaveAndCheckResponse();

  cy.getButton("Edit").click();
  cy.EditInputElement("Code", faker.datatype.number(99999));
  cy.EditInputElement("Description", faker.random.words(5));
  cy.clickSaveAfterEditAndCheckResponse();
});
