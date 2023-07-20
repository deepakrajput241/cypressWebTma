import { faker } from "@faker-js/faker";

describe("edit, copy Approval Routing Criteria", () => {
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/ApprovalRoutingCriteria");
  });

  it("edit Approval Route Criteria", () => {
    cy.contains("Edit").click();
    cy.editInput("Name", faker.random.words(2));
    cy.clickSaveAndCheckResponse();
  });

  it("copy Approval Route Criteria, and then delete it", () => {
    cy.contains("Copy").click();
    cy.editInput("Name", faker.random.words(2));
    cy.clickSaveAndCheckResponse();

    cy.clickDeleteAndCheckResponse();
  });
});
