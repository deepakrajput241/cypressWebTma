import { faker } from "@faker-js/faker";

function clickOnAddItem() {
  cy.get("#toolbarAddGroupItem").should("be.visible").click();
  cy.wait(1000);
  for (var i = 1; i <= 2; i++) {
    cy.get(".k-grid-content.k-auto-scrollable")
      .find("tr")
      .then((row) =>
        cy
          .xpath(
            `//*[@id="itemSelection"]/div[2]/table/tbody/tr[${Cypress._.random(
              0,
              row.length - 1
            )}]/td[1]`
          )
          .click()
      );
  }
  cy.getButtonWithText("Add Selected").click();
}

describe("Create New Group", () => {
  const data = { lockOutProc: "DB-Test" };

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/Group/Create");
  });

  it("Group - Negative Cases", () => {
    cy.EditInputElement("TagNumber", faker.datatype.number(999999999));
    cy.EditInputElement("Description", faker.random.words(2));
    cy.clickAndCheckAlert(
      "Save",
      " At least 1 record is required for Group Items Grid\r\n"
    );

    clickOnAddItem();
    cy.get("input[name='TagNumber']").clear();
    cy.clickAndCheckAlert("Save", "Group ID is required\r\n");

    cy.EditInputElement("TagNumber", faker.datatype.number(999999999));
    cy.get("input[name='Description']").clear();
    cy.clickAndCheckAlert("Save", "Group Name is required\r\n");

    cy.EditInputElement("Description", faker.random.words(5));
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "/Group/Create?*",
      200,
      "Error",
      "Repair Centers\r\n\r\nAt least 1 record is required for Group Repair Center Grid\r\n"
    );
  });

  it("Create New Group with Required Fields", { tags: "@smoke" }, () => {
    cy.EditInputElement("TagNumber", faker.datatype.number(999999999));
    cy.EditInputElement("Description", faker.random.words(5));
    clickOnAddItem();
    cy.selectRepairCenter();
    cy.clickSaveAndCheckResponse();
  });

  it("Create New Group With All Fields", () => {
    cy.EditInputElement("TagNumber", faker.datatype.number(99999));
    cy.EditInputElement("Description", faker.random.words(5));
    cy.openFlyoutAndSelectRandomValue("Lock-out Proc");
    cy.editTextarea("Popup Message", faker.random.words(5));
    clickOnAddItem();
    cy.selectRepairCenter();

    cy.contains("PMs").click();
    cy.get("#DefaultAddPm").click();
    cy.fillCombobox("Task Code", 3);
    cy.fillCombobox("Repair Center", 3);
    cy.fillCombobox("Work Order Type", 3);
    cy.fillCombobox("Priority Code", 3);
    cy.fillCombobox("Trade", 3);
    cy.fillCombobox("Department", 3);
    cy.fillCombobox("Account #", 3);
    cy.fillCombobox("Technician Code", 3);
    cy.fillCombobox("Rate Schedule", 3);
    cy.fillCombobox("Warehouse Code", 3);
    cy.fillCheckbox("Charge");
    cy.fillNumericTextBox(0, faker.datatype.number(10));
    cy.fillNumericTextBox(1, faker.datatype.number(10));
    cy.get("input[aria-label='Next PM Date']").type(
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.fillNumericTextBox(2, faker.datatype.number(10));
    cy.get("select[aria-label='Recurrence']").select(2);
    cy.getButtonWithText("Save").click();

    cy.clickSaveAndCheckResponse();
  });
});
