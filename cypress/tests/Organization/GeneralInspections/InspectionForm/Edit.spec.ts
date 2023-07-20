import { faker } from "@faker-js/faker";

it("Edit Inspection Form", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/GeneralInspectionForm/Create");
  cy.EditInputElement("Code", faker.datatype.number(9999999));
  cy.EditInputElement("Name", faker.random.words(2));
  cy.openFlyoutAndSelectRandomValue("Repair Center Code");
  cy.openFlyoutAndSelectRandomValue("Task Code");
  cy.clickSaveAndCheckResponse();

  cy.getButton("Edit").click();
  cy.EditInputElement("Code", faker.datatype.number(9999999));
  cy.EditInputElement("Name", faker.random.words(2));
  cy.clickSaveAfterEditAndCheckResponse();
});
