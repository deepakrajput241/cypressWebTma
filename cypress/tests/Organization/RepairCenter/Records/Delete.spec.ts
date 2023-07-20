import { faker } from "@faker-js/faker";

it("Delete Record", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/RepairCenter/Create");
  cy.EditInputElement("Code", faker.datatype.number(1000));
  cy.EditInputElement("Name", faker.random.word());
  cy.openFlyoutAndSelectRandomValue("Time Type");
  cy.EditInputElement("WorkOrderPrefix", faker.datatype.number(100000));
  cy.fillNumericTextBox(0, faker.datatype.number(100));
  cy.clickSaveAndCheckResponse();

  cy.wait(1000);
  cy.clickDeleteAndCheckResponse();
});
