import { faker } from "@faker-js/faker";

it("Create Lock Shop with require field", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/LockShop/Create");
  cy.EditInputElement("Code", faker.datatype.number(9999999));
  cy.EditInputElement("Description", faker.random.words(2));
  cy.selectRepairCenter();
  cy.clickSaveAndCheckResponse();
});
