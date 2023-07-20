import { faker } from "@faker-js/faker";

describe("Create RI Form", () => {
  const data = { typeCode: "RIType" };

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/RoomInspectionForm/Create");
  });

  it("RI Form - Negative Cases", () => {
    cy.EditInputElement("Code", faker.datatype.number(9999999999));
    cy.EditInputElement("Description", faker.random.words(1));
    cy.clickAndCheckAlert(
      "Save",
      "Type Code is required\r\nType Description is required\r\n"
    );

    cy.fillCombobox("Type Code", 1);
    cy.get("input[name='Description']").clear();
    cy.clickAndCheckAlert("Save", "Description is required\r\n");

    cy.EditInputElement("Description", faker.random.words(1));
    cy.get("input[name='Code']").clear();
    cy.clickAndCheckAlert("Save", "Code is required\r\n");

    cy.EditInputElement("Code", faker.datatype.number(9999999999));
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "/RoomInspectionForm/Create?*",
      200,
      "Error",
      "Repair Centers\r\n\r\nAt least 1 record is required for RI From Repair Center Grid\r\n"
    );
  });

  it("Create RI Form with required fields", { tags: "@smoke" }, () => {
    cy.EditInputElement("Code", faker.datatype.number(9999999999));
    cy.EditInputElement("Description", faker.datatype.number(9999999999));
    cy.fillCombobox("Type Code", 1);
    cy.selectRepairCenter();
    cy.clickSaveAndCheckResponse();
  });

  it("Create RI Form with All fields", () => {
    cy.EditInputElement("Code", faker.datatype.number(9999999999));
    cy.EditInputElement("Description", faker.datatype.number(9999999999));
    cy.fillCombobox("Type Code", 1);
    cy.get("#toolbarAddPoint").click();
    cy.selectCheckBoxFromGrid(
      "/html/body/pageslide[1]/div/div/div/div[2]/form/div/div/div/div[2]/table/tbody/tr[1]/td[1]/input"
    );
    cy.getButtonWithText("Add Selected").click();
    cy.get("input[ng-model='dataItem.selected']").click();
    cy.get("#toolbarBatchException").click();
    cy.selectCheckBoxFromGrid(
      "/html/body/pageslide[1]/div/div/div/div[2]/form/div/div/div/div[2]/table/tbody/tr[1]/td[1]/input"
    );
    cy.getButtonWithText("Save").click();
    cy.selectRepairCenter();
    cy.contains("Condition Ratings").click();
    cy.get("#toolbarAddNewItem").click();
    cy.selectCheckBoxFromGrid(
      "/html/body/pageslide[1]/div/div/div/div[2]/form/div/div/div/div[2]/table/tbody/tr[1]/td[1]/input"
    );
    cy.getButtonWithText("Add Selected").click();
    cy.clickSaveAndCheckResponse();
  });
});
