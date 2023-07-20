import { faker } from "@faker-js/faker";

describe("Create Monitored Condition record", () => {
  const data = { type: "Auto-5966", uom: "BOX" };

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/Lookup/MonitoredCondition/Create");
  });

  it("Monitored Condition - Negative Cases", { tags: "@smoke" }, () => {
    cy.EditInputElement("Code", faker.datatype.number(999999));
    cy.EditInputElement("Description", faker.random.words(2));
    cy.openFlyoutAndSelectRandomValue("Type");
    cy.clickAndCheckAlert("Save", "UOM is required\r\n");

    cy.openFlyoutAndSelectRandomValue("UOM");
    cy.get("input[aria-label='Type']").eq(0).clear();
    cy.clickAndCheckAlert(
      "Save",
      "Type is required\r\nType Description is required\r\n"
    );

    cy.openFlyoutAndSelectRandomValue("Type");
    cy.get("input[name='Code']").clear();
    cy.clickAndCheckAlert("Save", "Condition ID is required\r\n");

    cy.EditInputElement("Code", faker.datatype.number(999999));
    cy.get("input[name='Description']").clear();
    cy.clickAndCheckAlert("Save", "Description is required\r\n");
  });

  it(
    "Create a Monitored Condition with Required fields",
    { tags: "@smoke" },
    () => {
      cy.EditInputElement("Code", faker.datatype.number(999999));
      cy.EditInputElement("Description", faker.random.words(2));
      cy.openFlyoutAndSelectRandomValue("Type");
      cy.openFlyoutAndSelectRandomValue("UOM");
      cy.clickSaveAndCheckResponse();
    }
  );
});
