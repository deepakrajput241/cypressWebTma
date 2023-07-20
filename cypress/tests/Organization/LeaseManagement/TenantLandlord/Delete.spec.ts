import { faker } from "@faker-js/faker";

it("Delete Tenant/Landlord", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/Tenant/Create");
  cy.EditInputElement("Code", faker.datatype.number(999999999));
  cy.EditInputElement("Name", faker.random.words(2));
  cy.clickSaveAndCheckResponse();

  cy.clickDeleteAndCheckResponse();
});
