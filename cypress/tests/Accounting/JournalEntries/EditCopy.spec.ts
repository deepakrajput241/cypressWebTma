import { faker } from "@faker-js/faker";

describe("edit, copy Journal Entry", () => {
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/JournalEntry");
  });

  it("should edit Journal Entry", () => {
    cy.contains("Edit").click();
    cy.editNumericTextBoxInput("Amount", faker.finance.amount(1, 999, 2));
    cy.clickSaveAndCheckResponse();
  });

  it("should copy Journal Entry, and then delete it", () => {
    cy.contains("Copy").click();
    cy.editNumericTextBoxInput("Amount", faker.finance.amount(1, 999, 2));
    cy.clickSaveAndCheckResponse();

    cy.setWait();
    cy.clickDeleteAndCheckResponse();
  });
});
