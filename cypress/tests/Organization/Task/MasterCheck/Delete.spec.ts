import { faker } from "@faker-js/faker";

it("Delete Master Check", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/MasterCheck/Create");
  cy.EditInputElement("Code", faker.datatype.number(9999999));
  cy.editTextarea("Description", faker.random.words(5));
  cy.openFlyoutAndSelectRandomValue("Type");
  cy.selectRepairCenter();
  cy.clickSaveAndCheckResponse();

  cy.wait(1000);
  cy.contains("a", "Identity").click();
  cy.clickDeleteAndCheckResponse();
});
