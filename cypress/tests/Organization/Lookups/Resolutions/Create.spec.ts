import { faker } from "@faker-js/faker";
describe("Create Resolution record", () => {
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/Lookup/Resolution/Create");
  });

  it("Resolution - Negative Cases", { tags: "@smoke" }, () => {
    cy.get("span[ng-bind='WindowTitle']:contains('Resolutions')")
      .should("be.visible")
      .wait(500);
    cy.clickAndCheckAlert("Save", "Resolution is required\r\n");
  });

  it("Create a Resolution with Required fields", { tags: "@smoke" }, () => {
    cy.editTextarea("Resolution", faker.random.words(10));
    cy.clickSaveAndCheckResponse();
  });
});
