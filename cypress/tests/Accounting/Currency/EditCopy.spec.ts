import { faker } from "@faker-js/faker";

describe("edit, copy Currency", () => {
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/Currency");
  });

  it("should edit Currency", () => {
    cy.contains("Edit").click();
    cy.editInput("Currency ID", faker.random.numeric(7));
    cy.clickSaveAndCheckResponse();
  });

  it("should copy Currency", () => {
    cy.contains("Copy").click();
    cy.editInput("Currency ID", faker.random.numeric(7));
    cy.editInput("Description", faker.lorem.words(3));
    cy.clickSaveAndCheckResponse();

    cy.clickDeleteAndCheckResponse();
  });
});
