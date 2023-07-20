import { faker } from "@faker-js/faker";

describe("Create a Regions", () => {
  const data = { divisonCode: "Divison Code" };

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/Region/Create");
  });

  it("Regions - Negative Cases", { tags: "@smoke" }, () => {
    cy.EditInputElement("Name", faker.random.words(2));
    cy.clickAndCheckAlert("Save", "Code is required\r\n");

    cy.EditInputElement("Code", `A${faker.datatype.number(99999)}`);
    cy.get("input[name='Name']").clear();
    cy.clickAndCheckAlert("Save", "Name is required\r\n");
  });

  it("Create Region with Required fields", { tags: "@smoke" }, () => {
    cy.EditInputElement("Name", faker.random.words(2));
    cy.EditInputElement("Code", `A${faker.datatype.number(99999)}`);
    cy.clickSaveAndCheckResponse();
  });

  it("Create Region with All fields", () => {
    cy.EditInputElement("Name", faker.random.words(2));
    cy.EditInputElement("Code", `A${faker.datatype.number(99999)}`);
    cy.openFlyoutAndSelectRandomValue("Division Code");
    cy.EditInputElement("Manager", faker.name.fullName());
    cy.EditInputElement("Email", faker.internet.email());
    cy.EditInputElement("Url", faker.internet.url());
    cy.EditInputElement("Phone", faker.phone.number("###-###-####"));
    cy.EditInputElement("MobilePhone", faker.phone.number("###-###-####"));
    cy.EditInputElement("Fax", faker.phone.number("###-###-####"));
    cy.EditInputElement("Country", faker.address.country());
    cy.EditInputElement("Address1", faker.address.streetAddress());
    cy.EditInputElement("Address2", faker.address.secondaryAddress());
    cy.EditInputElement("City", faker.address.city());
    cy.EditInputElement("State", faker.address.stateAbbr());
    cy.EditInputElement("Zip", faker.address.zipCode());
    cy.openFlyoutAndSelectRandomValue("Division Name");
    cy.editTextarea("Comments", faker.random.words(2));
    cy.clickSaveAndCheckResponse();
  });
});
