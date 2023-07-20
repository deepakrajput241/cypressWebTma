import { faker } from "@faker-js/faker";

const data = {
  budgetCode: "1080p",
  creditAccount: "1233214566",
  debitAccount: "1111 2222 3333 4444",
  journalEntryType: "Auto-African",
  repairCenterName: "TMA RC",
  transactionType: "Rental",
};

function fillRequiredFields() {
  cy.fillCombobox("Journal Entry Type", data.journalEntryType);
  cy.fillCombobox("Debit Account", data.debitAccount);
  cy.fillCombobox("Credit Account", data.creditAccount);
  cy.fillNumericTextBoxInput("Amount", faker.finance.amount(1, 999, 2));
  cy.fillSelect("Transaction Type", data.transactionType);
  cy.fillDateInput("Transaction Date");
  cy.fillCombobox("Repair Center Name", data.repairCenterName);
}

describe("add Journal Entries", () => {
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/JournalEntry/Create");
  });

  it("should not add Journal Entries without required fields", () => {
    // missing Journal Entry Type
    fillRequiredFields();
    cy.clearCombobox("Journal Entry Type");
    cy.clickSaveAndCheckAlert("Journal Entry Type is required\r\n");

    // missing Debit Account
    cy.reload();
    fillRequiredFields();
    cy.clearCombobox("Debit Account");
    cy.clickSaveAndCheckAlert("Debit Account is required\r\n");

    // missing Credit Account
    cy.reload();
    fillRequiredFields();
    cy.clearCombobox("Credit Account");
    cy.clickSaveAndCheckAlert("Credit Account is required\r\n");

    // missing Amount
    cy.reload();
    fillRequiredFields();
    cy.clearNumericTextBoxInput("Amount");
    cy.clickSaveAndCheckAlert("Amount is required\r\n");

    // missing Transaction Type
    cy.reload();
    fillRequiredFields();
    cy.clearSelect("Transaction Type");
    cy.clickSaveAndCheckAlert("Transaction Type is required\r\n");

    // missing Transaction Date
    cy.reload();
    fillRequiredFields();
    cy.clearInput("Transaction Date");
    cy.clickSaveAndCheckAlert("Transaction Date is required\r\n");

    // missing Repair Center Name
    cy.reload();
    fillRequiredFields();
    cy.clearCombobox("Repair Center Name");
    cy.clickSaveAndCheckAlert("Repair Center Name is required\r\n");
  });

  it(
    "should add Journal Entry with required fields, and then delete it",
    { tags: "@smoke" },
    () => {
      fillRequiredFields();
      cy.clickSaveAndCheckResponse();

      cy.clickDeleteAndCheckResponse();
    }
  );

  it("should add Journal Entry with all fields, and then delete it", () => {
    cy.fillCombobox("Journal Entry Type", data.journalEntryType);
    cy.fillCombobox("Debit Account", data.debitAccount);
    cy.fillCombobox("Credit Account", data.creditAccount);
    cy.fillNumericTextBoxInput("Amount", faker.finance.amount(1, 999, 2));
    cy.fillSelect("Transaction Type", data.transactionType);
    cy.fillCombobox("Budget Code", data.budgetCode);
    cy.fillDateInput("Transaction Date");
    cy.fillCombobox("Repair Center Name", data.repairCenterName);
    cy.fillInput("Reference #", faker.random.numeric(4));
    cy.fillTextarea("Notes", faker.lorem.sentences(2));
    cy.clickSaveAndCheckResponse();

    cy.clickDeleteAndCheckResponse();
  });
});
