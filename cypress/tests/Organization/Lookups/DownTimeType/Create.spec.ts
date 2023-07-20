import { faker } from "@faker-js/faker";

describe("Create Down Time Type records", () => {
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/Lookup/DownTimeType/Create");
  });

  it("Down Time Type - Negative Case", () => {
    cy.EditInputElement("Description", faker.random.words(2));
    cy.clickAndCheckAlert("Save", "Code is required\r\n");
  });

  it("Create Down Time Type with required fields", { tags: "@smoke" }, () => {
    cy.EditInputElement("Code", faker.datatype.number(9999999));
    cy.EditInputElement("Description", faker.random.words(2));
    cy.clickSaveAndCheckResponse();
  });

  it("Create Down Time Type with All fields", () => {
    cy.EditInputElement("Code", faker.datatype.number(9999999));
    cy.EditInputElement("Description", faker.random.words(2));
    cy.get("#toolbarAddSubType").click();
    cy.get("input[name='Code']").eq(1).type(faker.datatype.number(9999999));
    cy.get("input[aria-label='Description']").eq(1).type(faker.random.words(2));
    cy.getButtonWithText("Save").click();
    cy.clickSaveAndCheckResponse();
  });
});
