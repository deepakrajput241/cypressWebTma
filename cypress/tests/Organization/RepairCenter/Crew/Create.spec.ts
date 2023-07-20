import { faker } from "@faker-js/faker";

describe("Create new Crew", () => {
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/Crew/Create");
  });

  it("Crew - Negative Cases", { tags: "@smoke" }, () => {
    cy.EditInputElement("Code", faker.datatype.number(99999999));
    cy.clickAndCheckAlert("Save", "Crew Name is required\r\n");

    cy.EditInputElement("Description", faker.random.words(2));
    cy.get("input[name='Code']").clear();
    cy.clickAndCheckAlert("Save", "Crew Code is required\r\n");

    cy.EditInputElement("Code", faker.datatype.number(99999999));
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "/Crew/Create?*",
      200,
      "Error",
      "Repair Centers\r\n\r\nAt least 1 record is required for Crew Repair Center Grid\r\n"
    );
  });

  it("Create new Crew Record with Required fields", { tags: "@smoke" }, () => {
    cy.EditInputElement("Code", faker.datatype.number(99999999));
    cy.EditInputElement("Description", faker.random.words(2));
    cy.selectRepairCenter();
    cy.clickSaveAndCheckResponse();
  });

  it("Create new Crew Record With All Fields", () => {
    cy.EditInputElement("Code", faker.datatype.number(99999999));
    cy.EditInputElement("Description", faker.random.words(2));
    cy.wait(2000);
    cy.get("#toolbarAddCrewMember").click();
    cy.selectCheckBoxFromGrid(
      "/html/body/pageslide[1]/div/div/div/div[2]/form/div/div/div/div[2]/table/tbody/tr[1]/td[1]/input"
    );
    cy.wait(2000);
    cy.getButtonWithText("Add Selected").click();
    cy.selectRepairCenter();
    cy.clickSaveAndCheckResponse();
  });
});
