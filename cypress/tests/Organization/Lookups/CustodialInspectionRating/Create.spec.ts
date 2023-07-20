import { faker } from "@faker-js/faker";

describe("Create new Custodial Inspection Rating", () => {
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/Lookup/CDInspectionRating/Create");
  });

  it("Custodial Inspection Rating - Negative Cases", { tags: "@smoke" }, () => {
    cy.EditInputElement("Description", faker.random.words(5));
    cy.clickAndCheckAlert("Save", "Code is required\r\n");

    cy.EditInputElement("Code", faker.datatype.number(999999));
    cy.get("input[name='Description']").clear();
    cy.clickAndCheckAlert("Save", "Description is required\r\n");
  });

  it(
    "Create Custodial Inspection Rating with Required Fields",
    { tags: "@smoke" },
    () => {
      cy.login(Cypress.env("user1"));
      cy.visit("/#!/Lookup/CDInspectionRating/Create");
      cy.EditInputElement("Code", faker.datatype.number(999999));
      cy.EditInputElement("Description", faker.random.words(5));
      cy.clickSaveAndCheckResponse();
    }
  );

  it("Create Custodial Inspection Rating with All Fields", () => {
    cy.EditInputElement("Code", faker.datatype.number(999999));
    cy.EditInputElement("Description", faker.random.words(5));
    cy.fillNumericTextBox(0, faker.datatype.number(100));
    cy.clickSaveAndCheckResponse();
  });
});
