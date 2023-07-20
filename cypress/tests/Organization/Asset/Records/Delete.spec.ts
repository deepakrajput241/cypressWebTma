import { faker } from "@faker-js/faker";

it("Delete Asset Record", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/Asset/Create");
  cy.EditInputElement("Description", faker.random.words(2));
  cy.openFlyoutAndSelectRandomValue("Facility Name");
  cy.openFlyoutAndSelectRandomValue("Type Description");
  cy.selectRepairCenter();
  cy.clickSaveAndCheckResponse();

  cy.wait(1000);
  cy.contains("a", "Identity").click();
  cy.clickDeleteAndCheckResponse();
});
