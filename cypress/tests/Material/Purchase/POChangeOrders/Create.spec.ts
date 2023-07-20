import { faker } from "@faker-js/faker";

describe("Create PO Change Order", () => {
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/POChangeOrder/Create");
  });

  it("PO Change Order - Negative Cases", () => {
    cy.fillCombobox("PO #", 1);
    cy.fillCombobox("Buyer", 1);
    cy.clickAndCheckAlert(
      "Save",
      " At least 1 record is required for POChangeOrderDetails Grid\r\n"
    );

    cy.get("#toolbarAddItem").click();
    cy.fillCombobox("PO Line#", 2);
    cy.wait(500);
    cy.getButtonWithText("Save").click();
    cy.get("input[aria-label='PO #']").eq(0).clear();
    cy.clickAndCheckAlert("Save", "PO # is required\r\n");

    cy.fillCombobox("PO #", 1);
    cy.get("input[aria-label='Buyer']").eq(0).clear();
    cy.clickAndCheckAlert("Save", "Buyer is required\r\n");
  });

  it("Create PO Change Order with Required fields", () => {
    cy.fillCombobox("PO #", 1);
    cy.fillCombobox("Buyer", 1);
    cy.get("#toolbarAddItem").click();
    cy.fillCombobox("PO Line#", 2);
    cy.wait(500);
    cy.getButtonWithText("Save").click();
    cy.clickSaveAndCheckResponse();
  });

  it("Create PO Change Order with All fields", () => {
    cy.fillCombobox("PO #", 1);
    cy.fillCombobox("Buyer", 1);
    cy.fillCombobox("POCO Status", 1);
    cy.EditInputElement("StatusNote", faker.random.words(2));
    cy.get("#toolbarAddItem").click();
    cy.fillCombobox("PO Line#", 2);
    cy.wait(500);
    cy.getButtonWithText("Save").click();
    cy.editTextarea("Comment", faker.random.words(5));
    cy.clickSaveAndCheckResponse();
  });
});
