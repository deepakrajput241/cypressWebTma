import { faker } from "@faker-js/faker";

const data = {
  meter: "TMA Utility Meter",
  repairCenterCode: "139",
  type: "Electric",
  utilityTicket: "1361",
  vendorCode: "3MMM",
  vendorName: "3M",
};

function addDetailMeter() {
  cy.contains("Add Detail Line").click();
  cy.fillCombobox("Type", data.type);
  cy.fillCombobox("Meter", data.meter);
  cy.fillCombobox("Utility Ticket", data.utilityTicket);
  cy.contains("button", "Save").click();
}

function addDetailOther() {
  cy.contains("Add Detail Line").click();
  cy.setWait();
  cy.fillRadio("MeterOther", "1");
  cy.fillInput("Desc Other", faker.random.words(5));
  cy.fillDateInput("Start Date");
  cy.fillDateInput("End Date");
  cy.fillNumericTextBoxInput("Usage", faker.finance.amount(1, 100, 2));
  cy.fillInput("Unit", faker.random.numeric(2));
  cy.fillNumericTextBoxInput(
    "Charge",
    faker.datatype.number({ max: 999, precision: 0.0001 }).toString()
  );
  cy.contains("button", "Save").click();
}

function fillRequiredFields() {
  // PO Number is not required but added because of form flow
  cy.fillInput("PO Number", faker.random.numeric(7));
  cy.setWait();
  cy.fillDateInput("Ticket Date");
  cy.fillCombobox("Vendor Name", data.vendorName);
}

describe("add Utility Bill Invoice", () => {
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/APInvoice/Create");
  });

  it("should not add Utility Bill Invoice without required fields", () => {
    // missing Ticket Date
    fillRequiredFields();
    cy.clearDateInput("Ticket Date");
    cy.clickSaveAndCheckAlert("Ticket Date is required\r\n");

    // missing Vendor Name
    cy.reload();
    fillRequiredFields();
    cy.clearCombobox("Vendor Name");
    cy.clickSaveAndCheckAlert("Vendor Name is required\r\n");
  });

  it(
    "should add Utility Bill Invoice with required fields, and then delete it",
    { tags: "@smoke" },
    () => {
      fillRequiredFields();
      cy.clickSaveAndCheckResponse();

      cy.clickDeleteAndCheckResponse();
    }
  );

  it("should add Utility Bill Invoice with all fields, and then delete it", () => {
    cy.fillInput("PO Number", faker.random.numeric(7));
    cy.setWait();
    cy.fillDateInput("Ticket Date");
    cy.fillCombobox("Vendor Code", data.vendorCode);
    // Vendor Account Code has no data so skipped
    cy.fillCombobox("Repair Center Code", data.repairCenterCode);
    // TODO: problem with Add Detail slide-over - see ticket 1907
    // addDetailMeter();
    addDetailOther();
    cy.fillTextarea("Comment", faker.lorem.sentences(2));
    cy.clickSaveAndCheckResponse();

    cy.clickDeleteAndCheckResponse();
  });
});
