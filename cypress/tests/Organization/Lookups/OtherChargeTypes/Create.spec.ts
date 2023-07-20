import { faker } from "@faker-js/faker";

describe("Create Other Charge Type record", () => {
  const data = { budgetCode: "1020630", unitMeasureCode: "BOX" };

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/Lookup/ChargeType/Create");
  });

  it("Other Charge Type - Negative Cases", { tags: "@smoke" }, () => {
    cy.EditInputElement("Code", faker.datatype.number(9999999));
    cy.clickAndCheckAlert("Save", "Description is required\r\n");

    cy.EditInputElement("Description", faker.random.words(2));
    cy.get("input[name='Code']").clear();
    cy.clickAndCheckAlert("Save", "Code is required\r\n");

    cy.EditInputElement("Code", faker.datatype.number(9999999));
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "/ChargeType/Create?*",
      200,
      "Error",
      "Repair Centers\r\n\r\nAt least 1 record is required for Repair Center\r\n"
    );
  });

  it(
    "Create Other Charge Type with required fields",
    { tags: "@smoke" },
    () => {
      cy.EditInputElement("Code", faker.datatype.number(9999999));
      cy.EditInputElement("Description", faker.random.words(2));
      cy.selectRepairCenter();
      cy.clickSaveAndCheckResponse();
    }
  );
});
