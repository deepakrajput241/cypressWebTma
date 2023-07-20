import { faker } from "@faker-js/faker";

describe("Copy And Edit CPPM Issue Priority record", () => {
  let priorityId;

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
  });

  it("Search and Copy Issue Priority record", () => {
    cy.visit("/#!/Lookup/CJIssuePriority");

    cy.wait(500);
    cy.getButton("Copy").click();
    cy.EditInputElement("Code", faker.datatype.number(999999));
    cy.EditInputElement("Description", faker.random.words(5));
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "/CJIssuePriority/Create?copyId=?*",
      200
    ).then((id) => {
      priorityId = id;
    });
  });

  it("Edit CPPM Issue Priority record", () => {
    cy.visit(`/#!/Lookup/CJIssuePriority/${priorityId}`);
    cy.get(
      "span[ng-bind='WindowTitle']:contains('CPPM Issue Priorities')"
    ).should("be.visible");
    cy.wait(1000);
    cy.contains("a", "Identity").click();
    cy.getButton("Edit").click();
    cy.EditInputElement("Code", faker.datatype.number(999999));
    cy.EditInputElement("Description", faker.random.words(5));
    cy.clickSaveAfterEditAndCheckResponse();
  });
});
