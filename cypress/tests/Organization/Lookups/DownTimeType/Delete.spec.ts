import { faker } from "@faker-js/faker";

it("Delete Down Time Type record", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/Lookup/DownTimeType/Create");
  cy.EditInputElement("Code", faker.datatype.number(9999999));
  cy.EditInputElement("Description", faker.random.words(2));
  cy.clickSaveAndCheckResponse();

  cy.clickDeleteAndCheckResponse();
});
