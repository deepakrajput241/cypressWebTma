import { faker } from "@faker-js/faker";

describe("Create Account Program", () => {
  let accountProgramID;

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
  });

  it("Create new Account Program without Code", { tags: "@smoke" }, () => {
    cy.visit("/#!/Lookup/AccountProgram/Create");
    cy.EditInputElement("Description", faker.random.words(2));
    cy.clickAndCheckAlert("Save", "Code is required\r\n");

    cy.EditInputElement("Code", faker.datatype.number(99999));
    cy.get("input[name='Description']").clear();
    cy.clickAndCheckAlert("Save", "Description is required\r\n");
  });

  it("Create new Account Program", { tags: "@smoke" }, () => {
    cy.visit("/#!/Lookup/AccountProgram/Create");
    cy.EditInputElement("Code", faker.datatype.number(999999));
    cy.EditInputElement("Description", faker.random.words(2));
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "/AccountProgram/Create?*",
      200
    ).then((id) => {
      accountProgramID = id;
    });
  });

  it("Edit Account Program", () => {
    cy.visit(`/#!/Lookup/AccountProgram/${accountProgramID}`);
    cy.get("span[ng-bind='WindowTitle']:contains('Account Program')").should(
      "be.visible"
    );
    cy.contains("a", "Identity").click();
    cy.wait(500);
    cy.getButton("Edit").click();
    cy.EditInputElement("Code", faker.datatype.number(999999));
    cy.EditInputElement("Description", faker.random.words(2));
    cy.clickSaveAfterEditAndCheckResponse();
  });

  it("Copy Account Program", () => {
    cy.visit(`/#!/Lookup/AccountProgram/${accountProgramID}`);
    cy.get("span[ng-bind='WindowTitle']:contains('Account Program')").should(
      "be.visible"
    );
    cy.contains("a", "Identity").click();
    cy.wait(500);
    cy.getButton("Copy").click();
    cy.EditInputElement("Code", faker.datatype.number(999999));
    cy.EditInputElement("Description", faker.random.words(2));
    cy.clickSaveAndCheckResponse();
  });

  it("Delete new Account Program", () => {
    cy.visit(`/#!/Lookup/AccountProgram/${accountProgramID}`);
    cy.wait(500);
    cy.clickDeleteAndCheckResponse();
  });
});
