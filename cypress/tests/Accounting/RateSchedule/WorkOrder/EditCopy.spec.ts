import { faker } from "@faker-js/faker";

describe("edit, copy Rate Schedule", () => {
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/RateSchedule");
  });

  it("should edit Rate Schedule", () => {
    cy.contains("Edit").click();
    cy.editInput("Code", faker.random.numeric(4));
    cy.clickSaveAndCheckResponse();
  });

  it("should copy Rate Schedule, and then delete it", () => {
    cy.contains("Copy").click();
    cy.editInput("Code", faker.random.numeric(4));
    cy.clickSaveAndCheckResponse();

    cy.clickDeleteAndCheckResponse();
  });
});
