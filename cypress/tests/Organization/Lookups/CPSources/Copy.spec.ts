import { faker } from "@faker-js/faker";

describe("Copy And Edit CP Source record", () => {
  let ID;

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
  });

  it("Copy CP Source Data", () => {
    cy.visit("/#!/Lookup/CPSource");

    cy.wait(500);
    cy.getButton("Copy").click();
    cy.EditInputElement("Code", faker.datatype.number(1000000));
    cy.EditInputElement("Description", faker.random.words(5));
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "/CPSource/Create?copyId=?*",
      200
    ).then((id) => {
      ID = id;
    });
  });

  it("Edit CP Source Data", () => {
    cy.visit(`/#!/Lookup/CPSource/${ID}`);
    cy.get("span[ng-bind='WindowTitle']:contains('CP Sources')").should(
      "be.visible"
    );
    cy.wait(500);
    cy.contains("a", "Identity").click();
    cy.getButton("Edit").click();
    cy.EditInputElement("Code", faker.datatype.number(1000000));
    cy.EditInputElement("Description", faker.random.words(5));
    cy.clickSaveAfterEditAndCheckResponse();
  });
});
