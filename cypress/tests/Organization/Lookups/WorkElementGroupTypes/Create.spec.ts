import { faker } from "@faker-js/faker";

describe("Create Work Element Group Type record", () => {
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/Lookup/CPProjectRequestType/Create");
  });

  it("Work Element Group Type - Negative Cases", { tags: "@smoke" }, () => {
    cy.EditInputElement("Code", faker.datatype.number(9999));
    cy.clickAndCheckAlert("Save", "Description is required\r\n");
  });

  it(
    "Create Work Element Group Type with required fields",
    { tags: "@smoke" },
    () => {
      cy.EditInputElement("Code", faker.datatype.number(9999999));
      cy.EditInputElement("Description", faker.random.words(1));
      cy.clickSaveAndCheckResponse();
    }
  );
});
