import { faker } from "@faker-js/faker";

describe("Create Key Interchangeable Core record", () => {
  const data = {
    lockShopCode: "Auto-7",
    keySystem: "AutoSystem",
    description: faker.random.words(5),
    key: "Auto-7-AutoSystem-AutoK",
  };

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/InterchangeableCore/Create");
  });

  it("Create Key Interchangeable Core record with required fields", () => {
    cy.fillCombobox("Lock Shop", data.lockShopCode);
    cy.fillCombobox("Key System", data.keySystem);
    cy.fillInput("Description", data.description);
    cy.fillCombobox("Key Number", data.key);
    cy.clickSaveAndCheckResponse();
  });

  it("Create Key Interchangeable Core record with all fields", () => {
    cy.fillCombobox("Lock Shop", data.lockShopCode);
    cy.fillCombobox("Key System", data.keySystem);
    cy.fillInput("Description", data.description);
    cy.fillCombobox("Key Number", data.key);
    cy.openFlyoutAndSelectRandomValue("Manufacturer");
    cy.get('input[aria-label="Type"]').type("faker.random.words(10)");
    cy.get('input[aria-label="Finish"]').type("faker.random.words(10)");
    cy.clickSaveAndCheckResponse();
  });
});
