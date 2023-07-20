import { faker } from "@faker-js/faker";

it("Edit Utility Transformer record", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/UtilityTransformer/Create");
  cy.EditInputElement("Code", faker.datatype.number(99999999));
  cy.EditInputElement("Description", faker.random.words(2));
  cy.fillNumericTextBox(0, faker.datatype.number(1000));
  cy.fillNumericTextBox(1, faker.datatype.number(1000));
  cy.EditInputElement("Location", faker.address.city());
  cy.openFlyoutAndSelectRandomValue("Repair Center");
  cy.clickSaveAndCheckResponse();

  cy.wait(1000);
  cy.getButton("Edit").click();
  cy.EditInputElement("Code", faker.datatype.number(99999999999));
  cy.EditInputElement("Description", faker.random.words(2));
  cy.clickSaveAfterEditAndCheckResponse();
});
