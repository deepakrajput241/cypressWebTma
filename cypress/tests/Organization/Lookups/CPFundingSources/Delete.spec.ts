import { faker } from "@faker-js/faker";

it("Create and Delete CP Funding Source Data", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/Lookup/CPFundingSource/Create");
  cy.EditInputElement("Code", faker.datatype.number(99999));
  cy.EditInputElement("Description", faker.random.words(5));
  cy.clickSaveAndCheckResponse();

  cy.wait(500);
  cy.clickDeleteAndCheckResponse();
});
