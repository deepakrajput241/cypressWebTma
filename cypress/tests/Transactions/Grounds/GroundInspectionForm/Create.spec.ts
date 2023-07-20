import { faker } from "@faker-js/faker";
import { fill } from "cypress/types/lodash";

const data = {
  formCode: "u1",
  resultTypeCode: "test",
  repairCenterCode: "12355",
  type: "4551051",
};

function addArea() {
  cy.contains("Add Area").click();
  cy.get("tbody input").first().check();
  cy.contains("button", "Add Selected").click();
}

function addRepairCenter() {
  cy.contains("Repair Centers").click();
  cy.addRepairCenter();
}

function addRoute() {
  cy.contains("Add Route").click();
  cy.get("tbody input").first().check();
  cy.contains("button", "Add Selected").click();
}

function fillRequiredFields() {
  cy.fillInput("Code", faker.random.numeric(5));
  cy.fillCombobox("Type", data.type);
  cy.fillInput("Description", faker.random.words(3));
  cy.fillCombobox("Repair Center Code", data.repairCenterCode);
  cy.get("[aria-label='Random %'] input").first().type(faker.random.numeric(2));
  addRoute();
  addArea();
  addRepairCenter();
}

describe("create Grounds Inspection Forms", () => {
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("#!/GRNInspectionForm/Create");
  });

  it("should not create Ground Inspection Form without required fields", () => {
    // missing Code
    fillRequiredFields();
    cy.contains("Identity").click();
    cy.clearInput("Code");
    cy.clickSaveAndCheckAlert("Code is required\r\n");

    // missing Type
    cy.reload();
    fillRequiredFields();
    cy.contains("Identity").click();
    cy.clearCombobox("Type");
    cy.clickSaveAndCheckAlert("Type is required\r\n");

    // missing Description
    cy.reload();
    fillRequiredFields();
    cy.contains("Identity").click();
    cy.clearInput("Description");
    cy.clickSaveAndCheckAlert("Description is required\r\n");

    // missing Repair Center Code
    cy.reload();
    fillRequiredFields();
    cy.contains("Identity").click();
    cy.clearCombobox("Repair Center Code");
    cy.clickSaveAndCheckAlert(
      "Repair Center Code is required\r\nRepair Center Name is required\r\n"
    );

    // missing Random %
    cy.reload();
    fillRequiredFields();
    cy.contains("Identity").click();
    cy.get("[aria-label='Random %'] input").first().clear();
    cy.clickSaveAndCheckAlert("Random % is required\r\n");
  });

  it(
    "should create Ground Inspection Form with required fields, and then delete it",
    { tags: "@smoke" },
    () => {
      fillRequiredFields();
      cy.clickSaveAndCheckResponse();

      cy.clickDeleteAndCheckResponse();
    }
  );

  it.skip("Create Ground Inspection Form with All fields", () => {
    cy.EditInputElement("Code", faker.datatype.number(99999));
    cy.EditInputElement("Description", faker.random.words(1));
    cy.openFlyoutAndSelectRandomValue("Type");
    cy.openFlyoutAndSelectRandomValue("Result Type Code");
    cy.openFlyoutAndSelectRandomValue("Request Type");
    cy.get("input[aria-label='Next Date']").type(
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.fillNumericTextBox(0, faker.datatype.number(100));
    cy.get("select[aria-label='Due Every']").select(
      Math.floor(Math.random() * 5)
    );
    cy.openFlyoutAndSelectRandomValue("Repair Center Code");
    cy.fillNumericTextBox(1, faker.datatype.number(100));
    cy.get("#toolbarAddRoute").should("be.visible").click();
    cy.selectCheckBoxFromGrid(
      "/html/body/pageslide[1]/div/div/div/div[2]/form/div/div/div/div[2]/table/tbody/tr[1]/td[1]/input"
    );
    cy.getButtonWithText("Add Selected").click();
    cy.get("#toolbarAddArea").should("be.visible").click();
    cy.selectCheckBoxFromGrid(
      "/html/body/pageslide[1]/div/div/div/div[2]/form/div/div[3]/div/div/div/div/div/div[2]/table/tbody/tr[3]/td[1]/input"
    );
    cy.getButtonWithText("Add Selected").click();

    cy.selectRepairCenter();

    cy.contains("Ratings").click();
    cy.get("#toolbarAddRating").should("be.visible").click();
    cy.selectCheckBoxFromGrid(
      "/html/body/pageslide[1]/div/div/div/div[2]/form/div/div/div/div[2]/table/tbody/tr[1]/td[1]/input"
    );
    cy.getButtonWithText("Add Selected").click();

    cy.contains("Inspectors").click();
    cy.get("#toolbarAddInspector").should("be.visible").click();
    cy.selectCheckBoxFromGrid(
      "/html/body/pageslide[1]/div/div/div/div[2]/form/div/div/div/div[2]/table/tbody/tr[1]/td[1]/input"
    );
    cy.getButtonWithText("Add Selected").click();
    cy.clickSaveAndCheckResponse();
  });
});
