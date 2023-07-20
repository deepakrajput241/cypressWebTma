import { faker } from "@faker-js/faker";

it("Delete Part record", { tags: "@smoke" }, () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/Part/Create");
  cy.EditInputElement("Code", faker.datatype.number(9999999));
  cy.EditInputElement("Description", faker.random.words(2));
  cy.openFlyoutAndSelectRandomValue("Type");
  cy.openFlyoutAndSelectRandomValue("Issue Unit");
  cy.openFlyoutAndSelectRandomValue("Order Unit");
  cy.fillNumericTextBox(1, faker.datatype.number({ min: 1, max: 10 }));
  cy.get("input[aria-label='What is a Part ?']").type(faker.random.words(2));
  cy.get("input[aria-label='2nd MFG']").type(faker.random.words(2));
  cy.clickSaveAndCheckResponse();

  cy.clickDeleteAndCheckResponse();
});
