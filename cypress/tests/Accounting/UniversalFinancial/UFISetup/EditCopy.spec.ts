import { faker } from "@faker-js/faker";

describe("edit, copy UFI Setup", () => {
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/UFISetup");
  });

  it("should edit UFI Setup", () => {
    // this page loads slowly
    cy.contains("Edit", { timeout: 8000 }).click();
    cy.editInput("Code", faker.random.numeric(7));
    cy.clickSaveAndCheckResponse();
  });

  it("should copy UFI Setup, and then delete it", () => {
    // this page loads slowly
    cy.contains("Copy", { timeout: 8000 }).click();
    cy.editInput("Code", faker.random.numeric(7));
    cy.clickSaveAndCheckResponse();

    cy.clickDeleteAndCheckResponse();
  });
});
