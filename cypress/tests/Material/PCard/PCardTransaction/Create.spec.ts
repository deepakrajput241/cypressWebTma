import { faker } from "@faker-js/faker";

describe("Create P-Card Transaction Record", () => {
  const data = {
    vendor: "3MMM",
    transactionType: "Auto-1",
    card: "d111",
    repairCenter: "Auto_20464",
    salesType: "Audi",
    department: "Account Centers",
    partCode: "011001-1223343",
    tax: "Auto-ADP",
    chargeAccount: "Auto_104",
    otherType: "Auto-AGP",
    partType: "Auto test Type",
    unitOfMeasure: "Auto-100",
    workOrder: "1001-1001",
    workTask: "CARP-FURN-ASSM",
  };

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/PCardTransaction/Create");
  });

  it("P-Card Transaction - Negative Cases", () => {
    cy.fillCombobox("Vendor", 1);
    cy.fillCombobox("Transaction Type", 1);
    cy.fillCombobox("Card #", 1);
    cy.clickAndCheckAlert(
      "Save",
      "At least one P-Card transaction line is required."
    );

    cy.get("#toolbarAddPCardTransactionDetail").click();
    cy.fillCombobox("Part Code", 1);
    cy.fillNumericTextBox(1, "1");
    cy.editTextarea("Comments", faker.random.words(5));
    cy.getButtonWithText("Save").click();
    cy.get("input[aria-label='Vendor']").eq(0).clear();
    cy.clickAndCheckAlert(
      "Save",
      "Vendor is required\r\nVendor Name is required\r\n"
    );

    cy.fillCombobox("Vendor", 1);
    cy.get("input[aria-label='Transaction Type']").eq(0).clear();
    cy.clickAndCheckAlert(
      "Save",
      "Transaction Type is required\r\nTransaction Description is required\r\n"
    );

    cy.fillCombobox("Transaction Type", 1);
    cy.get("input[aria-label='Card #']").eq(0).clear();
    cy.clickAndCheckAlert("Save", "Card # is required\r\n");
  });

  it(
    "Craete P-Card Transaction with required fields",
    { tags: "@smoke" },
    () => {
      cy.fillCombobox("Vendor", 1);
      cy.fillCombobox("Transaction Type", 1);
      cy.fillCombobox("Card #", 1);
      cy.get("#toolbarAddPCardTransactionDetail").click();
      cy.fillCombobox("Part Code", 1);
      cy.fillNumericTextBox(1, "1");
      cy.editTextarea("Comments", faker.random.words(5));
      cy.getButtonWithText("Save").click();

      cy.clickAndCheckResponse(
        "Save",
        "POST",
        "/PCardTransaction/Create*",
        200
      );
    }
  );

  it("Create P-Card Transaction with All fields", () => {
    cy.fillCombobox("Vendor", 1);
    cy.fillCombobox("Transaction Type", 1);
    cy.fillCombobox("Card #", 1);
    cy.fillCombobox("Repair Center", 1);
    cy.fillCombobox("Tax Rate", 1);
    cy.fillCombobox("Status", 1);
    cy.EditInputElement("StatusNote", faker.random.words(1));
    cy.get("#toolbarAddPCardTransactionDetail").click();
    cy.fillCombobox("Part Code", 1);
    cy.fillNumericTextBox(1, "1");
    cy.editTextarea("Comments", faker.random.words(5));
    cy.getButtonWithText("Save").click();
    cy.fillNumericTextBox(0, faker.datatype.number(99));
    cy.editTextarea("Comment", faker.random.words(5));

    cy.clickAndCheckResponse("Save", "POST", "/PCardTransaction/Create*", 200);
  });

  it("Create P-Card Transaction With Issue To Work Order", () => {
    cy.get("span[ng-bind='WindowTitle']:contains('P-Card Transaction')").should(
      "be.visible"
    );
    cy.fillCombobox("Vendor", 1);
    cy.fillCombobox("Transaction Type", 1);
    cy.fillCombobox("Card #", 1);
    cy.fillCombobox("Repair Center", 1);
    cy.fillCombobox("Tax Rate", 1);
    cy.fillCombobox("Status", 1);
    cy.EditInputElement("StatusNote", faker.random.words(1));
    cy.get("#toolbarAddPCardTransactionDetail").click();
    cy.wait(500);
    cy.get("select[aria-label='Purchase Reason']")
      .select("Issue to Work Order")
      .wait(500);
    cy.fillCombobox("Part Code", 1);
    cy.fillNumericTextBox(1, "1");
    cy.fillCombobox("Work Order #", "1001-1001");
    cy.get("input[aria-label='WO Task']")
      .eq(0)
      .click()
      .type("CARP-FURN-ASSM")
      .wait(500)
      .type("{downArrow}{enter}");
    cy.editTextarea("Comments", faker.random.words(5));
    cy.getButtonWithText("Save").click();

    cy.clickAndCheckResponse("Save", "POST", "/PCardTransaction/Create*", 200);
  });

  it("Create P-Card Transaction With Issue To Sale Order", () => {
    cy.fillCombobox("Vendor", 1);
    cy.fillCombobox("Transaction Type", 1);
    cy.fillCombobox("Card #", 1);
    cy.fillCombobox("Repair Center", 1);
    cy.fillCombobox("Tax Rate", 1);
    cy.fillCombobox("Status", 1);
    cy.EditInputElement("StatusNote", faker.random.words(1));
    cy.get("#toolbarAddPCardTransactionDetail").click();
    cy.get("select[aria-label='Purchase Reason']")
      .select("Issue to Sales Order")
      .wait(500);
    cy.fillCombobox("Part Code", 1);
    cy.fillNumericTextBox(1, "1");
    cy.EditInputElement("SalesOrderNumber", faker.datatype.number(99999));
    cy.fillCombobox("Sales Type", 1);
    cy.fillCombobox("Department", 1);
    cy.editTextarea("Comments", faker.random.words(5));
    cy.getButtonWithText("Save").click();

    cy.clickAndCheckResponse("Save", "POST", "/PCardTransaction/Create*", 200);
  });
});
