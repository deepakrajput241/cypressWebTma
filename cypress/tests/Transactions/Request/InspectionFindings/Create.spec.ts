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

describe("Create Inspection Findings", () => {
  let InspectId;

  const data = {
    inspectorName: "homogeneous Communications",
    inspectionType: "ADA-OCWR",
  };

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
  });

  it("Inspection Findings -Negative Cases", { tags: "@smoke" }, () => {
    cy.visit("/#!/InspectionFindings/Create");
    cy.openFlyoutAndSelectRandomValue("Inspection Type");
    cy.clickAndCheckAlert("Save", "Finding Description is required\r\n");

    cy.editTextarea("Finding Description", faker.random.words(5));
    cy.get("input[aria-label='Inspection Type']").eq(0).clear();
    cy.clickAndCheckAlert("Save", "Inspection Type is required\r\n");
  });

  it(
    "Create Inspection Finding with Required fields",
    { tags: "@smoke" },
    () => {
      cy.visit("/#!/InspectionFindings/Create");
      cy.openFlyoutAndSelectRandomValue("Inspection Type");
      cy.editTextarea("Finding Description", faker.random.words(5));
      cy.getButton("Save").click();
      checkDuplicateInspectionFindings();
    }
  );

  it("Create Inspection Finding with All Fields", () => {
    cy.visit("/#!/InspectionFindings/Create");
    cy.wait(2000);
    cy.openFlyoutAndSelectRandomValue("Inspection Type");
    cy.fillCheckbox("Already Addressed");
    cy.openFlyoutAndSelectRandomValue("Location ID");
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
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "InspectionFindings/Create*",
      200
    ).then((id) => {
      InspectId = id;
    });
  });

  it("Delete Inspection Findings", () => {
    cy.visit(`/#!/InspectionFindings/${InspectId}`);
    cy.clickDeleteAndCheckResponse();
  });
});
