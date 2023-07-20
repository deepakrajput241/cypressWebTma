import { faker } from "@faker-js/faker";

it("Delete Utility Rate Schedule record", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/UtilityRateSchedule/Create");
  cy.EditInputElement("Code", faker.datatype.number(9999999));
  cy.EditInputElement("Name", faker.random.words(5));
  cy.openFlyoutAndSelectRandomValue("Service");
  cy.openFlyoutAndSelectRandomValue("Contractor");
  cy.clickSaveAndCheckResponse();

  cy.wait(1000);
  cy.clickDeleteAndCheckResponse();
});
