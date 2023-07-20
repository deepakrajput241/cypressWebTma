import { faker } from "@faker-js/faker";

it("Edit Utility Rate Schedule record", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/UtilityRateSchedule/Create");
  cy.EditInputElement("Code", faker.datatype.number(9999999));
  cy.EditInputElement("Name", faker.random.words(5));
  cy.openFlyoutAndSelectRandomValue("Service");
  cy.openFlyoutAndSelectRandomValue("Contractor");
  cy.clickSaveAndCheckResponse();

  cy.wait(1000);
  cy.getButton("Edit").click();
  cy.EditInputElement("Code", faker.datatype.number(9999999));
  cy.EditInputElement("Name", faker.random.words(1));
  cy.openFlyoutAndSelectRandomValue("Service");
  cy.clickSaveAfterEditAndCheckResponse();
});
