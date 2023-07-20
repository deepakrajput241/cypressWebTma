import { faker } from "@faker-js/faker";
describe("Create Pay Period record", () => {
  const data = { frequency: "Auto-Product" };

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/Lookup/PayPeriod/Create");
  });

  it("Pay Period - Negative Cases", { tags: "@smoke" }, () => {
    cy.EditInputElement("Code", faker.datatype.number(9999999));
    cy.EditInputElement("Description", faker.random.words(2));
    cy.openFlyoutAndSelectRandomValue("Frequency");
    cy.EditInputElement("CutOffDays", faker.datatype.number(100));
    cy.EditInputElement("Hours", faker.datatype.number(12));
    cy.clickAndCheckAlert("Save", "Base Date is required\r\n");

    cy.fillDateInput("Base Date");
    cy.get("input[aria-label='Frequency']").eq(0).clear();
    cy.clickAndCheckAlert("Save", "Frequency is required\r\n");

    cy.openFlyoutAndSelectRandomValue("Frequency");
    cy.get("input[name='CutOffDays']").clear();
    cy.clickAndCheckAlert("Save", "Cutoff Days is required\r\n");

    cy.EditInputElement("CutOffDays", faker.datatype.number(100));
    cy.get("input[name='Hours']").clear();
    cy.clickAndCheckAlert("Save", "Hours Per Period is required\r\n");

    cy.EditInputElement("Hours", faker.datatype.number(12));
    cy.get("input[name='Code']").clear();
    cy.clickAndCheckAlert("Save", "Code is required\r\n");

    cy.EditInputElement("Code", faker.datatype.number(9999999));
    cy.get("input[name='Description']").clear();
    cy.clickAndCheckAlert("Save", "Description is required\r\n");

    cy.EditInputElement("Description", faker.random.words(2));
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "/PayPeriod/Create?*",
      200,
      "Error",
      "Repair Centers\r\n\r\nAt least 1 record is required for Repair Center\r\n"
    );
  });

  it("Create a Pay Period with Required fields", { tags: "@smoke" }, () => {
    cy.EditInputElement("Code", faker.datatype.number(99999));
    cy.EditInputElement("Description", faker.random.words(2));
    cy.openFlyoutAndSelectRandomValue("Frequency");
    cy.fillDateInput("Base Date");
    cy.EditInputElement("CutOffDays", faker.datatype.number(100));
    cy.EditInputElement("Hours", faker.datatype.number(12));
    cy.selectRepairCenter();
    cy.clickSaveAndCheckResponse();
  });
});
