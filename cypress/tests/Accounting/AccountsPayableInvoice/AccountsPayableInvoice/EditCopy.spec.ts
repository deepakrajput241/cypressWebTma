import { faker } from "@faker-js/faker";

describe("edit, copy Accounts Payable Invoice", () => {
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/Invoice");
  });

  it("should edit Accounts Payable Invoice", () => {
    cy.contains("Edit").click();
    cy.editInput("Reference #", faker.random.numeric(7));
    cy.clickSaveAndCheckResponse();
  });

  it.only("should copy Accounts Payable Invoice", () => {
    // we have to skip first record loaded because it is not readily copyable
    cy.contains("Next").click();
    cy.setWait();
    cy.contains("Copy").click();
    cy.editInput("Invoice #", faker.random.numeric(7));
    cy.clickSaveAndCheckResponse();

    cy.clickDeleteAndCheckResponse();
  });
});
