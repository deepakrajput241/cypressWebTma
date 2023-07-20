import { faker } from "@faker-js/faker";

describe("Create Work Order Type record", () => {
  const data = { budgetCode: "101 Labor" };

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/Lookup/WorkOrderType/Create");
  });

  it("Work Order Type - Negative Cases", { tags: "@smoke" }, () => {
    cy.EditInputElement("Code", faker.datatype.number(9999));
    cy.clickAndCheckAlert("Save", "Description is required\r\n");

    cy.EditInputElement("Description", faker.random.words(1));
    cy.get("input[name='Code']").clear();
    cy.clickAndCheckAlert("Save", "Code is required\r\n");

    cy.EditInputElement("Code", faker.datatype.number(9999));
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "/WorkOrderType/Create?*",
      200,
      "Error",
      "Repair Centers\r\n\r\nAt least 1 record is required for WO Type Repair Center Grid\r\n"
    );
  });

  it("Create Work Order Type with required fields", { tags: "@smoke" }, () => {
    cy.EditInputElement("Code", faker.datatype.number(99999));
    cy.EditInputElement("Description", faker.random.words(1));
    cy.selectRepairCenter();
    cy.clickSaveAndCheckResponse();
  });
});
