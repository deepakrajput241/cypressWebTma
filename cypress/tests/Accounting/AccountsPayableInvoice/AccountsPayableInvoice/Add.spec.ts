import { faker } from "@faker-js/faker";

const data = {
  orderUnit: "Auto-53",
  otpType: "Auto-14953",
  partCode: "011001",
  repairCenter: "Auto-14953",
  status: "Re-opened",
  taxRate: "Auto-hacking",
  transactionNumber: "3482020",
};

// this isn't being used now - perhaps later
function addItem() {
  cy.contains("Add Item").click();
  cy.fillCombobox("Part Code", data.partCode);
  cy.fillInput("Quantity", faker.random.numeric(2));
  cy.fillCombobox("Order Unit", data.orderUnit);
  cy.fillInput("Unit Cost", faker.commerce.price(1, 1000, 2));
  cy.fillCombobox("OTP Type", data.otpType);
  cy.fillInput("Freight Cost", faker.commerce.price(1, 1000, 2));
  cy.fillCheckbox("Taxable");
  cy.fillTextarea("Comment", faker.lorem.sentences(2));
  cy.contains("button", "Save").click();
}

function fillRequiredFields() {
  cy.fillCombobox("Trans #", data.transactionNumber);
  cy.fillInput("Invoice #", faker.random.numeric(7));
  cy.fillDateInput("Invoice Date");
}

describe("add Accounts Payable Invoice", () => {
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/Invoice/Create");
  });

  it("should not add Accounts Payable Invoice without required fields", () => {
    // missing Trans #
    fillRequiredFields();
    cy.clearCombobox("Trans #");
    cy.clickSaveAndCheckAlert("At least one item is required");

    // missing Invoice Number
    cy.reload();
    fillRequiredFields();
    cy.clearInput("Invoice #");
    cy.clickSaveAndCheckAlert("Invoice # is required\r\n");

    // missing Invoice Date
    cy.reload();
    fillRequiredFields();
    cy.clearInput("Invoice Date");
    cy.clickSaveAndCheckAlert("Invoice Date is required\r\n");
  });

  it(
    "should add Accounts Payable Invoice with required fields, and then delete it",
    { tags: "@smoke" },
    () => {
      fillRequiredFields();
      cy.clickSaveAndCheckResponse();

      cy.clickDeleteAndCheckResponse();
    }
  );

  it("should add Accounts Payable Invoice with all fields, and then delete it", () => {
    cy.fillCombobox("Trans #", data.transactionNumber);
    cy.fillCombobox("Status", data.status);
    cy.fillInput("Status Note", faker.random.words(3));
    cy.fillInput("Terms", faker.random.words(3));
    cy.fillNumericTextBoxInput(
      "Discount %",
      faker.datatype.float({ min: 1, max: 49, precision: 0.01 }).toString()
    );
    cy.fillNumericTextBoxInput(
      "Discount Taken",
      faker.datatype.float({ min: 1, max: 49, precision: 0.01 }).toString()
    );
    cy.fillInput("Invoice #", faker.random.numeric(7));
    cy.fillDateInput("Invoice Date");
    cy.fillDateInput("Due Date", faker.date.past().toLocaleDateString("en-US"));
    // repair center is disabled with this data
    // cy.fillCombobox("Repair Center", data.repairCenter);
    cy.fillCombobox("Tax Rate", data.taxRate);
    cy.fillInput("Reference #", faker.random.numeric(5));
    cy.fillTextarea("Comment", faker.lorem.sentences(2));
    cy.clickSaveAndCheckResponse();

    cy.clickDeleteAndCheckResponse();
  });
});
