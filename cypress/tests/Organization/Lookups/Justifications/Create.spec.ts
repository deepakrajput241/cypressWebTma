import { faker } from "@faker-js/faker";

describe("Create Justification record", () => {
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/Lookup/CPJustification/Create/Identity");
  });

  it("Justification - Negative Cases", { tags: "@smoke" }, () => {
    cy.EditInputElement("Code", `Auto-${faker.datatype.number(99999)}`);
    cy.EditInputElement("Description", faker.random.words(1));
    cy.EditInputElement("Theme", faker.random.words(2));
    cy.clickAndCheckAlert("Save", "Level is required\r\n");

    cy.get("select[name='Level']").select("Health and Safety");
    cy.get("input[name='Theme']").clear();
    cy.clickAndCheckAlert("Save", "Strategic Theme is required\r\n");

    cy.EditInputElement("Theme", faker.random.words(2));
    cy.get("input[name='Code']").clear();
    cy.clickAndCheckAlert("Save", "Code is required\r\n");

    cy.EditInputElement("Code", `Auto-${faker.datatype.number(99999)}`);
    cy.get("input[name='Description']").clear();
    cy.clickAndCheckAlert("Save", "Description is required\r\n");
  });

  it("Create a Justification with Required fields", { tags: "@smoke" }, () => {
    cy.EditInputElement("Code", `Auto-${faker.datatype.number(99999)}`);
    cy.EditInputElement("Description", faker.random.words(1));
    cy.EditInputElement("Theme", faker.random.words(2));
    cy.get("select[name='Level']").select("Health and Safety");
    cy.clickSaveAndCheckResponse();
  });
});
