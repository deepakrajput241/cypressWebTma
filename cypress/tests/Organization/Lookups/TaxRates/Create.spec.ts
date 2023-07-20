import { faker } from "@faker-js/faker";

describe("Create Tax Rate record", () => {
  const data = {
    tax1Expense: "1111 2222 3333 4444",
    tax2Expense: "2222 333 3333 4444",
    tax1Collected: "2222 333 3333 4444",
    tax2Collected: "2222 333 3333 4444",
  };

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/Lookup/TaxRate/Create");
  });

  it("Tax Rate - Negative Cases", { tags: "@smoke" }, () => {
    cy.EditInputElement("Name", faker.random.words(1));
    cy.EditInputElement("Tax1Description", faker.random.words(1));
    cy.clickAndCheckAlert("Save", "Tax 1 Rate % is required\r\n");

    cy.fillNumericTextBox(0, faker.datatype.number(100));
    cy.get("input[name='Tax1Description']").clear();
    cy.clickAndCheckAlert("Save", "Tax 1 Description is required\r\n");

    cy.EditInputElement("Tax1Description", faker.random.words(2));
    cy.get("input[name='Name']").clear();
    cy.clickAndCheckAlert("Save", "Tax Name is required\r\n");
  });

  it("Create a Tax Rate with required fields", { tags: "@smoke" }, () => {
    cy.EditInputElement("Name", faker.random.words(1));
    cy.EditInputElement("Tax1Description", faker.random.words(1));
    cy.fillNumericTextBox(0, faker.datatype.number(100));
    cy.clickSaveAndCheckResponse();
  });
});
