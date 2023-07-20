import { faker } from "@faker-js/faker";

function addRepairCenter() {
  cy.contains("Repair Centers").click();
  cy.addRepairCenter();
}

describe("edit, copy Funding Source", () => {
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/CAFundingSource");
  });

  it("should edit Funding Source", () => {
    cy.contains("Edit").click();
    cy.editInput("Code", faker.random.numeric(7));
    cy.clickSaveAndCheckResponse();
  });

  it("should copy Funding Source, and then delete it", () => {
    cy.contains("Copy").click();
    cy.editInput("Code", faker.random.numeric(7));
    addRepairCenter();
    cy.clickSaveAndCheckResponse();

    //TODO: app error - see ticket 1556
    // cy.clickDeleteAndCheckResponse();
  });
});
