import { faker } from "@faker-js/faker";

it("Delete CP Estimate Model record", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/Lookup/CPEstimateModel/Create");
  cy.EditInputElement("Code", faker.datatype.number(99999));
  cy.EditInputElement("Description", faker.random.words(2));
  cy.clickSaveAndCheckResponse();

  cy.wait(500);
  cy.clickDeleteAndCheckResponse();
});
