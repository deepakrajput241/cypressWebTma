import { faker } from "@faker-js/faker";

describe("Create Lock record", () => {
  const data = {
    lockShopCode: "Auto-7",
    core: "2",
    keySystem: "AutoSystem",
  };

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("#!/Lock/Create");
  });

  it("Lock - Negative Cases", () => {
    cy.EditInputElement("Finish", faker.random.words(1));
    cy.EditInputElement("Number", faker.datatype.number(999999));
    cy.EditInputElement("Description", faker.random.words(2));
    cy.clickAndCheckAlert("Save", "Key # is required\r\n");

    cy.fillCombobox("Key #", 1);
    cy.get("input[name='Number']").clear();
    cy.clickAndCheckAlert("Save", "Lock # is required\r\n");

    cy.EditInputElement("Number", faker.datatype.number(999999));
    cy.get("input[name='Description']").clear();
    cy.clickAndCheckAlert("Save", "Description is required\r\n");
  });

  it("Create Lock record with required field", { tags: "@smoke" }, () => {
    cy.fillCombobox("Key #", 1);
    cy.EditInputElement("Number", faker.datatype.number(999999));
    cy.EditInputElement("Description", faker.random.words(2));
    cy.clickSaveAndCheckResponse();
  });
});
