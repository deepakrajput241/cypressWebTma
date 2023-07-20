import { faker } from "@faker-js/faker";

describe("Create CEAR record", () => {
  const data = { amount: "100" };

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/Seer/Create");
  });

  it("CEAR - Neagtive Cases", () => {
    cy.EditInputElement("Number", faker.datatype.number(100));
    cy.EditInputElement("Description", faker.random.words(2));
    cy.clickAndCheckAlert("Save", "Amount is required\r\n");

    cy.fillNumericTextBox(0, data.amount);
    cy.get("input[name='Number']").clear();
    cy.clickAndCheckAlert("Save", "CEAR # is required\r\n");

    cy.EditInputElement("Number", faker.datatype.number(100));
    cy.get("input[name='Description']").clear();
    cy.clickAndCheckAlert("Save", "Description is required\r\n");
  });

  it("Create CEAR with Required field", { tags: "@smoke" }, () => {
    cy.EditInputElement("Number", faker.datatype.number(99999999));
    cy.EditInputElement("Description", faker.random.words(2));
    cy.fillNumericTextBox(0, data.amount);
    cy.fillDateInput("Award Date");
    cy.clickSaveAndCheckResponse();
  });
});
