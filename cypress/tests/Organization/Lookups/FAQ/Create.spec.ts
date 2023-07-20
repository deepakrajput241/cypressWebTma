import { faker } from "@faker-js/faker";

describe("Create FAQ record", () => {
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/Lookup/FAQ/Create");
  });

  it("FAQ - Negative Cases", { tags: "@smoke" }, () => {
    cy.get("span[ng-bind='WindowTitle']:contains('FAQ')").should("be.visible");
    cy.fillCheckbox("Active");
    cy.clickAndCheckAlert("Save", "Description is required\r\n");
  });

  it("Create a FAQ with Required fields", { tags: "@smoke" }, () => {
    cy.editTextarea("Description", faker.random.words(10));
    cy.clickSaveAndCheckResponse();
  });
});
