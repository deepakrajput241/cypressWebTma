import { faker } from "@faker-js/faker";

describe("Create Contractor Rating record", () => {
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/Lookup/ContractRating/Create");
  });

  it("Create new Contractor Ratings without Code", { tags: "@smoke" }, () => {
    cy.EditInputElement("Description", faker.random.words(6));
    cy.clickAndCheckAlert("Save", "Code is required\r\n");

    cy.EditInputElement("Code", faker.datatype.number(99999));
    cy.get("input[name='Description']").clear();
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "/ContractRating/Create?*",
      200,
      "Error",
      "Identity\r\n\r\nDescription is required\r\n"
    );
  });

  it("Create new Contractor Ratings Data", { tags: "@smoke" }, () => {
    cy.EditInputElement("Code", faker.datatype.number(99999));
    cy.EditInputElement("Description", faker.random.words(2));
    cy.clickSaveAndCheckResponse();
  });
});
