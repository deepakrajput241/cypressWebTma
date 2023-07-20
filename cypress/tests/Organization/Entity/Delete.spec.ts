import { faker } from "@faker-js/faker";

it("Delete Entity with required fields", function () {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/Entity/Create");
  cy.EditInputElement("Code", faker.datatype.number(9999999));
  cy.EditInputElement("Name", faker.datatype.number(9999999));
  cy.openFlyoutAndSelectRandomValue("Facility Name");
  cy.openFlyoutAndSelectRandomValue("Type Description");
  cy.selectRepairCenter();
  cy.clickSaveAndCheckResponse();

  cy.wait(1000);
  cy.contains("a", "Identity").click();
  cy.clickDeleteAndCheckResponse();
});
