import { faker } from "@faker-js/faker";

describe("Create new Master Inpsction Check", () => {
  const data = {
    repairCenter: "SGQ2EL",
    taskCode: "000000",
    woType: "PM",
    trade: "Admin",
  };

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/MasterInspectionCheck/Create");
  });

  it("Master Inspection Check - Negative Cases", () => {
    cy.openFlyoutAndSelectRandomValue("Priority");
    cy.clickAndCheckAlert("Save", "Description is required\r\n");
  });

  it(
    "Create Master Inspection Check with Required Fields",
    { tags: "@smoke" },
    () => {
      cy.editTextarea("Description", faker.random.words(5));
      cy.clickSaveAndCheckResponse();
    }
  );

  it("Create Master Inspection Check with All Fields", () => {
    cy.editTextarea("Description", faker.random.words(5));
    cy.fillCheckbox("Pass / Fail");
    cy.fillCheckbox("Reading");
    cy.fillCheckbox("Rating");
    cy.fillCheckbox("Comments");
    cy.openFlyoutAndSelectRandomValue("Priority");
    cy.openFlyoutAndSelectRandomValue("Task Code");
    cy.openFlyoutAndSelectRandomValue("WO Type");
    cy.openFlyoutAndSelectRandomValue("Trade");
    cy.clickSaveAndCheckResponse();
  });
});
