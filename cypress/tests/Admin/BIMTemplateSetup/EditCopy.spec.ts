import { faker } from "@faker-js/faker";

describe("edit, copy BIM Template Setup", () => {
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("#!/BIMTemplateSetup");
  });

  it("should edit BIM Template Setup", () => {
    cy.contains("Edit").click();
    cy.editInput("Name  ", faker.company.name());
    cy.clickSaveAndCheckResponse();
  });

  it("should copy BIM Template Setup, then delete it", () => {
    cy.contains("Copy").click();
    cy.editInput("Name  ", faker.company.name());
    cy.clickSaveAndCheckResponse();

    cy.clickDeleteAndCheckResponse();
  });
});
