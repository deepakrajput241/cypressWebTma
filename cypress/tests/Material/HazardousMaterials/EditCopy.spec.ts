import { faker } from "@faker-js/faker";

describe("edit, copy Hazardous Material", () => {
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/HazardousMaterial");
  });

  it("should edit Hazardous Material", () => {
    cy.contains("Edit").click();
    cy.editInput("Code", faker.random.numeric(7));
    cy.clickSaveAndCheckResponse();
  });

  it("should copy Hazardous Material, and then delete it", () => {
    cy.contains("Copy").click();
    cy.editInput("Code", faker.random.numeric(7));
    cy.clickSaveAndCheckResponse();

    cy.clickDeleteAndCheckResponse();
  });
});
