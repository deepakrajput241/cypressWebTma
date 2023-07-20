import { faker } from "@faker-js/faker";

it("Copy Utility Rate Schedule record", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/UtilityRateSchedule");

  cy.wait(500);
  cy.getButton("Copy").click();
  cy.EditInputElement("Code", faker.datatype.number(9999999));
  cy.EditInputElement("Name", faker.random.words(1));
  cy.openFlyoutAndSelectRandomValue("Service");
  cy.openFlyoutAndSelectRandomValue("Contractor");
  cy.clickSaveAndCheckResponse();
});
