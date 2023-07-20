import { faker } from "@faker-js/faker";

describe("Copy And Edit CPPM Issue Type", () => {
  let issueId;

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
  });

  it("Copy Issue Type record", () => {
    cy.visit("/#!/Lookup/CJIssueType");

    cy.wait(500);
    cy.getButton("Copy").click();
    cy.EditInputElement("Code", faker.datatype.number(999999));
    cy.EditInputElement("Description", faker.random.words(5));
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "/CJIssueType/Create?copyId=?*",
      200
    ).then((id) => {
      issueId = id;
    });
  });

  it("Edit Issue Type record", () => {
    cy.visit(`/#!/Lookup/CJIssueType/${issueId}`);
    cy.get("span[ng-bind='WindowTitle']:contains('CPPM Issue Types')").should(
      "be.visible"
    );
    cy.wait(1000);
    cy.contains("a", "Identity").click();
    cy.getButton("Edit").click();
    cy.EditInputElement("Code", faker.datatype.number(999999));
    cy.EditInputElement("Description", faker.random.words(5));
    cy.clickSaveAfterEditAndCheckResponse();
  });
});
