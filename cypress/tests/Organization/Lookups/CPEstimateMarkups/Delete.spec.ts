import { faker } from "@faker-js/faker";

it("Delete CP Estimate Markup Data", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/Lookup/CPEstimateMarkup/Create");
  cy.EditInputElement("Code", faker.datatype.number(9999999));
  cy.EditInputElement("Description", faker.random.words(2));
  cy.fillNumericTextBox(0, faker.datatype.number(100));
  cy.clickSaveAndCheckResponse();

  cy.clickDeleteAndCheckResponse();
});
