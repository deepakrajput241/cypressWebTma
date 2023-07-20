import { faker } from "@faker-js/faker";

describe("Create Districts", () => {
  const data = { regionCode: "A13335" };

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/District/Create");
  });

  it("Districts - Negative Cases", () => {
    cy.EditInputElement("Code", faker.datatype.number(9999999));
    cy.EditInputElement("Name", faker.random.words(2));
    cy.clickAndCheckAlert(
      "Save",
      "Region Code is required\r\nRegion Name is required\r\n"
    );

    cy.openFlyoutAndSelectRandomValue("Region Code");
    cy.get("input[name='Code']").clear();
    cy.clickAndCheckAlert("Save", "Code is required\r\n");

    cy.EditInputElement("Code", faker.datatype.number(9999999));
    cy.get("input[name='Name']").clear();
    cy.clickAndCheckAlert("Save", "Name is required\r\n");
  });

  it("Create District with Required fields", { tags: "@smoke" }, () => {
    cy.EditInputElement("Code", faker.datatype.number(9999999));
    cy.EditInputElement("Name", faker.random.words(2));
    cy.openFlyoutAndSelectRandomValue("Region Code");
    cy.clickSaveAndCheckResponse();
  });

  it("Create District with All fields", () => {
    cy.EditInputElement("Code", faker.datatype.number(9999999));
    cy.EditInputElement("Name", faker.random.words(2));
    cy.openFlyoutAndSelectRandomValue("Region Code");
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
    cy.editTextarea("Comments", faker.random.words(5));
    cy.clickSaveAndCheckResponse();
  });
});
