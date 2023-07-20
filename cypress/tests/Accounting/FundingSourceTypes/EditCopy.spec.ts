import { faker } from "@faker-js/faker";

describe("edit, copy Funding Source Type", () => {
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/CAFundingSourceType");
  });

  it("should edit Funding Source Type", () => {
    cy.contains("Edit").click();
    cy.editInput("Code", faker.random.numeric(7));
    cy.clickSaveAndCheckResponse();
  });

  it("should copy Funding Source Type, and then delete it", () => {
    cy.contains("Copy").click();
    cy.editInput("Code", faker.random.numeric(7));
    cy.setWait();
    cy.editInput("Description", faker.random.words(5));
    cy.clickSaveAndCheckResponse();

    cy.setWait();
    cy.clickDeleteAndCheckResponse();
  });
});
