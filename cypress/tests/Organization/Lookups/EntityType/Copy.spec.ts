import { faker } from "@faker-js/faker";
describe("Copy And Edit Entity Type record", () => {
  let ID;
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
  });

  it("Copy Entity Type", () => {
    cy.visit("/#!/Lookup/EntityType");

    cy.wait(500);
    cy.getButton("Copy").click();
    cy.EditInputElement("Code", faker.datatype.number(99999999));
    cy.EditInputElement("Description", faker.random.words(2));
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "/EntityType/Create?copyId=?*",
      200
    ).then((id) => {
      ID = id;
    });
  });

  it("Edit Entity Type", () => {
    cy.visit(`/#!/Lookup/EntityType/${ID}`);
    cy.get("span[ng-bind='WindowTitle']:contains('Entity Types')").should(
      "be.visible"
    );
    cy.wait(1000);
    cy.contains("a", "Identity").click();
    cy.getButton("Edit").click();
    cy.EditInputElement("Code", faker.datatype.number(99999999));
    cy.EditInputElement("Description", faker.random.words(2));
    cy.clickSaveAfterEditAndCheckResponse();
  });
});
