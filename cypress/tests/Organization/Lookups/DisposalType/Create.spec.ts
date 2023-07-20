import { faker } from "@faker-js/faker";

describe("Create Disposal Types", () => {
  let dispoalID;

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
  });

  it("Disposal Types - Negative Cases", { tags: "@smoke" }, () => {
    cy.visit("/#!/Lookup/DisposalType/Create");
    cy.EditInputElement("Description", faker.random.words(1));
    cy.clickAndCheckAlert("Save", "Code is required\r\n");

    cy.EditInputElement("Code", faker.datatype.number(9999));
    cy.get("input[name='Description']").clear();
    cy.clickAndCheckAlert("Save", "Description is required\r\n");
  });

  it("Create New Disposal Types data", { tags: "@smoke" }, () => {
    cy.visit("/#!/Lookup/DisposalType/Create");
    cy.EditInputElement("Code", faker.datatype.number(999999));
    cy.EditInputElement("Description", faker.random.words(1));
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "/DisposalType/Create?*",
      200
    ).then((id) => {
      dispoalID = id;
    });
  });

  it("Edit New Disposal Types data", () => {
    cy.visit(`/#!/Lookup/DisposalType/${dispoalID}`);
    cy.get("span[ng-bind='WindowTitle']:contains('Disposal Types')").should(
      "be.visible"
    );
    cy.wait(500);
    cy.getButton("Edit").click();
    cy.EditInputElement("Code", faker.datatype.number(999999));
    cy.EditInputElement("Description", faker.random.words(1));
    cy.clickSaveAfterEditAndCheckResponse();
  });

  it("Copy New Disposal Types data", () => {
    cy.visit(`/#!/Lookup/DisposalType/${dispoalID}`);
    cy.get("span[ng-bind='WindowTitle']:contains('Disposal Types')").should(
      "be.visible"
    );
    cy.wait(500);
    cy.getButton("Copy").click();
    cy.EditInputElement("Code", faker.datatype.number(999999));
    cy.EditInputElement("Description", faker.random.words(1));
    cy.clickSaveAndCheckResponse();
  });

  it("Delete New Disposal Types data", () => {
    cy.visit(`/#!/Lookup/DisposalType/${dispoalID}`);
    cy.get("span[ng-bind='WindowTitle']:contains('Disposal Types')").should(
      "be.visible"
    );
    cy.clickDeleteAndCheckResponse();
  });
});
