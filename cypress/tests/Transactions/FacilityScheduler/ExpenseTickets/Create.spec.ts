import { faker } from "@faker-js/faker";

const data = {
  ticket: faker.datatype.number(10000),
  unitcost: faker.datatype.number(1000),
  unit: faker.datatype.number(1000),
  referenc_no: faker.datatype.number(10000),
  recipient: faker.random.words(3),
  unitMeasure: faker.datatype.number(1000),
  account: "1013 1013 1013 1013 1013 1013",
  expenseType: "10411",
  itemCode: "107",
  quantity: faker.random.numeric(),
  repairCenter: "10970",
  ticketNumber: faker.random.numeric(5),
  ticketTypeCode: "Auto-10",
  unitCost: faker.random.numeric(2),
};

function addExpenseEntry() {
  cy.contains("Add Item").click();
  cy.fillCombobox("Account", data.account);
  cy.fillCombobox("Expense Type", data.expenseType);
  cy.get("[aria-label='Quantity'] input").first().type(data.quantity);
  cy.get("[aria-label='Unit Cost'] input").first().type(data.unitCost);
  cy.contains("button", "Save").click();
}

function fillRequiredFields() {
  cy.fillSelect("Item Type", "Equipment");
  cy.fillCombobox("Item Code", data.itemCode);
  cy.fillCombobox("Ticket Type Code", data.ticketTypeCode);
  cy.fillInput("Ticket #", faker.random.numeric(5));
  cy.fillCombobox("Repair Center", data.repairCenter);
  addExpenseEntry();
}

describe("create Expense Ticket", () => {
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/ExpenseTicket/Create");
  });

  it("should not create Expense Ticket without required fields", () => {
    // missing Item Code
    fillRequiredFields();
    cy.clearCombobox("Item Code");
    cy.clickSaveAndCheckAlert("Item Code is required\r\n");

    // missing Ticket Type Code
    cy.reload();
    fillRequiredFields();
    cy.clearCombobox("Ticket Type Code");
    cy.clickSaveAndCheckAlert(
      "Ticket Type Code is required\r\nTicket Type Description is required\r\n"
    );

    // missing Ticket #
    cy.reload();
    fillRequiredFields();
    cy.clearInput("Ticket #");
    cy.clickSaveAndCheckAlert("Ticket # is required\r\n");

    // missing Repair Center
    cy.reload();
    fillRequiredFields();
    cy.clearCombobox("Repair Center");
    cy.clickSaveAndCheckAlert("Repair Center is required\r\n");

    // missing Expense Entry
    cy.reload();
    cy.fillSelect("Item Type", "Equipment");
    cy.fillCombobox("Item Code", data.itemCode);
    cy.fillCombobox("Ticket Type Code", data.ticketTypeCode);
    cy.fillInput("Ticket #", faker.random.numeric(5));
    cy.fillCombobox("Repair Center", data.repairCenter);
    cy.clickSaveAndCheckAlert(
      " At least 1 record is required for Expense Ticket Item Grid\r\n"
    );
  });

  it(
    "should create Expense Ticket with required fields",
    { tags: "@smoke" },
    () => {
      fillRequiredFields();
      cy.clickSaveAndCheckResponse();

      cy.clickDeleteAndCheckResponse();
    }
  );

  it.skip("should create Expense Ticket with all fields", () => {
    cy.get("select[name='ItemTypeId']").should("be.visible").select(9);
    cy.openFlyoutAndSelectRandomValue("Item Code");
    cy.openFlyoutAndSelectRandomValue("Ticket Type Code");
    cy.openFlyoutAndSelectRandomValue("Department Code");
    cy.openFlyoutAndSelectRandomValue("Account Code");
    cy.EditInputElement("Number", faker.datatype.number(99999999));
    cy.openFlyoutAndSelectRandomValue("Tax Name");
    cy.EditInputElement("ReferenceNumber", data.referenc_no);
    cy.openFlyoutAndSelectRandomValue("Repair Center");
    cy.EditInputElement("Recipient", data.recipient);
    cy.openFlyoutAndSelectRandomValue("Budget Code");
    cy.get("#toolbarAddExpenseTicketItem").should("be.visible").click();
    cy.openFlyoutAndSelectRandomValue("Account");
    cy.openFlyoutAndSelectRandomValue("Expense Type");
    cy.fillNumericTextBox(0, data.quantity);
    cy.EditInputElement("UnitOfMeasure", data.unitMeasure);
    cy.fillNumericTextBox(1, data.unitcost);
    cy.getButtonWithText("Save").click();
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "/ExpenseTicket/Create*",
      200
    ).then((ID) => {
      id = ID;
    });
  });
});
