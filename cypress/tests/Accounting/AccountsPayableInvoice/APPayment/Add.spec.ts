import { faker } from "@faker-js/faker";

const data = {
  accountNumber: "12345",
  authorizer: "126875",
  vendorCode: "ACESUP",
};

function addDetailPayment() {
  cy.contains("Add Detail Line").click();
  cy.get("input[value='Load Transactions']").click();
  cy.get("tbody input:first").click();
  cy.contains("button", "Save").click();
}

function fillRequiredFieldsCheckVoucherPayment() {
  cy.fillCombobox("Vendor Code", data.vendorCode);
  // with this Vendor Code, Authorizer is autofilled
  // cy.fillCombobox("Authorizer", data.authorizer);
  cy.fillCombobox("Account #", data.accountNumber);
  cy.fillRadio("PaymentType", "0");
  cy.fillDateInput("Date Paid");
  cy.fillDateInput("Authorization Date");
  cy.fillNumericTextBoxInput(
    "Payment Amount",
    faker.finance.amount(100, 1000, 2)
  );
  cy.fillInput("Check / Voucher #", faker.random.numeric(5));
  addDetailPayment();
}

function fillRequiredFieldsCreditDebitCardPayment() {
  cy.fillCombobox("Vendor Code", data.vendorCode);
  // with this Vendor Code, Authorizer is autofilled
  // cy.fillCombobox("Authorizer", data.authorizer);
  cy.fillCombobox("Account #", data.accountNumber);
  cy.fillRadio("PaymentType", "1");
  cy.fillDateInput("Date Paid");
  cy.fillDateInput("Authorization Date");
  cy.fillNumericTextBoxInput(
    "Payment Amount",
    faker.finance.amount(100, 1000, 2)
  );
  cy.fillInput("Name On Card", faker.name.fullName());
  cy.fillInput("Check / Voucher #", faker.finance.creditCardNumber());
  cy.fillDateInput("Expiration Date");
  addDetailPayment();
}

function fillRequiredFieldsCreditMemo() {
  cy.fillCombobox("Vendor Code", data.vendorCode);
  // with this Vendor Code, Authorizer is autofilled
  // cy.fillCombobox("Authorizer", data.authorizer);
  cy.fillCombobox("Account #", data.accountNumber);
  cy.fillRadio("PaymentType", "2");
  cy.fillDateInput("Date Paid");
  cy.fillDateInput("Authorization Date");
  cy.fillNumericTextBoxInput(
    "Payment Amount",
    faker.finance.amount(100, 1000, 2)
  );
  // memo stuff here?
  addDetailPayment();
}

describe("create AP Payment", () => {
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/APPayment/Create");
  });

  it("should not create AP Payment of type Check / Voucher Payment without required fields", () => {
    // missing Vendor Code
    fillRequiredFieldsCheckVoucherPayment();
    cy.clearCombobox("Vendor Code");
    cy.clickSaveAndCheckAlert(
      "Vendor Code is required\r\nVendor Name is required\r\n"
    );

    // missing Authorizer
    cy.reload();
    fillRequiredFieldsCheckVoucherPayment();
    cy.clearCombobox("Authorizer");
    cy.clickSaveAndCheckAlert(
      "Authorizer is required\r\nAuthorizer Name is required\r\n"
    );

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

    // missing Authorization Date
    cy.reload();
    fillRequiredFieldsCheckVoucherPayment();
    cy.clearInput("Authorization Date");
    cy.clickSaveAndCheckAlert("Authorization Date is required\r\n");

    // missing Payment Amount
    cy.reload();
    fillRequiredFieldsCheckVoucherPayment();
    cy.clearNumericTextBoxInput("Payment Amount");
    cy.clickSaveAndCheckAlert("Item Amount does not equal to Payment Amount. ");

    // missing Check / Voucher #
    cy.reload();
    fillRequiredFieldsCheckVoucherPayment();
    cy.clearInput("Check / Voucher #");
    cy.clickSaveAndCheckAlert("Check / Voucher # is required\r\n");

    // missing Payment
    cy.reload();
    fillRequiredFieldsCheckVoucherPayment();
    // delete the Payment
    cy.get("[title='DeletePaymentItem']:first").click();
    cy.clickSaveAndCheckAlert("At least one line is required.");
  });

  it("should create AP Payment of type Check / Voucher Payment with required fields, and then delete it", () => {
    fillRequiredFieldsCheckVoucherPayment();
    cy.clickSaveAndCheckResponse();

    cy.clickDeleteAndCheckResponse();
  });

  it("should create AP Payment of type Credit / Debit Card Payment with required fields, and then delete it", () => {
    fillRequiredFieldsCreditDebitCardPayment();
    cy.clickSaveAndCheckResponse();

    cy.clickDeleteAndCheckResponse();
  });

  // see ticket E24-443
  it.skip("should create AP Payment of type Credit Memo with required fields, and then delete it", () => {
    fillRequiredFieldsCreditMemo();
    cy.clickSaveAndCheckResponse();

    cy.clickDeleteAndCheckResponse();
  });
});
