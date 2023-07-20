import { faker } from "@faker-js/faker";

const data = {
  assetId: "101",
  priorityDescription: "1 - Safety/Regulatory",
  taskCode: "16546246",
  woTypeDescription: "Auto-Forward",
};

function fillRequiredFields() {
  cy.fillSelect("Item Type", "Asset");
  cy.fillCombobox("Item Code", data.assetId);
  cy.fillCombobox("WO Type Description", data.woTypeDescription);
  cy.fillCombobox("Priority Description", data.priorityDescription);
  cy.fillTextarea("Request", faker.random.words(5));
  cy.fillCombobox("Task Code", data.taskCode);
}

describe("add Work Order for Item of type Asset", () => {
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/WorkOrder/Create");
  });

  it("should not add Work Order for Item of type Asset without required fields", () => {
    // missing Item Code
    fillRequiredFields();
    // because item with id 101 has an associated facility, we need to clear both
    cy.clearCombobox("Location Code");
    cy.clearCombobox("Item Code");
    cy.clickSaveAndCheckAlert("Please select an item or a location");

    // missing Repair Center Code
    cy.reload();
    fillRequiredFields();
    cy.clearCombobox("Repair Center Code");
    cy.clickSaveAndCheckAlert("Repair Center Code is required\r\n");

    // missing WO Type Description
    cy.reload();
    fillRequiredFields();
    cy.clearCombobox("WO Type Description");
    cy.clickSaveAndCheckAlert("WO Type Description is required\r\n");

    // missing Priority Description
    cy.reload();
    fillRequiredFields();
    cy.clearCombobox("Priority Description");
    cy.clickSaveAndCheckAlert("Priority Description is required\r\n");

    // missing Request
    cy.reload();
    fillRequiredFields();
    cy.clearTextarea("Request");
    cy.clickSaveAndCheckAlert("Request is required\r\n");

    // missing Task Code
    cy.reload();
    fillRequiredFields();
    cy.clearCombobox("Task Code");
    cy.clickSaveAndCheckAlert(
      "Task Code is required\r\nTask Desc is required\r\n"
    );
  });

  it(
    "should add Work Order for Item of type Asset with required fields, and then delete it",
    { tags: "@smoke" },
    () => {
      fillRequiredFields();
      cy.clickSaveAndCheckResponse();

      cy.clickDeleteAndCheckResponse();
    }
  );
});
