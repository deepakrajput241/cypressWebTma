import { faker } from "@faker-js/faker";

const data = {
  account: "12345",
  departmentCode: "AIED",
};

function fillRequiredFieldsCheckVoucherPayment() {
  cy.fillCombobox("Department Code", data.departmentCode);
  cy.fillCombobox("Account #", data.account);
  cy.fillDateInput("Date Paid");
  cy.fillNumericTextBoxInput("Payment Amount", faker.finance.amount());
  cy.fillInput("Check / Voucher #", faker.random.numeric(7));
  cy.contains("Add Detail Line").click();
  cy.get("input[value='Load Transactions']").click();
  cy.get("tbody input:first").check();
  cy.contains("button", "Save").click();
}

function fillRequiredFieldsCheckCreditCardPayment() {
  cy.fillCombobox("Department Code", data.departmentCode);
  cy.fillCombobox("Account #", data.account);
  cy.fillDateInput("Date Paid");
  cy.fillNumericTextBoxInput("Payment Amount", faker.finance.amount());
  cy.fillInput("Name On Card", faker.name.fullName());
  cy.fillInput("Card #", faker.finance.creditCardNumber());
  cy.fillDateInput("Expiration Date");
  cy.contains("Add Detail Line").click();
  cy.get("input[value='Load Transactions']").click();
  cy.get("tbody input:first").check();
  cy.contains("button", "Save").click();
}

function fillRequiredFieldsCreditMemo() {
  cy.fillCombobox("Department Code", data.departmentCode);
  cy.fillCombobox("Account #", data.account);
  cy.fillDateInput("Date Paid");
  cy.fillNumericTextBoxInput("Payment Amount", faker.finance.amount());
  cy.fillInput("Check / Voucher #", faker.random.numeric(7));
  cy.contains("Add Detail Line").click();
  cy.get("input[value='Load Transactions']").click();
  cy.get("tbody input:first").check();
  cy.contains("button", "Save").click();
}

// see ticket E2E-444
describe.skip("add AR Payment", () => {
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/ARPayment/Create");
  });

  it("should not add AR Payment of type Check / Voucher Payment without required fields", () => {
    // missing Department Code
    cy.reload();
    fillRequiredFieldsCheckVoucherPayment();
    cy.clearCombobox("Department Code");
    cy.clickSaveAndCheckAlert("Department Code is required\r\n");

    // missing Account #
    cy.reload();
    fillRequiredFieldsCheckVoucherPayment();
    cy.clearCombobox("Account #");
    cy.clickSaveAndCheckAlert("Account # is required\r\n");

    // missing Date Paid
    cy.reload();
    fillRequiredFieldsCheckVoucherPayment();
    cy.clearInput("Date Paid");
    cy.clickSaveAndCheckAlert("Date Paid is required\r\n");

    // missing Payment Amount
    cy.reload();
    fillRequiredFieldsCheckVoucherPayment();
    cy.clearNumericTextBoxInput("Payment Amount");
    cy.clickSaveAndCheckAlert("The item amounts exceeds the payment amount");

    // missing Check / Voucher #
    cy.reload();
    fillRequiredFieldsCheckVoucherPayment();
    cy.clearInput("Check / Voucher #");
    cy.clickSaveAndCheckAlert("Check / Voucher # is required\r\n");

    // missing Detail Line
    cy.reload();
    fillRequiredFieldsCheckVoucherPayment();
    // delete Detail Line
    cy.get("[title='DeletePaymentItem']").click();
    cy.clickSaveAndCheckAlert("At least one line is required.");
  });

  it("should add AR Payment of type Check / Voucher Payment with required fields, and then delete it", () => {
    fillRequiredFieldsCheckVoucherPayment();
    cy.clickSaveAndCheckResponse();

    cy.clickDeleteAndCheckResponse();
  });

  it("should add AR Payment of type Credit / Debit Card Payment with required fields, and then delete it", () => {
    fillRequiredFieldsCheckCreditCardPayment();
    cy.clickSaveAndCheckResponse();

    cy.clickDeleteAndCheckResponse();
  });

  it("should add AR Payment of type Credit Memo with required fields, and then delete it", () => {
    fillRequiredFieldsCreditMemo();
    cy.clickSaveAndCheckResponse();

    cy.clickDeleteAndCheckResponse();
  });
});
