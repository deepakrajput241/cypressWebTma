import { faker } from "@faker-js/faker";

it("Delete Utility Route record", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/UtilityRoute/Create");
  cy.EditInputElement("Code", faker.datatype.number(999999999));
  cy.EditInputElement("Description", faker.random.words(2));
  cy.clickSaveAndCheckResponse();

  cy.clickDeleteAndCheckResponse();
});
