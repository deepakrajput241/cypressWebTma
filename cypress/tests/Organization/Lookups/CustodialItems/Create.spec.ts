import { faker } from "@faker-js/faker";

describe("Create new Custodial Items", () => {
  const data = { unitOfMeasureCode: "BOX" };

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/Lookup/CDItem/Create");
  });

  it("Custodial Item Data - Negative Cases", { tags: "@smoke" }, () => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/Lookup/CDItem/Create/Identity");
    cy.clickAndCheckAlert("Save", "Description is required\r\n");
  });

  it("Create Custodial Item with Required Fields", { tags: "@smoke" }, () => {
    cy.EditInputElement("Description", faker.random.words(5));
    cy.clickSaveAndCheckResponse();
  });

  it("Create new Custodial Item Data with All fields", () => {
    cy.EditInputElement("Description", faker.random.words(5));
    cy.openFlyoutAndSelectRandomValue("Unit of Measure Code");
    cy.openFlyoutAndSelectRandomValue("Unit of Measure");
    cy.clickSaveAndCheckResponse();
  });
});
