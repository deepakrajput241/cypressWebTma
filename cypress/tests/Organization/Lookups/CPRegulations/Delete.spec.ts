import { faker } from "@faker-js/faker";

it("Delete CP Regulation Data", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/Lookup/CPRegulation/Create");
  cy.EditInputElement("Code", faker.datatype.number(999999));
  cy.editTextarea("Description", faker.random.words(4));
  cy.openFlyoutAndSelectRandomValue("Regulatory Category Code");
  cy.clickSaveAndCheckResponse();

  cy.clickDeleteAndCheckResponse();
});
