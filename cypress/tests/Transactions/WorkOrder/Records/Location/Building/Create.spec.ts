import { faker } from "@faker-js/faker";

const data = {
  locationCode: "20831460",
  priorityDescription: "2 - Emergency (Immediate)",
  repairCenterCode: "10037",
  supervisorName: "513103",
  taskCode: "58476024",
  woTypeDescription: "Administrative",
};

function fillRequiredFields() {
  cy.fillSelect("Location Type", "Building");
  cy.fillCombobox("Location Code", data.locationCode);
  cy.fillCombobox("Repair Center Code", data.repairCenterCode);
  cy.fillCombobox("WO Type Description", data.woTypeDescription);
  cy.fillCombobox("Priority Description", data.priorityDescription);
  cy.fillTextarea("Request", faker.random.words(10));
  cy.fillCombobox("Task Code", data.taskCode);
}

describe("create Work Order for Location of type Building", () => {
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/WorkOrder/Create");
  });

  it("should not create Work Order for Location of type Building without required fields", () => {
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
  });

  it(
    "should create Work Order for Location of type Building with required fields, and then delete it",
    { tags: "@smoke" },
    () => {
      fillRequiredFields();
      cy.clickSaveAndCheckResponse();

      cy.clickDeleteAndCheckResponse();
    }
  );
});
