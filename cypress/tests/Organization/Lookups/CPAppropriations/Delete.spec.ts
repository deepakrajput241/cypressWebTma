import { faker } from "@faker-js/faker";

it("Create and delete CP Appropriation Data", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/Lookup/CPAppropriation/Create");
  cy.EditInputElement("Code", faker.datatype.number(99999999));
  cy.EditInputElement("Description", faker.random.words(5));
  cy.clickSaveAndCheckResponse();

  cy.clickDeleteAndCheckResponse();
});
