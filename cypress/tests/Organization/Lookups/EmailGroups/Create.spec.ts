import { faker } from "@faker-js/faker";

describe("create Email Groups record", () => {
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/Lookup/EmailGroup/Create");
  });

  it("Email Groups - Negative Cases", () => {
    cy.EditInputElement("Code", faker.datatype.number(9999999));
    cy.clickAndCheckAlert("Save", "Description is required\r\n");

    cy.get("input[name='Code']").clear();
    cy.EditInputElement("Description", faker.random.words(2));
    cy.clickAndCheckAlert("Save", "Code is required\r\n");
  });

  it("Create Email Group with Required fields", { tags: "@smoke" }, () => {
    cy.EditInputElement("Code", faker.datatype.number(9999999));
    cy.EditInputElement("Description", faker.random.words(2));
    cy.clickSaveAndCheckResponse();
  });

  it("Create Email Group with All fields", () => {
    cy.EditInputElement("Code", faker.datatype.number(9999999));
    cy.EditInputElement("Description", faker.random.words(2));
    cy.get("#toolbarAddRecord").click();
    cy.EditInputElement("Email", faker.internet.email());
    cy.getButtonWithText("Save").click();
    cy.clickSaveAndCheckResponse();
  });
});
