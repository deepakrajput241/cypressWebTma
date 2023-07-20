import { faker } from "@faker-js/faker";

it("Delete Custodial Task Type Data", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/Lookup/CDTaskType/Create");
  cy.EditInputElement("Code", faker.datatype.number(999999));
  cy.EditInputElement("Description", faker.random.words(5));
  cy.clickSaveAndCheckResponse();

  cy.wait(500);
  cy.clickDeleteAndCheckResponse();
});
