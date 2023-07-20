import { faker } from "@faker-js/faker";

describe("edit, copy Account Receivable Invoice", () => {
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/ARInvoice");
  });

  it("Edit Account Receivable Invoice", () => {
    cy.contains("Edit").click();
    cy.editInput("Invoice #", faker.random.numeric(7));
    cy.clickSaveAndCheckResponse();
  });

  it("Copy Accounts Receivable Invoice", () => {
    cy.contains("Copy").click();
    cy.editInput("Invoice #", faker.random.numeric(7));
    cy.clickSaveAndCheckResponse();

    // Accounts Receivable Invoice does not have a delete function
  });
});
