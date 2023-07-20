import { faker } from "@faker-js/faker";
import { fill } from "cypress/types/lodash";

const data = {
  toolId: "17",
  equipmentID: "487122",
  priorityDescription: "1 - Safety/Regulatory",
  repairCenterCode: "100",
  taskCode: "16546246",
  woTypeDescription: "Auto-Forward",
};

function fillRequiredFields() {
  cy.fillSelect("Item Type", "Tool");
  cy.fillCombobox("Item Code", data.toolId);
  // tool with id 17 has an associated Repair Center Code so no need to fill it
  // cy.fillCombobox("Repair Center Code", data.repairCenterCode);
  cy.fillCombobox("WO Type Description", data.woTypeDescription);
  cy.fillCombobox("Priority Description", data.priorityDescription);
  cy.fillTextarea("Request", faker.random.words(5));
  cy.fillCombobox("Task Code", data.taskCode);
}

describe("create Work Order for Item of type Tool", () => {
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/WorkOrder/Create");
  });

  it("should not create Work Order for Item of type Tool without required fields", () => {
    // missing Item Code
    fillRequiredFields();
    cy.clearCombobox("Item Code");
    // tool with id 17 has an associated Location Code so we need to clear it
    cy.clearCombobox("Location Code");
    cy.clickSaveAndCheckAlert("Please select an item or a location");

    //missing Repair Center Code
    cy.reload();
    fillRequiredFields();
    cy.clearCombobox("Repair Center Code");
    cy.clickAndCheckAlert("Save", "Repair Center Code is required\r\n");

    // missing WO Type Description
    cy.reload();
    fillRequiredFields();
    cy.clearCombobox("WO Type Description");
    cy.clickAndCheckAlert("Save", "WO Type Description is required\r\n");

    // missing Priority Description
    cy.reload();
    fillRequiredFields();
    cy.clearCombobox("Priority Description");
    cy.clickAndCheckAlert("Save", "Priority Description is required\r\n");

    //missing Request
    cy.reload();
    fillRequiredFields();
    cy.clearTextarea("Request");
    cy.clickAndCheckAlert("Save", "Request is required\r\n");

    // missing Task Code
    cy.reload();
    fillRequiredFields();
    cy.clearCombobox("Task Code");
    cy.clickSaveAndCheckAlert(
      "Task Code is required\r\nTask Desc is required\r\n"
    );
  });

  it(
    "should create Work Order for Item of type Tool with required fields, and then delete it",
    { tags: "@smoke" },
    () => {
      fillRequiredFields();

      cy.clickSaveAndCheckResponse();
      cy.clickDeleteAndCheckResponse();
    }
  );
});
