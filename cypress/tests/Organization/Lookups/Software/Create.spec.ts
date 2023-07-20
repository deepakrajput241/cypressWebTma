import { faker } from "@faker-js/faker";

describe("Create Software record", () => {
  const data = { publisher: "3M" };

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/Lookup/Software/Create");
  });

  it("Software - Negative Cases", { tags: "@smoke" }, () => {
    cy.get("a[ng-click='navToLookup(lookup.ControllerName)']")
      .contains("Software")
      .wait(1000)
      .click();
    cy.EditInputElement("Product", faker.random.words(2));
    cy.clickAndCheckAlert("Save", "Publisher is required\r\n");

    cy.openFlyoutAndSelectRandomValue("Publisher");
    cy.get("input[name='Product']").clear();
    cy.clickAndCheckAlert("Save", "Product is required\r\n");
  });

  it("Create a Software with required fields", { tags: "@smoke" }, () => {
    cy.EditInputElement("Product", faker.random.words(2));
    cy.openFlyoutAndSelectRandomValue("Publisher");
    cy.clickSaveAndCheckResponse();
  });
});
