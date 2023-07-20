import { faker } from "@faker-js/faker";

describe("Create, Edit, Copy, Delete and Negative Scenarios- 'Account Types'", () => {
  let accounttypeId;

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
  });

  it("Account Types - Negative Scenario", { tags: "@smoke" }, () => {
    cy.visit("/#!/Lookup/AccountType/Create");
    cy.EditInputElement("Description", faker.random.words(2));
    cy.clickAndCheckAlert("Save", "Code is required\r\n");

    cy.EditInputElement("Code", faker.datatype.number(9999999));
    cy.get("input[name='Description']").clear();
    cy.clickAndCheckAlert("Save", "Description is required\r\n");
  });

  it("Create Account Types with Required field", { tags: "@smoke" }, () => {
    cy.visit("/#!/Lookup/AccountType/Create");
    cy.EditInputElement("Code", faker.datatype.number(9999999));
    cy.EditInputElement("Description", faker.random.words(2));
    cy.get("#toolbarAddSubType").click({ force: true });
    cy.get("#divContentEntryPanel1 > div dl > dd:nth-child(2) > input").type(
      faker.datatype.number(9999)
    );
    cy.get("input[aria-label='Description']")
      .eq(1)
      .should("be.visible")
      .type(faker.random.words(2));
    cy.getButtonWithText("Save").click();
    cy.clickAndCheckResponse("Save", "POST", "/AccountType/Create?*", 200).then(
      (id) => {
        accounttypeId = id;
      }
    );
  });

  it("Edit Account Types record", () => {
    cy.visit(`/#!/Lookup/AccountType/${accounttypeId}`);
    cy.get("span[ng-bind='WindowTitle']:contains('Account Types')").should(
      "be.visible"
    );
    cy.wait(500);
    cy.getButton("Edit").click();
    cy.EditInputElement("Code", faker.datatype.number(9999999));
    cy.EditInputElement("Description", faker.random.words(2));
    cy.clickSaveAfterEditAndCheckResponse();
  });

  it("Copy Account Types record", () => {
    cy.visit(`/#!/Lookup/AccountType/${accounttypeId}`);
    cy.get("span[ng-bind='WindowTitle']:contains('Account Types')").should(
      "be.visible"
    );
    cy.wait(500);
    cy.getButton("Copy").click();
    cy.EditInputElement("Code", faker.datatype.number(9999999));
    cy.EditInputElement("Description", faker.random.words(2));
    cy.clickSaveAndCheckResponse();
  });

  it("Delete Account Types record", () => {
    cy.visit(`/#!/Lookup/AccountType/${accounttypeId}`);
    cy.wait(500);
    cy.clickDeleteAndCheckResponse();
  });
});
