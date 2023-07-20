import { faker } from "@faker-js/faker";

describe("Create Rejection record", () => {
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/Lookup/Rejection/Create");
  });

  it("Rejection - Negative Cases", { tags: "@smoke" }, () => {
    cy.get("span[ng-bind='WindowTitle']:contains('Rejections')")
      .should("be.visible")
      .wait(500);
    cy.clickAndCheckAlert("Save", "Description is required\r\n");
  });

  it("Create a Rejection with Required fields", { tags: "@smoke" }, () => {
    cy.editTextarea("Description", faker.random.words(10));
    cy.clickSaveAndCheckResponse();
  });
});
