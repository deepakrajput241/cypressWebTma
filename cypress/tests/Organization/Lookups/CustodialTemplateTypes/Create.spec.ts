import { faker } from "@faker-js/faker";

describe("Create new Custodial Template Types", () => {
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/Lookup/CDTemplateType/Create");
  });

  it("Custodial Template Type - Negative Cases", { tags: "@smoke" }, () => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/Lookup/CDTemplateType/Create");
    cy.EditInputElement("Code", faker.datatype.number(999999));
    cy.clickAndCheckAlert("Save", "Description is required\r\n");

    cy.EditInputElement("Description", faker.random.words(2));
    cy.get("input[name='Code']").clear();
    cy.clickAndCheckAlert("Save", "Code is required\r\n");
  });

  it(
    "Create Custodial Template Type with Required fields",
    { tags: "@smoke" },
    () => {
      cy.EditInputElement("Code", faker.datatype.number(999999));
      cy.EditInputElement("Description", faker.random.words(2));
      cy.clickSaveAndCheckResponse();
    }
  );

  it("Create new Custodial Template Type Data with All fields", () => {
    cy.EditInputElement("Code", faker.datatype.number(999999));
    cy.EditInputElement("Description", faker.random.words(2));
    cy.get("#toolbarAddCDTemplateSubtype").should("be.visible").click();
    cy.get("input[name='Code']").eq(1).type(faker.datatype.number(9999999));
    cy.get("input[name='Description']").eq(1).type(faker.random.words(2));
    cy.getButtonWithText("Save").click();
    cy.clickSaveAndCheckResponse();
  });
});
