import { faker } from "@faker-js/faker";

describe("Create CP Master Item", () => {
  const data = { uniFormat1: "101373" };

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/Lookup/CPMasterItem/Create");
  });

  it("Create new Master Item Data without UniFormat 1", () => {
    cy.EditInputElement("Code", faker.datatype.number(1000000));
    cy.EditInputElement("Description", faker.random.words(6));
    cy.fillNumericTextBox(0, faker.datatype.number(10));
    cy.clickAndCheckAlert(
      "Save",
      "UniFormat 1 is required\r\nElement 1 Description is required\r\n"
    );

    cy.openFlyoutAndSelectRandomValue("UniFormat 1");
    cy.get(".k-formatted-value.k-input.ng-scope").eq(0).clear();
    cy.clickAndCheckAlert("Save", "Frequency (Yrs) is required\r\n");

    cy.fillNumericTextBox(0, faker.datatype.number(10));
    cy.get("input[name='Code']").clear();
    cy.clickAndCheckAlert("Save", "Code is required\r\n");

    cy.EditInputElement("Code", faker.datatype.number(1000000));
    cy.get("input[name='Description']").clear();
    cy.clickAndCheckAlert("Save", "Description is required\r\n");
  });

  it("Create new Master Item with Required fields", { tags: "@smoke" }, () => {
    cy.EditInputElement("Code", faker.datatype.number(1000000));
    cy.EditInputElement("Description", faker.random.words(6));
    cy.fillNumericTextBox(0, faker.datatype.number(10));
    cy.openFlyoutAndSelectRandomValue("UniFormat 1");
    cy.clickSaveAndCheckResponse();
  });

  it("Create and Master Item Data with All fields", () => {
    cy.EditInputElement("Code", faker.datatype.number(1000000));
    cy.EditInputElement("Description", faker.random.words(6));
    cy.fillNumericTextBox(0, faker.datatype.number(10));
    cy.fillCombobox("UniFormat 1", "SERVICES");
    cy.openFlyoutAndSelectRandomValue("UniFormat 2");
    cy.openFlyoutAndSelectRandomValue("UniFormat 3");
    cy.openFlyoutAndSelectRandomValue("UniFormat 4");
    cy.clickSaveAndCheckResponse();
  });
});
