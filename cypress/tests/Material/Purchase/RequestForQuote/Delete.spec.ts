import { faker } from "@faker-js/faker";

const data = {
  account: "1233214566",
  part: "011001",
  vendorCode: "3MMM",
};

it("Delete Request For Quote", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/Quote/Create");
  cy.get("#toolbarAddQuoteItem").click();
  cy.fillCombobox("Account", 2);
  cy.fillCombobox("Part", 2);
  cy.fillNumericTextBox(0, faker.datatype.number(10));
  cy.getButtonWithText("Save").click();
  cy.clickSaveAndCheckResponse();

  cy.wait(500);
  cy.clickDeleteAndCheckResponse();
});
