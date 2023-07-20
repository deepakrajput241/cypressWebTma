import { faker } from "@faker-js/faker";

const data = { copiedFrom: "Accounts" };

it("Copy System form attribute record", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/CustomFormAttribute");

  cy.wait(500);
  cy.getButton("Copy").click();
  cy.EditInputElement("WindowName", faker.random.words(2));
  cy.clickSaveAndCheckResponse();
});
