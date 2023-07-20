import { faker } from "@faker-js/faker";

it("Copy Floor Record", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/Floor/Create");

  cy.getButton("Copy").click();
  cy.EditInputElement("Number", faker.datatype.number(9999999));
  cy.clickSaveAndCheckResponse();
});
