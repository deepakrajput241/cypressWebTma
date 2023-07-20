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

describe("Accept And Reject Inspection Finding Request", () => {
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/InspectionFindings/Create");
  });

  it("Create new Record and Accept", () => {
    cy.openFlyoutAndSelectRandomValue("Inspection Type");
    cy.editTextarea("Finding Description", faker.random.words(5));
    cy.getButton("Save").click();
    checkDuplicateInspectionFindings();
    cy.wait(2000);
    cy.editTextarea("Reject/Hold Reason", faker.random.words(3));
    cy.get("input[name='AcceptBtn']").click();
    checkPopUp();
    cy.openFlyoutAndSelectRandomValue("Priority");
    cy.openFlyoutAndSelectRandomValue("Task Code");
    cy.openFlyoutAndSelectRandomValue("Repair Center");
    cy.openFlyoutAndSelectRandomValue("WO Type");
    cy.getButtonWithText("Save").click();
  });

  it("Create new Record and Reject", () => {
    cy.openFlyoutAndSelectRandomValue("Inspection Type");
    cy.editTextarea("Finding Description", faker.random.words(5));
    cy.getButton("Save").click();
    checkDuplicateInspectionFindings();
    cy.wait(500);
    cy.editTextarea("Reject/Hold Reason", faker.random.words(2));
    cy.get("input[name='RejectBtn']").click();
    cy.openFlyoutAndSelectRandomValue("Repair Center Code");
    cy.get("a[aria-label='Proceed']").click();
  });
});
