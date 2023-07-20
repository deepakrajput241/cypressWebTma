import { faker } from "@faker-js/faker";

it("Copy Record With Required Fields", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/RepairCenter");

  cy.wait(500);
  cy.getButton("Copy").click();
  cy.EditInputElement("Code", faker.datatype.number(999999));
  cy.EditInputElement("Name", faker.random.words(2));
  cy.openFlyoutAndSelectRandomValue("Time Type");
  cy.EditInputElement("WorkOrderPrefix", faker.datatype.number(100000));
  cy.clickSaveAndCheckResponse();
});
