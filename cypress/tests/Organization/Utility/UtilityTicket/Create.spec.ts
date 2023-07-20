import { faker } from "@faker-js/faker";

describe("Create Utility Ticket record", () => {
  const data = {
    utilityMeter: "1",
    vendor: "3MMM",
    department: "DATA",
    chargeAccountCode: "1111 2222 3333 4444",
    creditAccountCode: "1111 2222 3333 4444",
    taxName: "Auto-Distributed",
    demandUnit: "BOX",
  };

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/UtilityTicket/Create");
  });

  it("Utility Ticket - Negative Cases", () => {
    cy.get("input[aria-label='Billing Start Date']").type(
      new Date().toLocaleDateString("en-US")
    );
    cy.get("input[aria-label='Billing End Date']").type(
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.fillNumericTextBox(0, faker.datatype.number(100));
    cy.fillNumericTextBox(2, faker.datatype.number(999));
    cy.clickAndCheckAlert("Save", "Utility Meter is required\r\n");

    cy.openFlyoutAndSelectRandomValue("Utility Meter");
    cy.get("input[aria-label='Billing Start Date']").clear();
    cy.clickAndCheckAlert("Save", "Billing Start Date is required\r\n");

    cy.get("input[aria-label='Billing End Date']").clear();
    cy.get("input[aria-label='Billing Start Date']").type(
      new Date().toLocaleDateString("en-US")
    );
    cy.clickAndCheckAlert("Save", "Billing End Date is required\r\n");

    cy.get("input[aria-label='Billing End Date']").type(
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.get(".k-formatted-value.k-input.ng-scope").eq(0).clear();
    cy.clickAndCheckAlert("Save", "Utility Usage is required\r\n");

    cy.fillNumericTextBox(0, faker.datatype.number(100));
    cy.get(".k-formatted-value.k-input.ng-scope").eq(2).clear();
    cy.clickAndCheckAlert("Save", "Periodic Charge is required\r\n");
  });

  it(
    "Create Utility Ticket record with required fields",
    { tags: ["@smoke"] },
    () => {
      cy.get("input[aria-label='Billing Start Date']").type(
        new Date().toLocaleDateString("en-US")
      );
      cy.get("input[aria-label='Billing End Date']").type(
        faker.date.future().toLocaleDateString("en-US")
      );
      cy.openFlyoutAndSelectRandomValue("Utility Meter");
      cy.fillNumericTextBox(0, faker.datatype.number(100));
      cy.fillNumericTextBox(2, faker.datatype.number(999));
      cy.clickSaveAndCheckResponse();
    }
  );

  it("Create Utility Ticket record with All fields", () => {
    cy.openFlyoutAndSelectRandomValue("Service Type");
    cy.openFlyoutAndSelectRandomValue("Utility Meter");
    cy.openFlyoutAndSelectRandomValue("Vendor");
    cy.openFlyoutAndSelectRandomValue("Department");
    cy.openFlyoutAndSelectRandomValue("Charge Account Code");
    cy.openFlyoutAndSelectRandomValue("Credit Account Code");
    cy.get("input[aria-label='Billing Start Date']").type(
      new Date().toLocaleDateString("en-US")
    );
    cy.get("input[aria-label='Billing End Date']").type(
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.fillNumericTextBox(0, faker.datatype.number(100));
    cy.fillNumericTextBox(1, faker.datatype.number(99));
    cy.fillNumericTextBox(2, faker.datatype.number(999));
    cy.openFlyoutAndSelectRandomValue("Repair Center Code");
    cy.openFlyoutAndSelectRandomValue("Tax Name");
    cy.fillCheckbox("Taxable");
    cy.fillCheckbox("Chargeable");
    cy.openFlyoutAndSelectRandomValue("Demand Unit");
    cy.clickSaveAndCheckResponse();
  });
});
