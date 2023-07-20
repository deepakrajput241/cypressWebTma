import { faker } from "@faker-js/faker";

const data = { copiedFrom: "Accounts" };

it("Edit System form attribute record", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/CustomFormAttribute/Create");
  cy.openFlyoutAndSelectRandomValue("Copied From");
  cy.EditInputElement("WindowName", faker.random.words(2));
  cy.get("input[name='GetData']").click();
  cy.clickSaveAndCheckResponse();

  cy.wait(500);
  cy.getButton("Edit").click();
  cy.EditInputElement("WindowName", faker.random.words(2));
  cy.clickSaveAfterEditAndCheckResponse();
});
