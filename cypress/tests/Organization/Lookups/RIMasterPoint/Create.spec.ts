import { faker } from "@faker-js/faker";

describe("Create RI Master Point record", () => {
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/Lookup/RIPoint/Create");
  });

  it("RI Master Point - Negative Cases", { tags: "@smoke" }, () => {
    cy.get("span[ng-bind='WindowTitle']:contains('RI Master Point')")
      .should("be.visible")
      .wait(500);
    cy.clickAndCheckAlert("Save", "Description is required\r\n");
  });

  it("Create RI Master Point with Required fields", { tags: "@smoke" }, () => {
    cy.EditInputElement("Description", faker.random.words(2));
    cy.clickSaveAndCheckResponse();
  });
});
