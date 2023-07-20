import { faker } from "@faker-js/faker";

describe("Create Labor Adjustment record", () => {
  const data = { adjustmentType: "ADP Producer" };

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/Lookup/LaborAdjust/Create");
  });

  it("Labor Adjustment - Negative Cases", { tags: "@smoke" }, () => {
    cy.EditInputElement("Code", faker.datatype.number(9999999));
    cy.EditInputElement("Description", faker.random.words(2));
    cy.clickAndCheckAlert("Save", "Adjustment Type is required\r\n");

    cy.fillCombobox("Labor Adjustment Type Description", "Auto-Marshall");
    cy.get("input[name='Description']").clear();
    cy.clickAndCheckAlert("Save", "Description is required\r\n");

    cy.EditInputElement("Description", faker.random.words(2));
    cy.get("input[name='Code']").clear();
    cy.clickAndCheckAlert("Save", "Code is required\r\n");

    cy.EditInputElement("Code", faker.datatype.number(9999999));
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "/LaborAdjust/Create?*",
      200,
      "Error",
      "Repair Centers\r\n\r\nAt least 1 record is required for Repair Center Grid\r\n"
    );
  });

  it(
    "Create a Labor Adjustment with Required fields",
    { tags: "@smoke" },
    () => {
      cy.EditInputElement("Code", faker.datatype.number(99999));
      cy.EditInputElement("Description", faker.random.words(2));
      cy.fillCombobox("Labor Adjustment Type Description", "Auto-Marshall");
      cy.selectRepairCenter();
      cy.clickSaveAndCheckResponse();
    }
  );
});
