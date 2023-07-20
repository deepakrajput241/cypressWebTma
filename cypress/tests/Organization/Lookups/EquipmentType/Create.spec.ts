import { faker } from "@faker-js/faker";

describe("Create Equipment Type record", () => {
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/Lookup/EquipmentType/Create");
  });

  it("Equipment Type - Negative Cases", { tags: "@smoke" }, () => {
    cy.EditInputElement("Code", `Auto-${faker.datatype.number(99999)}`);
    cy.clickAndCheckAlert("Save", "Description is required\r\n");

    cy.EditInputElement("Description", faker.random.words(2));
    cy.get("input[name='Code']").clear();
    cy.clickAndCheckAlert("Save", "Code is required\r\n");
  });

  it(
    "Create an Equipment Type with Required fields",
    { tags: "@smoke" },
    () => {
      cy.EditInputElement("Code", `Auto-${faker.datatype.number(99999)}`);
      cy.EditInputElement("Description", faker.random.words(2));
      cy.selectRepairCenter();
      cy.clickSaveAndCheckResponse();
    }
  );
});
