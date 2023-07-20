import { faker } from "@faker-js/faker";

describe("Copy ANd Edit Area Type record", () => {
  let areaTypeId;

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
  });

  it("Copy Area Type", () => {
    cy.visit("/#!/Lookup/AreaType/Create");

    cy.getButton("Copy").click();
    cy.EditInputElement("Code", faker.datatype.number(9999999));
    cy.EditInputElement("Description", faker.random.words(5));
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "/AreaType/Create?copyId=?*",
      200
    ).then((id) => {
      areaTypeId = id;
    });
  });

  it("Edit Area Type", () => {
    cy.visit(`/#!/Lookup/AreaType/${areaTypeId}`);
    cy.get("span[ng-bind='WindowTitle']:contains('Area Types')").should(
      "be.visible"
    );
    cy.wait(1500);
    cy.contains("a", "Identity").click();
    cy.getButton("Edit").click();
    cy.EditInputElement("Code", faker.datatype.number(999999));
    cy.EditInputElement("Description", faker.random.words(5));
    cy.clickSaveAfterEditAndCheckResponse();
  });
});
