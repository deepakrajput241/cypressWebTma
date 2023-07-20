import { faker } from "@faker-js/faker";

const data = {
  vehicleID: "102759",
  equipmentID: "487122",
  priorityDescription: "1 - Safety/Regulatory",
  taskCode: "16546246",
  wOTypeDescription: "Auto-Forward",
};

describe(
  "should create Work Order for Item of type Vehicle",
  { tags: "@smoke" },
  () => {
    beforeEach(() => {
      cy.login(Cypress.env("user1"));
      cy.visit("/#!/WorkOrder/Create");
    });

    it("should not create Work Order for Item of type Vehicle when missing required fields", () => {
      // missing 'Item Code'
      cy.get("span[ng-bind='WindowTitle']:contains('Work Order')").should(
        "be.visible"
      );
      cy.fillSelect("Item Type", "Vehicle");
      cy.fillCombobox("WO Type Description", data.wOTypeDescription);
      cy.fillCombobox("Priority Description", data.priorityDescription);
      cy.editTextarea("Request", faker.random.words(5));
      cy.clickAndCheckAlert("Save", "Please select an item or a location");

      // missing "WO Type Description"
      cy.fillCombobox("Item Code", data.vehicleID);
      cy.wait(500);
      cy.clickAndCheckAlert(
        "Save",
        "Task Code is required\r\nTask Desc is required\r\n"
      );

      // missing "WO Type Description"
      cy.fillCombobox("Task Code", data.taskCode);
      cy.clearCombobox("WO Type Description");
      cy.clickAndCheckAlert("Save", "WO Type Description is required\r\n");

      // missing "Priority Description"
      cy.fillCombobox("WO Type Description", data.wOTypeDescription);
      cy.clearCombobox("Priority Description");
      cy.clickAndCheckAlert("Save", "Priority Description is required\r\n");

      //missing "Request"
      cy.fillCombobox("Priority Description", data.priorityDescription);
      cy.clearTextarea("Request");
      cy.clickAndCheckAlert("Save", "Request is required\r\n");

      //missing "Repair Center Code"
      cy.editTextarea("Request", faker.random.words(5));
      cy.clearCombobox("Repair Center Code");
      cy.clickAndCheckAlert("Save", "Repair Center Code is required\r\n");
    });

    it("should create Work Order for Item of type Vehicle with required fields, and then delete", () => {
      cy.get("span[ng-bind='WindowTitle']:contains('Work Order')").should(
        "be.visible"
      );
      cy.fillSelect("Item Type", "Vehicle");
      cy.fillCombobox("Item Code", data.vehicleID);
      cy.fillCombobox("WO Type Description", data.wOTypeDescription);
      cy.editTextarea("Request", faker.random.words(5));
      cy.fillCombobox("Task Code", data.taskCode);
      cy.clearCombobox("Priority Description");
      cy.wait(500);
      cy.fillCombobox("Priority Description", data.priorityDescription);
      cy.clickSaveAndCheckResponse();
      cy.clickDeleteAndCheckResponse();
    });
  }
);
