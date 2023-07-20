import { faker } from "@faker-js/faker";

it("Copy Tenant/Landlord", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/Tenant/1003/Identity");

  cy.wait(500);
  cy.getButton("Copy").click();
  cy.EditInputElement("Code", faker.datatype.number(999999999));
  cy.EditInputElement("Name", faker.random.words(2));
  cy.clickSaveAndCheckResponse();
});
