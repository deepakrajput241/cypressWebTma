import { faker } from "@faker-js/faker";

describe("edit, copy Universal Interface", () => {
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("#!/UniversalIntegrationSetup");
  });

  it("should edit Universal Interface Setup", () => {
    cy.contains("Edit").click();
    cy.editInput("Code", faker.random.numeric(7));
    cy.clickSaveAndCheckResponse();
  });

  it("should copy Universal Interface Setup, and then delete it", () => {
    cy.contains("Copy").click();
    cy.editInput("Code", faker.random.numeric(7));
    cy.clickSaveAndCheckResponse();

    cy.clickDeleteAndCheckResponse();
  });
});
