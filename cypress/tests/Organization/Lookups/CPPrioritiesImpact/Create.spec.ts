import { faker } from "@faker-js/faker";

describe("Create CP Priorities Impact", () => {
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/Lookup/CPImpact/Create");
  });

  it("CP Priorities / Impact - Negative Cases", { tags: "@smoke" }, () => {
    cy.EditInputElement("Code", faker.datatype.number(9999999));
    cy.EditInputElement("Description", faker.random.words(6));
    cy.clickAndCheckAlert("Save", "Level is required\r\n");

    cy.get("select[name='Level']").select(2);
    cy.get("input[name='Code']").clear();
    cy.clickAndCheckAlert("Save", "Code is required\r\n");

    cy.EditInputElement("Code", faker.datatype.number(9999999));
    cy.get("input[name='Description']").clear();
    cy.clickAndCheckAlert("Save", "Description is required\r\n");
  });

  it(
    "Create New CP Priorities With Required Fields",
    { tags: "@smoke" },
    () => {
      cy.EditInputElement("Code", faker.datatype.number(9999999));
      cy.EditInputElement("Description", faker.random.words(6));
      cy.get("select[name='Level']").select(2);
      cy.clickSaveAndCheckResponse();
    }
  );

  it("Create new CP Priorities Data with All fields", () => {
    cy.EditInputElement("Code", faker.datatype.number(9999999));
    cy.EditInputElement("Description", faker.random.words(2));
    cy.get("select[name='Level']").select(2);
    cy.fillNumericTextBox(0, faker.datatype.number(1000));
    cy.clickSaveAndCheckResponse();
  });
});
