import { faker } from "@faker-js/faker";

describe("Create,Edit,Copy,Delete and Negative a Check Types", () => {
  let checkTypesID;

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
  });

  it("Check Types - Negative scenarios", { tags: "@smoke" }, () => {
    cy.visit("/#!/Lookup/CheckType/Create");
    cy.EditInputElement("Description", faker.random.words(2));
    cy.clickAndCheckAlert("Save", "Code is required\r\n");
  });

  it("Create Check Type Data with Required fields", { tags: "@smoke" }, () => {
    cy.visit("/#!/Lookup/CheckType/Create");
    cy.EditInputElement("Code", faker.datatype.number(9999));
    cy.EditInputElement("Description", faker.random.words(2));
    cy.clickSaveAndCheckResponse();
  });

  it("Create New Check Types data with All fields", () => {
    cy.visit("/#!/Lookup/CheckType/Create");
    cy.EditInputElement("Code", faker.datatype.number(9999));
    cy.EditInputElement("Description", faker.random.words(2));
    cy.get("#toolbarAddSubType").click().wait(1000);
    cy.get("input[name='Code']")
      .eq(1)
      .should("be.visible")
      .type(faker.datatype.number(1000000));
    cy.get("input[name='Description']")
      .eq(1)
      .should("be.visible")
      .type(faker.random.words(5));
    cy.getButtonWithText("Save").click();
    cy.clickAndCheckResponse("Save", "POST", "/CheckType/Create?*", 200).then(
      (id) => {
        checkTypesID = id;
      }
    );
  });

  it("Edit Check Types Types data", () => {
    cy.visit(`/#!/Lookup/CheckType/${checkTypesID}`);
    cy.get("span[ng-bind='WindowTitle']:contains('Check Types')").should(
      "be.visible"
    );
    cy.wait(1000);
    cy.getButton("Edit").click();
    cy.EditInputElement("Code", faker.datatype.number(9999));
    cy.EditInputElement("Description", faker.random.words(2));
    cy.clickSaveAfterEditAndCheckResponse();
  });

  it("Copy Check Types data", () => {
    cy.visit(`/#!/Lookup/CheckType/${checkTypesID}`);
    cy.get("span[ng-bind='WindowTitle']:contains('Check Types')").should(
      "be.visible"
    );
    cy.wait(1000);
    cy.getButton("Copy").click();
    cy.EditInputElement("Code", faker.datatype.number(9999));
    cy.EditInputElement("Description", faker.random.words(2));
    cy.clickSaveAndCheckResponse();
  });

  it("Delete Check Types data", () => {
    cy.visit(`/#!/Lookup/CheckType/${checkTypesID}/Identity`);
    cy.clickDeleteAndCheckResponse();
  });
});
