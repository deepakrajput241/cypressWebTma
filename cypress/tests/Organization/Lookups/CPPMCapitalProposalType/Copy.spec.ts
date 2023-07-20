import { faker } from "@faker-js/faker";

describe("Copy and Edit Capital Proposal Type record", () => {
  let projectTypeId;

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
  });

  it("Create and copy Capital Proposal Type Data", () => {
    cy.visit("/#!/Lookup/CJProposalType");

    cy.getButton("Copy").click();
    cy.EditInputElement("Code", faker.datatype.number(999999));
    cy.EditInputElement("Description", faker.random.words(5));
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "/CJProposalType/Create?copyId=?*",
      200
    ).then((id) => {
      projectTypeId = id;
    });
  });

  it("Edit CPPM Capital Proposal Type", () => {
    cy.visit(`/#!/Lookup/CJProposalType/${projectTypeId}`);
    cy.get(
      "span[ng-bind='WindowTitle']:contains('CPPM Capital Proposal Types')"
    ).should("be.visible");
    cy.wait(1000);
    cy.contains("a", "Identity").click();
    cy.getButton("Edit").click();
    cy.EditInputElement("Code", faker.datatype.number(999999));
    cy.EditInputElement("Description", faker.random.words(5));
    cy.clickSaveAfterEditAndCheckResponse();
  });
});
