import { faker } from "@faker-js/faker";
function checkPopUp() {
  cy.wait(2000); // Without wait it will throw error.
  cy.get("body[ng-controller='MainController as mainCtrl']").then(($popup) => {
    if ($popup.text().includes("Popup Message")) {
      cy.wait(1000);
      cy.get("button[ng-click='cancel()']").click();
    } else {
      cy.log("Nothing to display.");
    }
  });
}
function checkDuplicateInspectionFindings() {
  cy.wait(1000); // Without wait it will throw error.
  cy.get("body[ng-controller='MainController as mainCtrl']").then(($popup1) => {
    if ($popup1.text().includes("Duplicate Inspection Findings")) {
      cy.wait(1000);
      cy.getButtonWithText("Proceed").click();
    } else {
      cy.log("Nothing to display.");
    }
  });
}

describe("Copy, Edit and Delete a Inspection Finding", () => {
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
  });

  it("Search for a record on Action menu and Copy", () => {
    cy.visit("/#!/InspectionFindings");

    cy.getButton("Copy").click();
    cy.get(
      "input[aria-label='Inspection Date'][k-options='dateTimeCtrl.dateOptions']"
    ).type(faker.date.future().toLocaleDateString("en-US"));
    cy.editTextarea("Finding Description", faker.random.words(5));
    cy.getButton("Save").click();
    checkDuplicateInspectionFindings();
  });

  it("Edit Inspection Finding", () => {
    cy.visit("/#!/InspectionFindings/Create");
    cy.wait(2000);
    cy.openFlyoutAndSelectRandomValue("Inspection Type");
    cy.fillCheckbox("Already Addressed");
    cy.openFlyoutAndSelectRandomValue("Location ID");
    cy.wait(1000);
    checkPopUp();
    cy.openFlyoutAndSelectRandomValue("Organization Name");
    cy.openFlyoutAndSelectRandomValue("Jurisdiction Name");
    cy.get("select[aria-label='Item Type']").select(4);
    cy.openFlyoutAndSelectRandomValue("Item Tag#");
    cy.openFlyoutAndSelectRandomValue("Status");
    cy.EditInputElement("StatusNote", faker.random.words(1));
    cy.get("select[aria-label='Select Task']").select(1);
    cy.openFlyoutAndSelectRandomValue("Regulatory Body");
    cy.fillNumericTextBox(0, faker.datatype.number(1000));
    cy.EditInputElement("ExposureFrequency", faker.datatype.number(1000));
    cy.fillNumericTextBox(1, faker.datatype.number(1000));
    cy.fillNumericTextBox(2, faker.datatype.number(1000));
    cy.editTextarea("Finding Description", faker.random.words(5));
    cy.editTextarea("Recommendation", faker.random.words(5));
    cy.get("select[aria-label='Classification']").select(1);
    cy.getButton("Save").click();
    cy.getButton("Edit").click();
    cy.wait(2000);
    cy.openFlyoutAndSelectRandomValue("Inspection Type");
    cy.fillCheckbox("Already Addressed");
    cy.openFlyoutAndSelectRandomValue("Location ID");
    checkPopUp();
    cy.openFlyoutAndSelectRandomValue("Organization Name");
    cy.openFlyoutAndSelectRandomValue("Jurisdiction Name");
    cy.getButton("Save").click();
  });

  it("Delete Inspection Finding", () => {
    cy.visit("/#!/InspectionFindings");
    cy.clickDeleteAndCheckResponse();
  });
});
