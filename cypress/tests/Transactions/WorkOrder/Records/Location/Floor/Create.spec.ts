import { faker } from "@faker-js/faker";

const data = {
  locationCode: "321321-1",
  priorityDescription: "2 - Emergency (Immediate)",
  repairCenterCode: "10037",
  supervisorName: "513103",
  taskCode: "18660097",
  woTypeDescription: "Administrative",
};

function fillRequiredFields() {
  cy.fillSelect("Location Type", "Floor");
  cy.fillCombobox("Location Code", data.locationCode);
  cy.fillCombobox("Repair Center Code", data.repairCenterCode);
  cy.fillCombobox("WO Type Description", data.woTypeDescription);
  cy.fillCombobox("Priority Description", data.priorityDescription);
  cy.fillTextarea("Request", faker.random.words(5));
  cy.fillCombobox("Task Code", data.taskCode);
}

describe("should create Work Order for Location of type Floor", () => {
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/WorkOrder/Create");
  });

  it("should not create Work Order for Location of type Floor without required fields", () => {
    // missing Location Code
    fillRequiredFields();
    cy.clearCombobox("Location Code");
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
    "should create Work Order for Location of type Floor with required fields, and then delete it",
    { tags: "@smoke" },
    () => {
      fillRequiredFields();
      cy.clickSaveAndCheckResponse();

      cy.clickDeleteAndCheckResponse();
    }
  );
});
