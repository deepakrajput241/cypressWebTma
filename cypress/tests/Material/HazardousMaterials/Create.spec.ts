import { faker } from "@faker-js/faker";

const data = {
  locationId: "24208140-22",
  manufacturer: "3M",
  typeCode: "Auto-7",
};

function addLocation() {
  cy.contains("Add Location").click();
  cy.fillCombobox("Location ID", data.locationId);
  cy.fillNumericTextBoxInput(
    "Quantity",
    faker.datatype.number({ max: 100, precision: 0.01 }).toString()
  );
  cy.contains("button", "Save").click();
}

function addRepairCenter() {
  cy.contains("Repair Centers").click();
  cy.addRepairCenter();
}

function fillRequiredFields() {
  cy.fillInput("Code", faker.random.numeric(7));
  cy.setWait();
  cy.fillCombobox("Type Code", data.typeCode);
  cy.fillInput("Product/Trade Name", faker.random.words(2));
  addRepairCenter();
}

describe("add Hazardous Material", () => {
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/HazardousMaterial/Create");
  });

  it("should not add Hazardous Material without required fields", () => {
    // missing Code
    fillRequiredFields();
    cy.contains("Identity").click();
    cy.clearInput("Code");
    cy.clickSaveAndCheckAlert("Code is required\r\n");

    // missing Type Code
    cy.reload();
    fillRequiredFields();
    cy.contains("Identity").click();
    cy.clearCombobox("Type Code");
    cy.clickSaveAndCheckAlert(
      "Type Code is required\r\nType Description is required\r\n"
    );

    // missing Product/TradeName
    cy.reload();
    fillRequiredFields();
    cy.contains("Identity").click();
    cy.clearInput("Product/Trade Name");
    cy.clickSaveAndCheckAlert("Product/Trade Name is required\r\n");

    // missing Repair Center
    cy.reload();
    fillRequiredFields();
    // delete Repair Center
    cy.get("tbody a:first").click();
    cy.setWait();
    cy.clickSaveAndCheckAlert(
      " At least 1 record is required for Repair Centers\r\n"
    );
  });

  it(
    "should add Hazardous Material with required fields, and then delete it",
    { tags: "@smoke" },
    () => {
      fillRequiredFields();
      cy.clickSaveAndCheckResponse();

      cy.setWait();
      cy.clickDeleteAndCheckResponse();
    }
  );

  it("should add Hazardous Material with all fields, and then delete it", () => {
    cy.fillInput("Code", faker.random.numeric(7));
    cy.setWait();
    cy.fillCombobox("Type Code", data.typeCode);
    cy.fillInput("CAS #", faker.random.numeric());
    cy.fillCombobox("Manufacturer", data.manufacturer);
    cy.fillDateInput("Expires");
    cy.fillInput("Unit of Measure", faker.science.unit().toString());
    cy.fillInput("Product/Trade Name", faker.commerce.product());
    cy.fillInput("Chemical Name", faker.random.words(1));
    cy.fillInput("Container", faker.random.word());
    cy.fillDateInput("Date Received");
    cy.fillInput("Emergency Phone", faker.phone.number("###-###-####"));
    cy.fillCheckbox("Toxic");
    cy.fillCheckbox("MSDS on File");
    cy.fillInput("MSDS Location", faker.address.streetName());
    cy.fillInput("Site ID", faker.random.numeric(7));
    cy.fillInput("Hazard", faker.random.numeric());
    cy.fillNumericTextBoxInput(
      "Annual Usage",
      faker.datatype.number({ max: 100, precision: 0.0001 }).toString()
    );
    cy.fillInput("Material Form", faker.random.numeric());
    cy.fillInput("Label", faker.random.numeric());
    cy.fillInput("Volume/Weight", faker.random.numeric());
    addLocation();
    cy.fillTextarea("User Precautions", faker.lorem.sentence());
    cy.fillTextarea("Spill Precautions", faker.lorem.sentence());
    cy.fillTextarea("Review For Disposition", faker.lorem.sentence());
    addRepairCenter();
    cy.clickSaveAndCheckResponse();

    cy.setWait();
    cy.clickDeleteAndCheckResponse();
  });
});
