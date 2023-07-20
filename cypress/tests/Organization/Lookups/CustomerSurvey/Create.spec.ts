import { faker } from "@faker-js/faker";

describe("Create new Customer Surveys with all fields", () => {
  beforeEach("Login to Web app", () => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/Lookup/Survey/Create");
  });

  it("Customer Survey- Negative Cases", { tags: "@smoke" }, () => {
    cy.fillCheckbox("Work Order");
    cy.clickAndCheckAlert("Save", "Question is required\r\n");
  });

  it("Create new Customer Survey Data", { tags: "@smoke" }, () => {
    cy.editTextarea("Question", faker.random.words(5));
    cy.fillCheckbox("Work Order");
    cy.selectRadioBtnById("QuestionType-0");
    cy.selectRepairCenter();
    cy.clickSaveAndCheckResponse();
  });

  it("Create new Customer Survey Data - Select Range", () => {
    cy.editTextarea("Question", faker.random.words(5));
    cy.fillCheckbox("Work Order");
    cy.clickCheckbox("IsWorkOrder");
    cy.clickCheckbox("IsProject");
    cy.clickCheckbox("IsClass");
    cy.clickCheckbox("IsProgram");
    cy.selectRadioBtnById("QuestionType-3");
    cy.get("#toolbarAddSurveyRange").should("be.visible").click();
    cy.fillNumericTextBox(0, faker.datatype.number(1000));
    cy.EditInputElement("Verbiage", faker.random.words(3));
    cy.getButtonWithText("Save").click();
    cy.selectRepairCenter();
    cy.clickSaveAndCheckResponse();
  });

  it("Create new Customer Survey Data - Select Multiple choice", () => {
    cy.editTextarea("Question", faker.random.words(5));
    cy.fillCheckbox("Work Order");
    cy.clickCheckbox("IsWorkOrder");
    cy.clickCheckbox("IsProject");
    cy.clickCheckbox("IsClass");
    cy.clickCheckbox("IsProgram");
    cy.selectRadioBtnById("QuestionType-4");
    cy.get("#toolbarAddSurveyChoice").should("be.visible").click();
    cy.fillNumericTextBox(0, faker.datatype.number(1000));
    cy.EditInputElement("Verbiage", faker.random.words(3));
    cy.getButtonWithText("Save").click();
    cy.selectRepairCenter();
    cy.clickSaveAndCheckResponse();
  });
});
