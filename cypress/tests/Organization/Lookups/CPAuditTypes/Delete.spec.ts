import { faker } from "@faker-js/faker";

it("Create and delete CP Audit Type Data", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/Lookup/CPAuditType/Create");
  cy.EditInputElement("Code", faker.datatype.number(999999999));
  cy.EditInputElement("Description", faker.random.words(2));
  cy.clickSaveAndCheckResponse();

  cy.clickDeleteAndCheckResponse();
});
