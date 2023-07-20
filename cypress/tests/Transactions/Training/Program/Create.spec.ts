import { faker } from "@faker-js/faker";

const data = {
  code: faker.datatype.number(99999999),
  description: faker.random.words(5),
  trainingTypeCode: "test",
};

function fillRequiredFields() {
  cy.fillInput("Program ID", faker.random.words(3));
  // no idea why this is needed, but it is
  cy.wait(500);
  cy.fillTextarea("Description", faker.random.words(10));
  // no idea why this is needed, but it is
  cy.wait(500);
  cy.contains("Repair Centers").click();
  cy.addRepairCenter();
}

describe("create Training Program", () => {
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/TrainingProgram/Create");
  });

  it("should not create Training Program without required fields", () => {
    // missing Program ID
    fillRequiredFields();
    cy.contains("Identity").click();
    cy.clearInput("Program ID");
    cy.clickSaveAndCheckAlert("Program ID is required\r\n");

    // missing Description
    cy.reload();
    fillRequiredFields();
    cy.contains("Identity").click();
    cy.clearTextarea("Description");
    cy.clickSaveAndCheckAlert("Description is required\r\n");

    // missing Repair Center
    cy.reload();
    fillRequiredFields();
    cy.get("tbody a").first().click();
    cy.clickSaveAndCheckAlert(
      " At least 1 record is required for Training Program Repair Center Grid\r\n"
    );
  });

  it(
    "should create Training Program with required fields, and then delete it",
    { tags: "@smoke" },
    () => {
      fillRequiredFields();
      cy.clickSaveAndCheckResponse();
      // no idea why this is needed, but it is
      cy.wait(500);
      cy.clickDeleteAndCheckResponse();
    }
  );

  it.skip("Create Program With All Fields", () => {
    cy.EditInputElement("Code", faker.datatype.number(10000));
    cy.openFlyoutAndSelectRandomValue("Training Type Code");
    cy.editTextarea("Description", data.description);
    cy.get("input[name='SurveyRequired']").should("be.visible").check();
    cy.get("input[name='Template']").should("be.visible").check();
    cy.selectRepairCenter();
    cy.contains("Survey").click();
    cy.get("#toolbarAddSection").should("be.visible").click();
    cy.EditInputElement("SectionDescription", faker.random.words(2));
    cy.EditInputElement("SectionOrder", faker.datatype.number(1000));
    cy.getButtonWithText("Save").click();
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "TrainingProgram/Create*",
      200
    ).then((id) => {
      ID = id;
    });
  });
});
