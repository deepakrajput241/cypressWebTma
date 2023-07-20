import { faker } from "@faker-js/faker";
// see ticket E2E-445
describe.skip("edit, copy Utility Bill Invoice", () => {
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/APInvoice");
  });

  it("should edit Utility Bill Invoice", () => {
    // the first loaded Utility Bill Invoice has a problem when editing so we skip to the next one
    cy.contains("Next", { timeout: 15000 }).click();
    cy.contains("Edit", { timeout: 15000 }).click();
    // clear
    cy.get("input[aria-label='PO Number']", { timeout: 15000 })
      .as("clear")
      .clear();
    cy.get("@clear").should("have.value", "");
    // fill
    const value = faker.random.numeric(7);
    cy.get("input[aria-label='PO Number']").as("fill").type(value);
    cy.get("@fill").should("have.value", value);
    cy.clickSaveAndCheckResponse();
  });

  it("should copy Utility Bill Invoice, and then delete it", () => {
    // the first loaded Utility Bill Invoice has a problem when copying so we skip to the next one
    cy.contains("Next", { timeout: 15000 }).click();
    cy.contains("Copy", { timeout: 15000 }).click();
    // clear
    cy.get("input[aria-label='PO Number']", { timeout: 15000 })
      .as("clear")
      .clear();
    cy.get("@clear").should("have.value", "");
    // fill
    const value = faker.random.numeric(7);
    cy.get("input[aria-label='PO Number']").as("fill").type(value);
    cy.get("@fill").should("have.value", value);
    cy.clickSaveAndCheckResponse();

    cy.clickDeleteAndCheckResponse();
  });
});
