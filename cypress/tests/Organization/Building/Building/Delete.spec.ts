import { faker } from "@faker-js/faker";

it("Delete Building", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/Building/Create");
  cy.EditInputElement("Code", faker.datatype.number(99999999));
  cy.EditInputElement("Name", faker.datatype.number(99999999));
  cy.fillCombobox("Building Type Description", "Auto-Building");
  cy.openFlyoutAndSelectRandomValue("Facility Name");
  cy.clickSaveAndCheckResponse();

  cy.clickDeleteAndCheckResponse();
});
