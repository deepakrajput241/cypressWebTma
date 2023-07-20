import { faker } from "@faker-js/faker";

describe("Copy And Edit CPPM Capital Project Types", () => {
  let projectId;

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
  });

  it("Search and Copy Capital Project Type Data", () => {
    cy.visit("/#!/Lookup/CJProjectType");

    cy.getButton("Copy").click();
    cy.EditInputElement("Code", faker.datatype.number(999999));
    cy.EditInputElement("Description", faker.random.words(2));
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "/CJProjectType/Create?copyId=?*",
      200
    ).then((id) => {
      projectId = id;
    });
  });

  it("Edit CPPM Capital Project Type record", () => {
    cy.visit(`/#!/Lookup/CJProjectType/${projectId}`);
    cy.get(
      "span[ng-bind='WindowTitle']:contains('CPPM Capital Project Types')"
    ).should("be.visible");
    cy.wait(1000);
    cy.contains("a", "Identity").click();
    cy.getButton("Edit").click();
    cy.EditInputElement("Code", faker.datatype.number(999999));
    cy.clickSaveAfterEditAndCheckResponse();
  });
});
