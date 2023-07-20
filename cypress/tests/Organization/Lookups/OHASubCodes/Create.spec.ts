import { faker } from "@faker-js/faker";

describe("Create  OHA Sub Code record", () => {
  const data = { ohaCode: "1" };

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/Lookup/OnhandAdjustmentSubCode/Create");
  });

  it(" OHA Sub Code - Negative Cases", { tags: "@smoke" }, () => {
    cy.get("a[ng-click='navToLookup(lookup.ControllerName)']")
      .contains("OHA Sub Code")
      .wait(1000)
      .click();
    cy.EditInputElement("Description", faker.random.words(2));
    cy.clickAndCheckAlert(
      "Save",
      "OHA Code is required\r\nOHA Description is required\r\n"
    );

    cy.get("input[aria-label='OHA Code']")
      .eq(0)
      .click()
      .wait(500)
      .type("1")
      .type("{downArrow}{enter}");
    cy.get("input[name='Description']").clear();
    cy.clickAndCheckAlert("Save", "Sub Code Description is required\r\n");
  });

  it("Create an OHA Sub Code with required fields", { tags: "@smoke" }, () => {
    cy.get("input[aria-label='OHA Code']")
      .eq(0)
      .click()
      .wait(500)
      .type("1")
      .type("{downArrow}{enter}");
    cy.EditInputElement("Description", faker.random.words(2));
    cy.clickSaveAndCheckResponse();
  });
});
