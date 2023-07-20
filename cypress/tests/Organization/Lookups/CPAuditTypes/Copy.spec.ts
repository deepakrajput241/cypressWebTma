import { faker } from "@faker-js/faker";

it("Create and Copy CP Audit Type Data", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/Lookup/CPAuditType/Create");

  cy.wait(500);
  cy.getButton("Copy").click();
  cy.EditInputElement("Code", faker.datatype.number(999999999));
  cy.EditInputElement("Description", faker.random.words(6));
  cy.clickSaveAndCheckResponse();
});
