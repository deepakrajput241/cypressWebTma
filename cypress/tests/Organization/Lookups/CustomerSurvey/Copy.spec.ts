import { faker } from "@faker-js/faker";

describe("Copy And Edit Customer Survey record", () => {
  let surveyId;
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
  });

  it("Copy Customer Survey record", () => {
    cy.visit("/#!/Lookup/Survey");

    cy.wait(500);
    cy.getButton("Copy").click();
    cy.get("textarea[aria-label='Question']").clear();
    cy.editTextarea("Question", faker.random.words(5));
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "/Survey/Create?copyId=?*",
      200
    ).then((id) => {
      surveyId = id;
    });
  });

  it("Edit Cusotmer Survey Recotd", () => {
    cy.visit(`/#!/Lookup/Survey/${surveyId}`);
    cy.get("span[ng-bind='WindowTitle']:contains('Customer Surveys')").should(
      "be.visible"
    );
    cy.wait(1000);
    cy.contains("a", "Identity").click();
    cy.getButton("Edit").click();
    cy.get("textarea[aria-label='Question']").clear();
    cy.editTextarea("Question", faker.random.words(5));
    cy.clickSaveAfterEditAndCheckResponse();
  });
});
