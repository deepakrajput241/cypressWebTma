import { faker } from "@faker-js/faker";
import { fill } from "cypress/types/lodash";

const data = {
  facilityName: "28245",
  requestType: "BAS Alarm",
};

function fillRequiredFields() {
  cy.fillCombobox("Facility Name", data.facilityName);
  cy.fillCombobox("Request Type", data.requestType);
  cy.fillTextarea("Action Requested", faker.random.words(10));
}

describe("create Request Log", () => {
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/RequestLog/Create");
  });

  it("should not create Request Log without required fields", () => {
    // missing Facility Name
    fillRequiredFields();
    cy.clearCombobox("Facility Name");
    cy.clickAndCheckAlert("Save", "Facility Name is required\r\n");

    // missing Request Type
    cy.reload();
    fillRequiredFields();
    cy.clearCombobox("Request Type");
    cy.clickAndCheckAlert("Save", "Request Type is required\r\n");

    // missing Action Requested
    cy.reload();
    fillRequiredFields();
    cy.clearTextarea("Action Requested");
    cy.clickAndCheckAlert("Save", "Action Requested is required\r\n");
  });

  it(
    "should create Request Log with required fields, and then delete it",
    { tags: "@smoke" },
    () => {
      fillRequiredFields();
      cy.clickSaveAndCheckResponse();

      cy.clickDeleteAndCheckResponse();
    }
  );

  it.skip("should create Request Log with all fields, and then delete it", () => {
    cy.openFlyoutAndSelectRandomValue("Location ID");
    cy.get("select[aria-label='Item Type']").select(4);
    cy.openFlyoutAndSelectRandomValue("Item Tag#");
    cy.openFlyoutAndSelectRandomValue("Status");
    cy.EditInputElement("StatusNote", faker.random.words(3));
    cy.openFlyoutAndSelectRandomValue("Request Type");
    cy.openFlyoutAndSelectRandomValue("Department Name");
    cy.openFlyoutAndSelectRandomValue("Source");
    cy.get("select[aria-label='Select Task']").select(1);
    cy.fillCombobox("Account #", "1233214566");
    cy.openFlyoutAndSelectRandomValue("Task Type/Task Code");
    cy.editTextarea("Action Requested", faker.random.words(5));
    cy.editTextarea("Additional Comments", faker.random.words(5));
    cy.clickSaveAndCheckResponse();

    cy.clickDeleteAndCheckResponse();
  });
});
