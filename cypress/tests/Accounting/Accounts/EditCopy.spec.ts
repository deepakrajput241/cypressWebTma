import { faker } from "@faker-js/faker";

describe("edit, copy Account", () => {
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/Account");
  });

  it("should edit Account", () => {
    cy.contains("Edit").click();
    cy.editInput("Name", faker.company.name());
    cy.clickSaveAndCheckResponse();

    cy.clickDeleteAndCheckResponse();
  });

  it("should copy Account, and then delete it", () => {
    cy.contains("Copy").click();
    cy.editInput("Segment 1", faker.random.numeric(4));
    cy.clickSaveAndCheckResponse();

    cy.setWait();
    cy.clickDeleteAndCheckResponse();
  });
});
