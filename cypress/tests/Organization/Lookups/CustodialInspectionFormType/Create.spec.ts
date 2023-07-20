import { faker } from "@faker-js/faker";

describe("Create Custodial Inspection Form Type", () => {
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/Lookup/CDInspectionFormType/Create");
  });

  it(
    "Custodial Inspection Form Type - Negative Cases",
    { tags: "@smoke" },
    () => {
      cy.EditInputElement("Description", faker.random.words(5));
      cy.clickAndCheckAlert("Save", "Code is required\r\n");

      cy.EditInputElement("Code", faker.datatype.number(999999));
      cy.get("input[name='Description']").clear();
      cy.clickAndCheckAlert("Save", "Description is required\r\n");
    }
  );

  it(
    "Create Custodial Inspection Form Type with Required Fields",
    { tags: "@smoke" },
    () => {
      cy.EditInputElement("Code", faker.datatype.number(999999));
      cy.EditInputElement("Description", faker.random.words(5));
      cy.clickSaveAndCheckResponse();
    }
  );

  it("Create new Custodial Inspection Form Type with All Fields", () => {
    cy.EditInputElement("Code", faker.datatype.number(999999));
    cy.EditInputElement("Description", faker.random.words(5));
    cy.get("#toolbarAddSubType").should("be.visible").click();
    cy.get("input[name='Code']").eq(1).type(faker.datatype.number(9999999));
    cy.get("input[name='Description']").eq(1).type(faker.random.words(2));
    cy.getButtonWithText("Save").click();
    cy.clickSaveAndCheckResponse();
  });
});
