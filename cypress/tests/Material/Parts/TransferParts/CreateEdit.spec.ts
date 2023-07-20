import { faker } from "@faker-js/faker";

const data = {
  accountCredited: "1514 1514 1514 1514 1514 1514",
  accountCredited2: "1013 1013 1013 1013 1013 1013",
  budgetCode: "1099",
  currentWhCode: "1111111",
  newWhCode: "116934",
  repairCenterCode: "SGQ2EL",
  technicianId: "101",
};

function addParts() {
  cy.contains("Add Parts").click();
  cy.get("table[role='treegrid'] input[type='checkbox']").first().check();
  cy.get("input[ng-model='dataItem.Quantity']").first().type("1");
  cy.contains("button", "Save").click();
}

describe("should create and edit 'Transfer Parts'", () => {
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/PartTransfer/Create");
  });

  it(
    "should not create a 'Transfer Parts' when required fields missing",
    { tags: "@smoke" },
    () => {
      // missing part
      cy.clearInput("Date");
      cy.fillDateInput("Date", faker.date.recent().toLocaleDateString("en-US"));
      cy.fillCombobox("Technician ID", data.technicianId);
      cy.fillCombobox("Current WH Code", data.currentWhCode);
      cy.fillCombobox("Repair Center Code", data.repairCenterCode);
      cy.fillCombobox("New WH Code", data.newWhCode);
      cy.clickSaveAndCheckAlert("Atleast one Line is Required");

      // missing technician
      addParts();
      cy.clearCombobox("Technician ID");
      cy.clickSaveAndCheckAlert(
        "Technician ID is required\r\nTechnician Name is required\r\n"
      );
    }
  );

  it(
    "should create a 'Transfer Parts' with required fields, and then edit it",
    { tags: "@smoke" },
    () => {
      cy.clearInput("Date");
      cy.fillDateInput("Date", faker.date.recent().toLocaleDateString("en-US"));
      cy.fillCombobox("Technician ID", data.technicianId);
      cy.fillCombobox("Current WH Code", data.currentWhCode);
      cy.fillCombobox("New WH Code", data.newWhCode);
      addParts();
      cy.clickSaveAndCheckResponse();

      // edit
      cy.contains("Edit").click();
      cy.fillCombobox("Account Credited", data.accountCredited);
      cy.clickSaveAfterEditAndCheckResponse();
    }
  );

  // we reverse Current WH Code and New WH Code to rebalance the inventory
  it("should create a 'Transfer Parts' with all fields", () => {
    cy.clearInput("Date");
    cy.fillDateInput("Date", faker.date.recent().toLocaleDateString("en-US"));
    cy.fillCombobox("Technician ID", data.technicianId);
    cy.fillCombobox("Current WH Code", data.newWhCode);
    cy.fillCombobox("Account Credited", data.accountCredited);
    cy.fillCombobox("Repair Center Code", data.repairCenterCode);
    cy.fillCombobox("New WH Code", data.currentWhCode);
    cy.fillCombobox("Account Charged", 1);
    cy.fillCheckbox("Charge");
    cy.fillCheckbox("Markup");
    cy.fillTextarea("Comments", faker.random.words(5));
    addParts();
    cy.clickSaveAndCheckResponse();
  });
});
