import { faker } from "@faker-js/faker";

it("Delete Custodial Inspection Rating Data", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/Lookup/CDInspectionRating/Create");
  cy.EditInputElement("Code", faker.datatype.number(999999));
  cy.EditInputElement("Description", faker.random.words(5));
  cy.clickSaveAndCheckResponse();

  cy.clickDeleteAndCheckResponse();
});
