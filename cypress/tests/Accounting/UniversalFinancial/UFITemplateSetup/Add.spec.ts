import { faker } from "@faker-js/faker";

function addColumn(id) {
  cy.get(id).click();
  cy.get("tbody").eq(4).find("input:first").check();
  cy.contains("button", "Save").click();
}

function fillRequiredFields() {
  cy.fillInput("Code", faker.random.numeric(7));
  addColumn("#toolbarAddColumnLine");
}

describe("add UFI Template Setup", () => {
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/UFITemplateSetup/Create");
  });

  it("should not add UFI Template Setup without required fields", () => {
    // missing Code
    fillRequiredFields();
    cy.clearInput("Code");
    cy.clickSaveAndCheckAlert("Code is required\r\n");

    // missing Line Columns
    cy.reload();
    // there is no way to delete line columns we only fill Code
    cy.fillInput("Code", faker.random.numeric(7));
    cy.clickSaveAndCheckAlert("UFI Template does not contain line columns ");
  });

  it(
    "should add UFI Template Setup with required fields, and then delete it",
    { tags: "@smoke" },
    () => {
      fillRequiredFields();
      cy.clickSaveAndCheckResponse();

      cy.clickDeleteAndCheckResponse();
    }
  );

  it("should add UFI Template Setup with all fields, and then delete it", () => {
    cy.fillInput("Code", faker.random.numeric(7));
    cy.setWait();
    cy.fillInput("Description", faker.random.words(2));
    cy.fillInput("Ledger Group", faker.random.words(2));
    cy.fillInput("Comments", faker.random.words(2));
    addColumn("#toolbarAddColumnHeader");
    addColumn("#toolbarAddColumnLine");
    addColumn("#toolbarAddColumnFooter");
    cy.clickSaveAndCheckResponse();

    cy.clickDeleteAndCheckResponse();
  });
});
