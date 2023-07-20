import { faker } from "@faker-js/faker";

describe("Create IT Questionnaire record", () => {
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/Lookup/ITQuestionnaire/Create");
  });

  it("IT Questionnaire - Negative Cases", { tags: "@smoke" }, () => {
    cy.get("span[ng-bind='WindowTitle']:contains('IT Questionnaire')")
      .should("be.visible")
      .wait(500);
    cy.clickAndCheckAlert("Save", "Question is required\r\n");
  });

  it(
    "Create an IT Questionnaire with Required fields",
    { tags: "@smoke" },
    () => {
      cy.editTextarea("Question", faker.random.words(10));
      cy.clickSaveAndCheckResponse();
    }
  );
});
