import { faker } from "@faker-js/faker";

it("Delete System form attribute record", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/CustomFormAttribute/Create");
  cy.openFlyoutAndSelectRandomValue("Copied From");
  cy.EditInputElement("WindowName", faker.random.words(2));
  cy.get("input[name='GetData']").click();
  cy.clickSaveAndCheckResponse();

  cy.clickDeleteAndCheckResponse();
});
