import { faker } from "@faker-js/faker";

const data = {
  refrigerantType: "Auto test",
  vendorName: "3M",
  subType: "Auto test-1",
  locationID: "321321-560",
  repairCenter: "Auto-01",
};

function fillRequiredFieldsExceptRepairCenter() {
  cy.fillInput("Tag", faker.random.numeric(5));
  cy.fillCombobox("Refrigerant Type", "Auto test");
  cy.fillCombobox("Vendor Name", "3M");
  cy.openFlyoutAndSelectRandomValue("Location ID");
}

describe("create Refrigerant", () => {
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/Refrigerant/Create");
  });

  it("should not create Refrigerant without required fields", () => {
    // missing Tag
    fillRequiredFieldsExceptRepairCenter();
    cy.clearInput("Tag");
    cy.clickSaveAndCheckAlert("Tag is required\r\n");

    // missing Refrigerant Type
    cy.reload();
    fillRequiredFieldsExceptRepairCenter();
    cy.clearCombobox("Refrigerant Type");
    cy.clickSaveAndCheckAlert("Refrigerant Type is required\r\n");

    // missing Vendor Name
    cy.reload();
    fillRequiredFieldsExceptRepairCenter();
    cy.clearCombobox("Vendor Name");
    cy.clickSaveAndCheckAlert("Vendor Name is required\r\n");

    // missing Location ID
    cy.reload();
    fillRequiredFieldsExceptRepairCenter();
    cy.clearCombobox("Location ID");
    cy.clickSaveAndCheckAlert("Location ID is required\r\n");

    // missing Repair Center
    cy.reload();
    fillRequiredFieldsExceptRepairCenter();
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "/Refrigerant/Create*",
      200,
      "Error",
      "Repair Centers\r\n\r\nAt least 1 record is required for Refrigerant Repair Center Gid\r\n"
    );
  });

  it(
    "Create Refrigerant record with Required fields",
    { tags: "@smoke" },
    () => {
      fillRequiredFieldsExceptRepairCenter();
      cy.contains("Repair Centers").click();
      cy.addRepairCenter();
      cy.clickSaveAndCheckResponse();
      // the wait makes this run smoothly
      cy.wait(500);
      cy.clickDeleteAndCheckResponse();
    }
  );

  it.skip("Create Refrigerant record with All fields", () => {
    cy.EditInputElement("TagNumber", faker.datatype.number(9999999));
    cy.openFlyoutAndSelectRandomValue("Refrigerant Type");
    cy.EditInputElement("Size", faker.datatype.number(99));
    cy.EditInputElement("Condition", faker.random.words(1));
    cy.fillDateInput(
      "Purchased Date",
      faker.date.recent().toLocaleDateString("en-US")
    );
    cy.openFlyoutAndSelectRandomValue("Vendor Name");
    cy.EditInputElement("PONumber", faker.datatype.number(99999));
    cy.fillNumericTextBox(0, faker.datatype.number(999));
    cy.fillNumericTextBox(1, faker.datatype.number(999));
    cy.fillDateInput(
      "Retired Date",
      faker.date.recent().toLocaleDateString("en-US")
    );
    cy.EditInputElement("DisposalSite", faker.random.words(1));
    cy.openFlyoutAndSelectRandomValue("Location ID");
    cy.selectRepairCenter();
    cy.clickSaveAndCheckResponse();
    // the wait makes this run smoothly
    cy.wait(500);
    cy.clickDeleteAndCheckResponse();
  });
});
