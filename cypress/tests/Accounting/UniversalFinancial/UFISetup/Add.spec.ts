import { faker } from "@faker-js/faker";

const data = { application: "PeopleSoft Financials" };

function fillRequiredFields() {
  cy.fillInput("Code", faker.random.numeric(7));
  cy.fillSelect("Application", data.application);
  cy.setWait();
  cy.fillNumericTextBoxInput("Validation Timer (min)", faker.random.numeric(2));
  cy.fillInput("Description", faker.random.words(5));
  cy.fillRadio("Summarization", "0");
}

describe("add UFI Setup", () => {
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/UFISetup/Create");
  });

  it("should not add UFI Setup without required fields", () => {
    // missing Code
    fillRequiredFields();
    cy.clearInput("Code");
    cy.clickSaveAndCheckAlert("Code is required\r\n");

    // missing Application
    cy.reload();
    fillRequiredFields();
    cy.clearSelect("Application");
    cy.clickSaveAndCheckAlert("Application is required\r\n");

    // missing Validation Timer
    cy.reload();
    fillRequiredFields();
    cy.clearNumericTextBoxInput("Validation Timer (min)");
    cy.clickSaveAndCheckAlert("Validation Timer (min) is required\r\n");

    // missing Description
    cy.reload();
    fillRequiredFields();
    cy.clearInput("Description");
    cy.clickSaveAndCheckAlert("Description is required\r\n");
  });

  it(
    "should add UFI Setup with required fields, and then delete it",
    { tags: "@smoke" },
    () => {
      fillRequiredFields();
      cy.clickSaveAndCheckResponse();

      cy.clickDeleteAndCheckResponse();
    }
  );

  it("should add UFI Setup with all fields, and then delete it", () => {
    cy.fillInput("Code", faker.random.numeric(7));
    cy.fillSelect("Application", data.application);
    cy.setWait();
    cy.fillInput("UFI Web Service", faker.random.word(3));
    cy.fillNumericTextBoxInput("UFI Doc. Counter", faker.random.numeric(2));
    cy.fillNumericTextBoxInput(
      "Validation Timer (min)",
      faker.random.numeric(2)
    );
    cy.fillInput("Description", faker.random.words(5));
    cy.fillRadio("Summarization", "0");
    cy.clickSaveAndCheckResponse();

    cy.clickDeleteAndCheckResponse();
  });
});
