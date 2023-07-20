import { faker } from "@faker-js/faker";

const data = {
  departmentCode: "117049682",
  orderUnit: "Auto-53",
  otpType: "Auto-14953",
  status: "Re-opened",
  taxRate: "Auto-hacking",
  transactionNumber: "598",
};

function addItem() {
  cy.contains("Add Item").click();
  cy.setWait();
  cy.fillInput("Code", faker.random.numeric(4));
  cy.fillNumericTextBoxInput(
    "Quantity",
    faker.datatype.number({ min: 1, max: 5, precision: 0.01 }).toString()
  );
  cy.fillCombobox("Order Unit", "33470");
  cy.get("textarea[aria-label='Comment']").eq(1).type(faker.random.words(10));
  cy.fillNumericTextBoxInput(
    "Unit Cost",
    faker.datatype.number({ min: 10, max: 999, precision: 0.0001 }).toString()
  );
  cy.contains("button", "Save").click();
}

function fillRequiredFields() {
  cy.fillCombobox("Trans #", data.transactionNumber);
  cy.fillCombobox("Department Code", data.departmentCode);
  cy.fillInput("Invoice #", faker.random.numeric(7));
  cy.fillDateInput("Invoice Date");
}

describe("add Accounts Receivable Invoice", () => {
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/ARInvoice/Create");
  });

  it("should not add Accounts Receivable Invoice without required fields", () => {
    // missing 'Trans #'
    cy.fillCombobox("Department Code", data.departmentCode);
    cy.fillInput("Invoice #", faker.random.numeric(7));
    cy.fillDateInput("Invoice Date");
    cy.clickSaveAndCheckAlert("Trans # is required\r\n");

    // missing 'Department Code'
    cy.reload();
    fillRequiredFields();
    cy.clearCombobox("Department Code");
    cy.clickSaveAndCheckAlert(
      "Department Code is required\r\nDepartment Name is required\r\n"
    );

    // missing 'Invoice #'
    cy.reload();
    fillRequiredFields();
    cy.clearInput("Invoice #");
    cy.clickSaveAndCheckAlert("Invoice # is required\r\n");

    // missing 'Invoice Date'
    cy.reload();
    fillRequiredFields();
    cy.clearInput("Invoice Date");
    cy.clickSaveAndCheckAlert("Invoice Date is required\r\n");
  });

  it(
    "should add Accounts Receivable Invoice with required fields",
    { tags: "@smoke" },
    () => {
      fillRequiredFields();
      cy.clickSaveAndCheckResponse();

      // Accounts Receivable Invoice has no delete function
    }
  );

  it("should add Accounts Receivable Invoice with all fields", () => {
    cy.fillCombobox("Trans #", data.transactionNumber);
    cy.fillCombobox("Department Code", data.departmentCode);
    cy.fillCombobox("Status", data.status);
    cy.fillInput("Status Note", faker.random.words(2));
    cy.fillInput("Terms", faker.random.words(2));
    cy.fillNumericTextBoxInput(
      "Discount %",
      faker.datatype.number({ min: 1, max: 50, precision: 0.01 }).toString()
    );
    cy.fillNumericTextBoxInput(
      "Discount Taken",
      faker.datatype.number({ min: 1, max: 50, precision: 0.01 }).toString()
    );
    cy.fillInput("Invoice #", faker.random.numeric(7));
    cy.fillDateInput("Invoice Date");
    cy.fillDateInput(
      "Due Date",
      faker.date.future().toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
    );
    cy.fillCombobox("Tax Rate", data.taxRate);
    cy.fillInput("Reference #", faker.random.numeric(5));
    addItem();
    cy.fillTextarea("Comment", faker.random.words(10));
    cy.clickSaveAndCheckResponse();

    // Accounts Receivable Invoice has no delete function
  });
});
