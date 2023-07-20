import { faker } from "@faker-js/faker";

it("Create and Delete CP Construction Type Data", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/Lookup/CPConstructionType/Create/Identity");
  cy.EditInputElement("Code", faker.datatype.number(999999));
  cy.EditInputElement("Description", faker.random.words(2));
  cy.clickSaveAndCheckResponse();

  cy.clickDeleteAndCheckResponse();
});
