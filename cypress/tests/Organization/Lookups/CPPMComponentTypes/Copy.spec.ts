import { faker } from "@faker-js/faker";

describe("Copy And Edit CPPM Component Type record", () => {
  let componentId;

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
  });

  it("Search and Copy CPPM Component Type record", () => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/Lookup/CJComponentType");

    cy.wait(500);
    cy.getButton("Copy").click();
    cy.EditInputElement("Code", faker.datatype.number(999999));
    cy.EditInputElement("Description", faker.random.words(5));
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "/CJComponentType/Create?copyId=?*",
      200
    ).then((id) => {
      componentId = id;
    });
  });

  it("Edit CPPM Component Type record", () => {
    cy.visit(`/#!/Lookup/CJComponentType/${componentId}`);
    cy.get(
      "span[ng-bind='WindowTitle']:contains('CPPM Component Types')"
    ).should("be.visible");
    cy.wait(1000);
    cy.contains("a", "Identity").click();
    cy.getButton("Edit").click();
    cy.EditInputElement("Code", faker.datatype.number(999999));
    cy.EditInputElement("Description", faker.random.words(5));
    cy.clickSaveAfterEditAndCheckResponse();
  });
});
