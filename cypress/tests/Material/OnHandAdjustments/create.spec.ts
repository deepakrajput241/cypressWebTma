import { faker } from "@faker-js/faker";
describe("Create On-Hand Adjustments", () => {
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/OnHandAdjustment/Create");
  });

  it("On-Hand Adjustments - Negative Cases", () => {
    cy.openFlyoutAndSelectRandomValue("Technician Code");
    cy.clickAndCheckAlert(
      "Save",
      " At least 1 record is required for Onhand Adjustment Details Grid\r\n"
    );

    cy.get("#toolbarAddOnHandAdjustmentDetail").click();
    cy.get(".entryTitle:contains('On-hand Adjustment Entry')").should(
      "be.visible"
    );
    cy.fillNumericTextBox(0, "1");
    cy.get("input[aria-label='Part Code'][type='text']")
      .type("105")
      .wait(500)
      .type("{downArrow}{enter}");
    cy.fillCombobox("Warehouse Code", "Auto-W1");
    cy.fillNumericTextBox(2, "1");
    cy.editTextarea("Comment", faker.random.words(5));
    cy.getButtonWithText("Save").click();
    cy.get("input[aria-label='Technician Code']").eq(0).clear();
    cy.clickAndCheckAlert(
      "Save",
      "Technician Code is required\r\nTechnician Name is required\r\n"
    );
  });

  it("Create On-Hand Adjustment with Return Part", () => {
    cy.openFlyoutAndSelectRandomValue("Technician Code");
    cy.EditInputElement("PackagingSlip", faker.datatype.number(99999));
    cy.get("#toolbarAddOnHandAdjustmentDetail").click();
    cy.get(".entryTitle:contains('On-hand Adjustment Entry')").should(
      "be.visible"
    );
    cy.fillNumericTextBox(0, "2");
    cy.get("input[aria-label='Part Code'][type='text']")
      .type("106")
      .wait(500)
      .type("{downArrow}{enter}");
    cy.get("input[aria-label='Warehouse Code'][type='text']")
      .type("0225920311")
      .wait(500)
      .type("{downArrow}{enter}");
    cy.get("input[aria-label='Work Order #'][type='text']")
      .click()
      .wait(500)
      .type("1001-1001")
      .wait(1000)
      .type("{downArrow}{enter}");
    cy.get("input[aria-label='Account #'][type='text']")
      .click()
      .type("1111 2222 3333 4444")
      .wait(500)
      .type("{downArrow}{enter}");
    cy.fillNumericTextBox(2, "1");
    cy.editTextarea("Comment", faker.random.words(5));
    cy.getButtonWithText("Save").click();

    cy.clickAndCheckResponse("Save", "POST", "/OnHandAdjustment/Create*", 200);
  });

  it("Create On-Hand Adjustment with Order Arrival", () => {
    cy.openFlyoutAndSelectRandomValue("Technician Code");
    cy.EditInputElement("PackagingSlip", faker.datatype.number(99999));
    cy.get("#toolbarAddOnHandAdjustmentDetail").click();
    cy.get(".entryTitle:contains('On-hand Adjustment Entry')").should(
      "be.visible"
    );
    cy.fillNumericTextBox(0, "3");
    cy.get("input[aria-label='Part Code'][type='text']")
      .type("106")
      .wait(500)
      .type("{downArrow}{enter}");
    cy.get("input[aria-label='Warehouse Code'][type='text']")
      .type("Auto-W1")
      .wait(500)
      .type("{downArrow}{enter}");
    cy.EditInputElement("PONumber", faker.datatype.number(99999));
    cy.fillNumericTextBox(2, "1");
    cy.editTextarea("Comment", faker.random.words(5));
    cy.getButtonWithText("Save").click();

    cy.clickAndCheckResponse("Save", "POST", "/OnHandAdjustment/Create*", 200);
  });

  it("Create On-Hand Adjustment with Issue Part", () => {
    cy.openFlyoutAndSelectRandomValue("Technician Code");
    cy.EditInputElement("PackagingSlip", faker.datatype.number(99999));
    cy.get("#toolbarAddOnHandAdjustmentDetail").click();
    cy.get(".entryTitle:contains('On-hand Adjustment Entry')").should(
      "be.visible"
    );
    cy.fillNumericTextBox(0, "5");
    cy.get("input[aria-label='Part Code'][type='text']")
      .type("106")
      .wait(500)
      .type("{downArrow}{enter}");
    cy.get("input[aria-label='Warehouse Code'][type='text']")
      .type("0225920311")
      .wait(500)
      .type("{downArrow}{enter}");
    cy.get("input[aria-label='Work Order #'][type='text']")
      .click()
      .wait(500)
      .type("1001-1001")
      .wait(1000)
      .type("{downArrow}{enter}");
    cy.fillNumericTextBox(2, "1");
    cy.get("input[aria-label='Account #'][type='text']")
      .click()
      .type("1111 2222 3333 4444")
      .wait(500)
      .type("{downArrow}{enter}");
    cy.editTextarea("Comment", faker.random.words(5));
    cy.getButtonWithText("Save").click();

    cy.clickAndCheckResponse("Save", "POST", "/OnHandAdjustment/Create*", 200);
  });

  it("Create On-Hand Adjustment with Defective Part", () => {
    cy.openFlyoutAndSelectRandomValue("Technician Code");
    cy.EditInputElement("PackagingSlip", faker.datatype.number(99999));
    cy.get("#toolbarAddOnHandAdjustmentDetail").click();
    cy.get(".entryTitle:contains('On-hand Adjustment Entry')").should(
      "be.visible"
    );
    cy.fillNumericTextBox(0, "6");
    cy.get("input[aria-label='Part Code'][type='text']")
      .type("106")
      .wait(500)
      .type("{downArrow}{enter}");
    cy.fillCombobox("Warehouse Code", "Auto-W1");
    cy.fillNumericTextBox(2, "1");
    cy.editTextarea("Comment", faker.random.words(5));
    cy.getButtonWithText("Save").click();

    cy.clickAndCheckResponse("Save", "POST", "/OnHandAdjustment/Create*", 200);
  });

  it("Create On-Hand Adjustment with Set Average Price", () => {
    cy.openFlyoutAndSelectRandomValue("Technician Code");
    cy.EditInputElement("PackagingSlip", faker.datatype.number(99999));
    cy.get("#toolbarAddOnHandAdjustmentDetail").click();
    cy.get(".entryTitle:contains('On-hand Adjustment Entry')").should(
      "be.visible"
    );
    cy.fillNumericTextBox(0, "7");
    cy.get("input[aria-label='Part Code'][type='text']")
      .type("106")
      .wait(500)
      .type("{downArrow}{enter}");
    cy.fillCombobox("Warehouse Code", "Auto-W1");
    cy.editTextarea("Comment", faker.random.words(5));
    cy.getButtonWithText("Save").click();

    cy.clickAndCheckResponse("Save", "POST", "/OnHandAdjustment/Create*", 200);
  });

  it("Create On-Hand Adjustment with Warehouse Relocation", () => {
    cy.openFlyoutAndSelectRandomValue("Technician Code");
    cy.EditInputElement("PackagingSlip", faker.datatype.number(99999));
    cy.get("#toolbarAddOnHandAdjustmentDetail").click();
    cy.get(".entryTitle:contains('On-hand Adjustment Entry')").should(
      "be.visible"
    );
    cy.fillNumericTextBox(0, "14");
    cy.get("input[aria-label='Part Code'][type='text']")
      .type("106")
      .wait(500)
      .type("{downArrow}{enter}");
    cy.fillCombobox("Warehouse Code", "Auto-W1");
    cy.fillCombobox("New Warehouse", "1223343");

    cy.fillNumericTextBox(2, "1");
    cy.editTextarea("Comment", faker.random.words(5));
    cy.getButtonWithText("Save").click();

    cy.clickAndCheckResponse("Save", "POST", "/OnHandAdjustment/Create*", 200);
  });

  it("Create On-Hand Adjustment with All fields", () => {
    cy.openFlyoutAndSelectRandomValue("Technician Code");
    cy.get("input[aria-label='Issue Date']").type(
      new Date().toLocaleDateString("en-US")
    );
    cy.EditInputElement("PackagingSlip", faker.datatype.number(99999));
    cy.get("#toolbarAddOnHandAdjustmentDetail").click();
    cy.get(".entryTitle:contains('On-hand Adjustment Entry')").should(
      "be.visible"
    );
    cy.fillNumericTextBox(0, "1");
    cy.get("input[aria-label='Part Code'][type='text']")
      .type("105")
      .wait(500)
      .type("{downArrow}{enter}");
    cy.fillCombobox("Warehouse Code", "Auto-W1");
    cy.fillNumericTextBox(2, "1");
    cy.editTextarea("Comment", faker.random.words(5));
    cy.getButtonWithText("Save").click();

    cy.clickAndCheckResponse("Save", "POST", "/OnHandAdjustment/Create*", 200);
  });
});
