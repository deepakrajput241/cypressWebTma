import { faker } from "@faker-js/faker";

describe("Create RI Inspection", () => {
  const data = {
    formCode: "962488849",
    repairCenterCode: "SGQ2EL",
    resultTypeCode: "RI Results",
  };

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/RoomInspection/Create");
  });

  it("RI Inspection - Negative Cases", () => {
    cy.EditInputElement("Description", faker.random.words(2));
    cy.openFlyoutAndSelectRandomValue("Repair Center Code");
    cy.openFlyoutAndSelectRandomValue("Result Type Code");
    cy.get("input[aria-label='Inspection Date']").type(
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.clickAndCheckAlert("Save", "Form Code is required\r\n");

    cy.openFlyoutAndSelectRandomValue("Form Code");
    cy.get("input[aria-label='Repair Center Code']").eq(0).clear();
    cy.clickAndCheckAlert("Save", "Repair Center Code is required\r\n");

    cy.openFlyoutAndSelectRandomValue("Repair Center Code");
    cy.get("input[aria-label='Result Type Code']").eq(0).clear();
    cy.clickAndCheckAlert("Save", "Result Type Code is required\r\n");

    cy.openFlyoutAndSelectRandomValue("Result Type Code");
    cy.get("input[name='Description']").clear();
    cy.clickAndCheckAlert("Save", " Description is required\r\n");

    cy.EditInputElement("Description", faker.random.words(2));
    cy.get("input[aria-label='Inspection Date']").clear();
    cy.clickAndCheckAlert("Save", "Inspection Date is required\r\n");
  });

  it("Create RI Inspection with required fields", { tags: "@smoke" }, () => {
    cy.EditInputElement("Description", faker.random.words(2));
    cy.openFlyoutAndSelectRandomValue("Form Code");
    cy.openFlyoutAndSelectRandomValue("Repair Center Code");
    cy.openFlyoutAndSelectRandomValue("Result Type Code");
    cy.fillDateInput(
      "Inspection Date",
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.clickSaveAndCheckResponse();
  });

  it("Create RI Inspection with All fields", () => {
    cy.EditInputElement("Description", faker.random.words(2));
    cy.openFlyoutAndSelectRandomValue("Form Code");
    cy.openFlyoutAndSelectRandomValue("Repair Center Code");
    cy.openFlyoutAndSelectRandomValue("Result Type Code");
    cy.fillDateInput(
      "Inspection Date",
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.get("#toolbarAddArea").click();
    cy.selectRandomCheckBoxFromGrid(
      1,
      "/html/body/pageslide[1]/div/div/div/div[2]/form/div/div[3]/div/div/div/div/div/div[2]/table/tbody/tr[1]/td[1]/input"
    );
    cy.getButtonWithText("Add Selected").click();
    cy.contains("Inspector").click();
    cy.get("#toolbarAddInspector").click();
    cy.selectRandomCheckBoxFromGrid(
      1,
      "/html/body/pageslide[1]/div/div/div/div[2]/form/div/div/div/div[2]/table/tbody/tr[1]/td[1]/input"
    );
    cy.getButtonWithText("Add Selected").click();
    cy.clickSaveAndCheckResponse();
  });
});
