import { faker } from "@faker-js/faker";

describe("Copy And Edit CPPM Funding Revision Types", () => {
  let revisionId;

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
  });

  it("Search and Copy Funding Revision Type", () => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/Lookup/CJFundingRevisionType");

    cy.wait(500);
    cy.getButton("Copy").click();
    cy.EditInputElement("Code", faker.datatype.number(999999));
    cy.EditInputElement("Description", faker.random.words(5));
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "/CJFundingRevisionType/Create?copyId=?*",
      200
    ).then((id) => {
      revisionId = id;
    });
  });

  it("Edit CPPM Funding Revision Types", () => {
    cy.visit(`/#!/Lookup/CJFundingRevisionType/${revisionId}`);
    cy.get(
      "span[ng-bind='WindowTitle']:contains('CPPM Funding Revision Types')"
    ).should("be.visible");
    cy.wait(1000);
    cy.contains("a", "Identity").click();
    cy.getButton("Edit").click();
    cy.EditInputElement("Code", faker.datatype.number(999999));
    cy.EditInputElement("Description", faker.random.words(5));
    cy.clickSaveAfterEditAndCheckResponse();
  });
});
