import { faker } from "@faker-js/faker";

it("Delete Utility Transformer record", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/UtilityTransformer/Create");
  cy.EditInputElement("Code", faker.datatype.number(99999999));
  cy.EditInputElement("Description", faker.random.words(2));
  cy.fillNumericTextBox(0, faker.datatype.number(1000));
  cy.fillNumericTextBox(1, faker.datatype.number(1000));
  cy.EditInputElement("Location", faker.address.city());
  cy.editTextarea("Comment", faker.random.words(5));
  cy.clickSaveAndCheckResponse();

  cy.clickDeleteAndCheckResponse();
});
