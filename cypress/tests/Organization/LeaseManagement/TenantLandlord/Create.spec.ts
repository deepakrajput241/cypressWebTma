import { faker } from "@faker-js/faker";

describe("Create new Tenant/Landlord with All Fields", () => {
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/Tenant/Create");
  });

  it("Tenant/Landlord - Negative Cases", { tags: "@smoke" }, () => {
    cy.EditInputElement("Code", faker.datatype.number(999999999));
    cy.clickAndCheckAlert("Save", "Name is required\r\n");

    cy.EditInputElement("Name", faker.random.words(2));
    cy.get("input[name='Code']").clear();
    cy.clickAndCheckAlert("Save", "Code is required\r\n");
  });

  it(
    "Create Tenant/Landlord Records with Required fields",
    { tags: "@smoke" },
    () => {
      cy.EditInputElement("Code", faker.datatype.number(999999999));
      cy.EditInputElement("Name", faker.random.words(2));
      cy.clickSaveAndCheckResponse();
    }
  );

  it("Create Tenant/Landlord Records with All fields", () => {
    cy.EditInputElement("Code", faker.datatype.number(999999999));
    cy.EditInputElement("Name", faker.random.words(2));
    cy.EditInputElement("Email", faker.internet.email());
    cy.EditInputElement("Website", faker.internet.url());
    cy.EditInputElement("Address1", faker.address.streetAddress());
    cy.EditInputElement("Address2", faker.address.secondaryAddress());
    cy.EditInputElement("TaxID", faker.datatype.number(1000));
    cy.EditInputElement("TaxCode", faker.datatype.number(1000));
    cy.EditInputElement("City", faker.address.city());
    cy.EditInputElement("State", faker.address.state());
    cy.EditInputElement("ZipCode", faker.address.zipCode());
    cy.editTextarea("Comment", faker.random.words(10));
    cy.clickSaveAndCheckResponse();
  });
});
