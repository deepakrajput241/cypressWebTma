import { faker } from "@faker-js/faker";

function addExchangeRate() {
  cy.contains("Exchange Rate").click();
  cy.contains("Add Rate").click();
  cy.fillInput("Description", faker.random.words(3));
  cy.fillInput(
    "Rate",
    faker.datatype.number({ max: 10, precision: 0.01 }).toString()
  );
  cy.fillDateInput("Effective Date");
  cy.fillDateInput(
    "Expiration Date",
    faker.date.future().toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
  );
}

function fillRequiredFields() {
  cy.fillInput("Currency ID", faker.random.numeric(7));
  cy.setWait();
  cy.fillInput("Description", faker.random.words(3));
  cy.fillInput("ISO Code", faker.address.countryCode());
  cy.fillInput("Symbol", faker.finance.currencySymbol());
  cy.fillInput("Negative Sign", "-");
  cy.fillInput("Decimal Separator", ".");
  cy.fillNumericTextBoxInput("Decimal Digits", "2");
  cy.fillInput("Thousand Separator", ",");
}

describe("add Currency", () => {
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/Currency/Create");
  });

  it("should not add Currency without required fields", () => {
    // missing Currency ID
    fillRequiredFields();
    cy.clearInput("Currency ID");
    cy.clickSaveAndCheckAlert("Currency ID is required\r\n");

    // missing Description
    cy.reload();
    fillRequiredFields();
    cy.clearInput("Description");
    cy.clickSaveAndCheckAlert("Description is required\r\n");

    // missing Symbol
    cy.reload();
    fillRequiredFields();
    cy.clearInput("Symbol");
    cy.clickSaveAndCheckAlert("Symbol is required\r\n");

    // missing ISO Code
    cy.reload();
    fillRequiredFields();
    cy.clearInput("ISO Code");
    cy.clickSaveAndCheckAlert("ISO Code is required\r\n");

    // missing Negative Sign
    cy.reload();
    fillRequiredFields();
    cy.clearInput("Negative Sign");
    cy.clickSaveAndCheckAlert("Negative Sign is required\r\n");

    // missing Decimal Separator
    cy.reload();
    fillRequiredFields();
    cy.clearInput("Decimal Separator");
    cy.clickSaveAndCheckAlert("Decimal Separator is required\r\n");

    // missing Decimal Digits
    cy.reload();
    fillRequiredFields();
    cy.clearNumericTextBoxInput("Decimal Digits");
    cy.clickSaveAndCheckAlert("Decimal Digits is required\r\n");

    // missing Thousand Separator
    cy.reload();
    fillRequiredFields();
    cy.clearInput("Thousand Separator");
    cy.clickSaveAndCheckAlert("Thousand Separator is required\r\n");
  });

  it("should add Currency with required fields, and then delete it", () => {
    fillRequiredFields();
    cy.clickSaveAndCheckResponse();

    cy.clickDeleteAndCheckResponse();
  });

  it("should add Currency with all fields, and then delete it", () => {
    cy.fillInput("Currency ID", faker.random.numeric(7));
    cy.setWait();
    cy.fillInput("Description", faker.random.words(3));
    cy.fillInput("ISO Code", faker.address.countryCode());
    cy.fillInput("Symbol", faker.finance.currencySymbol());
    cy.fillInput("Negative Sign", "-");
    cy.fillInput("Decimal Separator", ".");
    cy.fillNumericTextBoxInput("Decimal Digits", "2");
    cy.fillInput("Thousand Separator", ",");
    cy.fillInput("Currency Unit", faker.finance.currencyName());
    cy.fillInput("Unit-Subunit Connector", "-");
    cy.fillInput("Currency Subunit", faker.finance.currencyName());
    cy.fillNumericTextBoxInput("Rate Frequency (Days)", faker.random.numeric());
    addExchangeRate();
    cy.contains("button", "Save").click();
    cy.clickSaveAndCheckResponse();

    cy.clickDeleteAndCheckResponse();
  });
});
