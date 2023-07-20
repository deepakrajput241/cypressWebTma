import { faker } from "@faker-js/faker";
import { fill } from "cypress/types/lodash";
import { closeSync } from "fs";

const data = {
  areaFunction: "architectures",
  areaType: "Athletics",
  building: "Academic Boydston",
  facility: "School District",
  lockOut: "Auto_210",
  parentArea: "ADMIN-100",
  portfolioManagerId: "101",
};

function fillRequiredFields() {
  cy.fillCombobox("Facility", data.facility);
  cy.fillCombobox("Building", data.building);
  cy.fillInput("Area #", faker.random.numeric(5));
  cy.fillCombobox("Area Type", data.areaType);
}

describe("create Areas", () => {
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/Area/Create");
  });

  it("should not create Area without required fields", () => {
    // missing Facility
    fillRequiredFields();
    cy.clearCombobox("Facility");
    cy.clickSaveAndCheckAlert(
      "Facility is required\r\nBuilding is required\r\n"
    );

    // missing Building
    cy.reload();
    fillRequiredFields();
    cy.clearCombobox("Building");
    cy.clickSaveAndCheckAlert("Building is required\r\n");

    // missing Area Number
    cy.reload();
    fillRequiredFields();
    cy.clearInput("Area #");
    cy.clickSaveAndCheckAlert("Area # is required\r\n");

    // missing Area Type
    cy.reload();
    fillRequiredFields();
    cy.clearCombobox("Area Type");
    cy.clickSaveAndCheckAlert("Area Type is required\r\n");

    // missing Area Description
    cy.reload();
    fillRequiredFields();
    cy.clearInput("Area Description");
    cy.clickSaveAndCheckAlert("Area Description is required\r\n");
  });

  it(
    "should create Area with required fields, and then delete it",
    { tags: "@smoke" },
    () => {
      fillRequiredFields();
      cy.clickSaveAndCheckResponse();

      cy.clickDeleteAndCheckResponse();
    }
  );

  it.skip("Create Record with All fields", () => {
    cy.fillCombobox("Facility", "Automation Facility");
    cy.openFlyoutAndSelectRandomValue("Building");
    cy.EditInputElement("RoomNumber", faker.datatype.number(9999999));
    cy.openFlyoutAndSelectRandomValue("Area Type");
    cy.openFlyoutAndSelectRandomValue("Parent Area");
    cy.openFlyoutAndSelectRandomValue("Portfolio Manager ID");
    cy.openFlyoutAndSelectRandomValue("Portfolio Manager Name");
    cy.EditInputElement("Phone", faker.phone.phoneNumber("###-###-###"));
    cy.openFlyoutAndSelectRandomValue("Lock-out #");
    cy.openFlyoutAndSelectRandomValue("Area Function");
    cy.get("select[aria-label='Gender']").should("be.visible").select(1);
    cy.fillNumericTextBox(0, faker.datatype.number(1000));
    cy.fillNumericTextBox(1, faker.datatype.number(1000));
    cy.EditInputElement("MailStop", faker.random.words(2));
    cy.fillNumericTextBox(2, faker.datatype.number(1000));
    cy.fillNumericTextBox(3, faker.datatype.number(1000));
    cy.fillDateInput(
      "Warranty Date",
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.EditInputElement("Latitude", faker.address.latitude());
    cy.EditInputElement("Longitude", faker.address.longitude());
    cy.EditInputElement("GISUniqueId", faker.random.words(1));
    cy.get("input[aria-label='Katrina UDF']")
      .should("be.visible")
      .type(faker.random.words(1));
    cy.fillCheckbox("Asbestos");
    cy.fillCheckbox("Hazardous Materials");
    cy.fillCheckbox("Lead");
    cy.fillCheckbox("Mold");
    cy.fillCheckbox("Assignable Space");
    cy.fillCheckbox("Confined Space Perm");
    cy.fillCheckbox("Off-site Property");
    cy.fillCheckbox("In Leasable Portfolio");
    cy.fillCheckbox("Exclude From Requestor");
    cy.fillCheckbox("Inspections Req");
    cy.fillCheckbox("Sublet");
    cy.fillCheckbox("Prevent Override");
    cy.editTextarea("Popup Message", faker.random.words(10));

    cy.contains("Misc").click();
    cy.EditInputElement("Sink", faker.random.words(1));
    cy.EditInputElement("Plumbing1", faker.random.words(1));
    cy.EditInputElement("Toilet", faker.random.words(1));
    cy.EditInputElement("Plumbing2", faker.random.words(1));
    cy.EditInputElement("Urinal", faker.random.words(1));
    cy.EditInputElement("Plumbing3", faker.random.words(1));
    cy.EditInputElement("Shower", faker.random.words(1));
    cy.EditInputElement("PaintCeiling", faker.random.words(1));
    cy.EditInputElement("PaintTrim", faker.random.words(1));
    cy.EditInputElement("PaintWall", faker.random.words(1));
    cy.EditInputElement("LightFixture", faker.random.words(1));
    cy.EditInputElement("LightBulb", faker.random.words(1));
    cy.EditInputElement("HVAC1", faker.random.words(1));
    cy.EditInputElement("HVAC2", faker.random.words(1));
    cy.EditInputElement("HVAC3", faker.random.words(1));
    cy.EditInputElement("LifeSafety1", faker.random.words(1));
    cy.EditInputElement("LifeSafety2", faker.random.words(1));
    cy.fillDateInput(
      "Last Painted",
      faker.date.recent().toLocaleDateString("en-US")
    );
    cy.get("input[aria-label='Replaced']")
      .eq(0)
      .type(new Date().toLocaleDateString("en-US"));
    cy.get("input[aria-label='Replaced']")
      .eq(1)
      .type(new Date().toLocaleDateString("en-US"));
    cy.fillDateInput(
      "Cleaned",
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.fillDateInput(
      "Detector Checked",
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.fillDateInput(
      "Fire Ext. Checked",
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.openFlyoutAndSelectRandomValue("Flooring1");
    cy.openFlyoutAndSelectRandomValue("Flooring 2");
    cy.fillDateInput(
      "Curtain or Drapes Last Cleaned",
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.fillDateInput(
      "Curtain or Drapes Last Replaced",
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.get("#toolbarAddDoor").should("be.visible").click();
    cy.editTextarea("Detail", faker.random.words(5));
    cy.getButtonWithText("Save").click();
    cy.get("#toolbarAddWindow").should("be.visible").click();
    cy.editTextarea("Detail", faker.random.words(5));
    cy.getButtonWithText("Save").click();

    cy.contains("Department").click();
    cy.get("#toolbarAddDepartment").should("be.visible").click();
    cy.selectRandomCheckBoxFromGrid(
      1,
      "/html/body/pageslide[1]/div/div/div/div[2]/form/div/div/div/div[2]/table/tbody/tr[1]/td[1]/input"
    );
    cy.getButtonWithText("Add Selected").click();

    cy.clickSaveAndCheckResponse();
  });
});
