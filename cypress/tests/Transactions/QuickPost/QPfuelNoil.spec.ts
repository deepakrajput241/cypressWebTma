import { faker } from "@faker-js/faker";

describe("Create a Quick Post Fuel and Oil", () => {
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/QPFuelAndOil/Create/Identity");
  });

  it(
    "Create Quick post Fuel and Oil with Required fields",
    { tags: "@smoke" },
    () => {
      cy.openFlyoutAndSelectRandomValue("Vehicle");
      cy.openFlyoutAndSelectRandomValue("Repair Center Name");
      cy.getButtonWithText("Save").click();
      cy.getButton("Save").click();
    }
  );

  it("Create Quick Post Fuel and Oil with All fields", () => {
    cy.openFlyoutAndSelectRandomValue("Vehicle");
    cy.openFlyoutAndSelectRandomValue("Fuel Type Description");
    cy.openFlyoutAndSelectRandomValue("Repair Center Name");
    cy.EditInputElement("Recipient", faker.name.fullName());
    cy.openFlyoutAndSelectRandomValue("Technician");
    cy.openFlyoutAndSelectRandomValue("Supplier");
    cy.fillCheckbox("Charge");
    cy.openFlyoutAndSelectRandomValue("Department");
    cy.fillNumericTextBox("1", faker.datatype.number(100));
    cy.openFlyoutAndSelectRandomValue("Account Charged");
    cy.openFlyoutAndSelectRandomValue("Account Credited");
    cy.openFlyoutAndSelectRandomValue("Budget Code");
    cy.fillNumericTextBox("2", faker.datatype.number(100));
    cy.fillNumericTextBox("3", faker.datatype.number(100));
    cy.fillNumericTextBox("4", faker.datatype.number(100));
    cy.fillNumericTextBox("5", faker.datatype.number(100));
    cy.fillNumericTextBox("6", faker.datatype.number(100));
    cy.fillNumericTextBox("7", faker.datatype.number(100));
    cy.fillNumericTextBox("8", faker.datatype.number(100));
    cy.fillNumericTextBox("9", faker.datatype.number(100));
    cy.fillNumericTextBox("14", faker.datatype.number(100));
    cy.getButtonWithText("Save").click();
    cy.getButton("Save").click();
  });
});
