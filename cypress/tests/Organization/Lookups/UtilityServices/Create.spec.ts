import { faker } from "@faker-js/faker";

describe("Create Utility Service record", () => {
  const data = {
    unitOfMeasure: "BOX",
    serviceType: "Auto-Enhanced",
    account: "1111 2222 3333 4444",
  };

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/Lookup/UtilityService/Create");
  });

  it("Utility Service - Negative Cases", { tags: "@smoke" }, () => {
    cy.EditInputElement("Code", faker.datatype.number(9999));
    cy.clickAndCheckAlert("Save", "Description is required\r\n");

    cy.EditInputElement("Description", faker.random.words(2));
    cy.get("input[name='Code']").clear();
    cy.clickAndCheckAlert("Save", "Code is required\r\n");

    cy.EditInputElement("Code", faker.datatype.number(9999));
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "/UtilityService/Create?*",
      200,
      "Error",
      "Repair Center\r\n\r\nAt least 1 record is required for Repair Centers\r\n"
    );
  });

  it("Create Utility Service with required fields", { tags: "@smoke" }, () => {
    cy.EditInputElement("Code", faker.datatype.number(99999));
    cy.EditInputElement("Description", faker.random.words(1));
    cy.contains("Repair Center").click();
    cy.get("#toolbarAddRepairCenter").click();
    cy.selectRandomCheckBoxFromGrid(
      1,
      "/html/body/pageslide[1]/div/div/div/div[2]/form/div/div/div/div/div[2]/table/tbody/tr[1]/td[1]/input"
    );
    cy.getButtonWithText("Add Selected").click();
    cy.clickSaveAndCheckResponse();
  });
});
