import { faker } from "@faker-js/faker";

const data = {
  vendor: "3MMM",
  transactionType: "Auto-1",
  card: "d111",
};

it("Delete P-Card Transaction", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/PCardTransaction/Create");
  cy.fillCombobox("Vendor", 1);
  cy.fillCombobox("Transaction Type", 1);
  cy.fillCombobox("Card #", 1);
  cy.get("#toolbarAddPCardTransactionDetail").click();
  cy.fillCombobox("Part Code", 1);
  cy.fillNumericTextBox(1, "1");
  cy.editTextarea("Comments", faker.random.words(5));
  cy.getButtonWithText("Save").click();
  cy.clickAndCheckResponse("Save", "POST", "/PCardTransaction/Create*", 200);

  cy.clickDeleteAndCheckResponse("Delete", "/PCardTransaction/Delete/*");
});
