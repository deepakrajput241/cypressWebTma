import { faker } from "@faker-js/faker";

const data = { pCard: "Card111" };

it("Create Pcard Reconcile with required information", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/PCardReconcile/Create");
  cy.get("#toolbarNewQuery").click();
  cy.fillCombobox("P-Card #", 1);
  cy.fillNumericTextBox(0, faker.datatype.number(99));
  cy.fillNumericTextBox(1, faker.datatype.number(10));
  cy.fillNumericTextBox(2, faker.datatype.number(9999));
  cy.fillNumericTextBox(3, faker.datatype.number(9999));
  cy.getButtonWithText("Save").click();
});
