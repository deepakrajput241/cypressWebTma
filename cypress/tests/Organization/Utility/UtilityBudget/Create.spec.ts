import { faker } from "@faker-js/faker";

describe("Create Utility Budget record", () => {
  const Data = { utilityMeter: "UTLMeter" };

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/UtilityBudget/Create");
  });

  it("Utility Budget - Negative Cases", () => {
    //Without Fiscal year
    cy.openFlyoutAndSelectRandomValue("Utility Meter");
    cy.clickAndCheckAlert("Save", "Fiscal Year is required\r\n");

    //Without Utility Meter
    cy.fillNumericTextBox(0, new Date().getFullYear());
    cy.get("input[aria-label='Utility Meter']").eq(0).clear();
    cy.clickAndCheckAlert("Save", "Utility Meter is required\r\n");
  });

  it(
    "Create Utility Budget record with required fields",
    { tags: ["@smoke"] },
    () => {
      cy.openFlyoutAndSelectRandomValue("Utility Meter");
      cy.fillNumericTextBox(0, new Date().getFullYear());
      cy.clickSaveAndCheckResponse();
    }
  );

  it("Create Utility Budget record with All fields", () => {
    cy.openFlyoutAndSelectRandomValue("Utility Meter");
    cy.fillNumericTextBox(0, new Date().getFullYear());
    cy.get("#toolbarAddMonth").click();
    cy.get("select[aria-label='Month']").select(
      new Date().toLocaleString("default", { month: "long" })
    );
    cy.fillNumericTextBox(2, faker.datatype.number(100));
    cy.fillNumericTextBox(3, faker.datatype.number(9999));
    cy.fillNumericTextBox(1, new Date().getFullYear());
    cy.getButtonWithText("Save").click();
    cy.clickSaveAndCheckResponse();
  });
});
