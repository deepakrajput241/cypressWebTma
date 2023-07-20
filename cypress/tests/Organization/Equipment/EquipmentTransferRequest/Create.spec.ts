import { faker } from "@faker-js/faker";

describe("Create Equipment Transfer Request", () => {
  const Data = {
    technicianCode: "101",
    newFacilityName: "123",
    requestorName: "Car architectures",
    repairCenter: "SGQ2EL",
  };

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/EquipmentTransferRequest/Create");
  });

  it("Equipment Transfer Request - Negative Cases", () => {
    cy.openFlyoutAndSelectRandomValue("Technician Code");
    cy.fillCombobox("To Facility Name", "Automation Facility");
    cy.clickAndCheckAlert(
      "Save",
      " At least 1 record is required for Transfer Request Detail Grid\r\n"
    );

    cy.get("#toolbarAddItem").click().wait(500);
    cy.selectCheckBoxFromGrid(
      "/html/body/pageslide[1]/div/div/div/div[2]/form/div/div[3]/div/div/div/div/div/div[2]/table/tbody/tr[1]/td[1]/input"
    );
    cy.getButtonWithText("Add Selected").click();
    cy.get("input[aria-label='Technician Code']").eq(0).clear();
    cy.clickAndCheckAlert(
      "Save",
      "Technician Code is required\r\nTechnician Name is required\r\n"
    );

    cy.openFlyoutAndSelectRandomValue("Technician Code");
    cy.get("input[aria-label='New Facility Name']").eq(0).clear();
    cy.clickAndCheckAlert("Save", "New Facility Name is required\r\n");
  });

  it(
    "Create Equipment Transfer Request with required fields",
    { tags: "@smoke" },
    () => {
      cy.openFlyoutAndSelectRandomValue("Technician Code");
      cy.fillCombobox("To Facility Name", "Automation Facility");
      cy.get("#toolbarAddItem").click().wait(500);
      cy.selectCheckBoxFromGrid(
        "/html/body/pageslide[1]/div/div/div/div[2]/form/div/div[3]/div/div/div/div/div/div[2]/table/tbody/tr[1]/td[1]/input"
      );
      cy.getButtonWithText("Add Selected").click();
      cy.clickSaveAndCheckResponse();
    }
  );

  it("Create Equipment Transfer Request with All fields", () => {
    cy.openFlyoutAndSelectRandomValue("Technician Code");
    cy.openFlyoutAndSelectRandomValue("Requestor Name");
    cy.openFlyoutAndSelectRandomValue("Repair Center");
    cy.editTextarea("Comments", faker.random.words(5));
    cy.openFlyoutAndSelectRandomValue("New Location ID");
    cy.openFlyoutAndSelectRandomValue("New Facility Name");
    cy.get("#toolbarAddItem").click().wait(500);
    cy.selectCheckBoxFromGrid(
      "/html/body/pageslide[1]/div/div/div/div[2]/form/div/div[3]/div/div/div/div/div/div[2]/table/tbody/tr[1]/td[1]/input"
    );
    cy.getButtonWithText("Add Selected").click();
    cy.clickSaveAndCheckResponse();
  });
});
