import { faker } from "@faker-js/faker";

describe("edit, copy UFI Template Setup", () => {
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/UFITemplateSetup");
  });

  it("should edit UFI Template Setup", () => {
    cy.contains("Edit").click();
    cy.editInput("Code", faker.random.numeric(7));
    cy.clickSaveAndCheckResponse();
  });

  it("should copy UFI Template Setup, and then delete it", () => {
    cy.contains("Copy").click();
    cy.editInput("Code", faker.random.numeric(7));
    cy.clickSaveAndCheckResponse();

    cy.clickDeleteAndCheckResponse();
  });
});
