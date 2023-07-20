import { faker } from "@faker-js/faker";

describe("Create Custodial Inspection Result Type", () => {
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/Lookup/CDInspectionResultType/Create");
  });

  it(
    "Custodial Inspection Result Type - Negative Cases",
    { tags: "@smoke" },
    () => {
      cy.EditInputElement("Description", faker.random.words(5));
      cy.clickAndCheckAlert("Save", "Code is required\r\n");

      cy.EditInputElement("Code", faker.datatype.number(1000000));
      cy.get("input[name='Description']").clear();
      cy.clickAndCheckAlert("Save", "Description is required\r\n");
    }
  );

  it(
    "Create Custodial Inspection Result Type with Required Fields",
    { tags: "@smoke" },
    () => {
      cy.login(Cypress.env("user1"));
      cy.visit("/#!/Lookup/CDInspectionResultType/Create");
      cy.EditInputElement("Code", faker.datatype.number(1000000));
      cy.EditInputElement("Description", faker.random.words(5));
      cy.clickSaveAndCheckResponse();
    }
  );

  it("Create Custodial Inspection Result Type Data with All fields", () => {
    cy.EditInputElement("Code", faker.datatype.number(1000000));
    cy.EditInputElement("Description", faker.random.words(5));
    cy.get("#toolbarAddSubType").should("be.visible").click();
    cy.get("input[name='Code']").eq(1).type(faker.datatype.number(9999999));
    cy.get("input[name='Description']").eq(1).type(faker.random.words(2));
    cy.getButtonWithText("Save").click();
    cy.clickSaveAndCheckResponse();
  });
});
