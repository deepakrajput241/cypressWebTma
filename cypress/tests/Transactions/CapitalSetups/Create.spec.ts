import { faker } from "@faker-js/faker";

function fillRequiredFields() {
  cy.fillInput("Code", faker.random.numeric(5));
  // no idea why this is needed, but it is
  cy.wait(500);
  cy.fillInput("Description", faker.random.words(5));
  // no idea why this si needed, but it is
  cy.wait(500);
}

describe("create Capital Setups", () => {
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/CPSetup/Create");
  });

  it("should not create Capital Setup without required fields", () => {
    // missing Code
    fillRequiredFields();
    cy.clearInput("Code");
    cy.clickSaveAndCheckAlert("Code is required\r\n");
    // missing Description
    cy.reload();
    fillRequiredFields();
    cy.clearInput("Description");
    cy.clickSaveAndCheckAlert("Description is required\r\n");
  });

  it(
    "should create Capital Setup with required fields, and then delete it",
    { tags: "@smoke" },
    () => {
      fillRequiredFields();
      cy.clickSaveAndCheckResponse();

      cy.clickDeleteAndCheckResponse();
    }
  );

  it.skip("Create Capital Setup with All Fields", () => {
    cy.EditInputElement("Code", faker.datatype.number(99999));
    cy.EditInputElement("Description", faker.random.words(2));
    cy.openFlyoutAndSelectRandomValue("WE Risk");
    cy.get("#toolbarAddEstimate").click();
    cy.openFlyoutAndSelectRandomValue("Markup Code");
    cy.getButtonWithText("Save").click();
    cy.get("#toolbarAddUtility").click();
    cy.fillNumericTextBox(0, faker.datatype.number(10));
    cy.fillCombobox("Utility Service Code", 2);
    cy.fillCombobox("Service Type", 2);
    cy.getButtonWithText("Save").click();
    cy.contains("Inflation Rates").click();
    cy.get("#toolbarAddYear").should("be.visible").click();
    cy.fillNumericTextBox(2, faker.datatype.number(100));
    cy.fillNumericTextBox(1, faker.datatype.number({ min: 2022, max: 2030 }));
    cy.getButtonWithText("Save").click();
    cy.contains("Facility Link").click();
    cy.get("#toolbarAddFacility").click();
    cy.selectCheckBoxFromGrid(
      "/html/body/pageslide[1]/div/div/div/div[2]/form/div/div/tma-data-grid/div/div[2]/table/tbody/tr[1]/td[1]/input"
    );
    cy.getButtonWithText("Save").click();
    cy.contains("Worksheet").click();
    cy.get("select[aria-label='Start Month']").select(1);
    cy.fillNumericTextBox(0, faker.datatype.number({ min: 2022, max: 2050 }));
    cy.get("select[aria-label='Budget Type']").select(1);
    cy.fillNumericTextBox(1, faker.datatype.number(100));
    cy.clickSaveAndCheckResponse();

    cy.clickDeleteAndCheckResponse();
  });
});
