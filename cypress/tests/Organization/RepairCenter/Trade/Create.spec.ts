import { faker } from "@faker-js/faker";

describe("create trade for repair center", () => {
  const data = {
    supervisor: "David Erickson",
    woQuery: "XUnscheduled Work Orders - FAC",
  };

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/Trade/Create");
  });

  it("Trade - Negative Cases", { tags: "@smoke" }, () => {
    cy.EditInputElement("Code", faker.datatype.number(99999));
    cy.clickAndCheckAlert("Save", "Name is required\r\n");

    cy.EditInputElement("Description", faker.random.words(2));
    cy.get("input[name='Code']").clear();
    cy.clickAndCheckAlert("Save", "Code is required\r\n");

    cy.EditInputElement("Code", faker.datatype.number(99999));
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "/Trade/Create?*",
      200,
      "Error",
      "Repair Centers\r\n\r\nAt least 1 record is required for Trade Repair Center Grid\r\n"
    );
  });

  it("create record with required fields", { tags: "@smoke" }, () => {
    cy.EditInputElement("Code", faker.datatype.number(100000));
    cy.EditInputElement("Description", faker.random.words(2));
    cy.selectRepairCenter();
    cy.clickSaveAndCheckResponse();
  });

  it("create record with all fields", () => {
    cy.EditInputElement("Code", faker.datatype.number(100000));
    cy.EditInputElement("Description", faker.random.words(2));
    cy.openFlyoutAndSelectRandomValue("Supervisor");
    cy.openFlyoutAndSelectRandomValue("WO Query");
    cy.openFlyoutAndSelectRandomValue("Shop Name");
    cy.fillNumericTextBox(0, faker.datatype.number(1000));
    cy.EditInputElement("Email", faker.internet.email());

    cy.selectRepairCenter();

    cy.contains("Technician").click();
    cy.get("#toolbarAddTechnician").click();
    cy.selectCheckBoxFromGrid(
      "/html/body/pageslide[1]/div/div/div/div[2]/form/div/div/div/div[2]/table/tbody/tr[2]/td[1]/input"
    );
    cy.getButtonWithText("Add Selected").click();
    cy.clickSaveAndCheckResponse();
  });
});
