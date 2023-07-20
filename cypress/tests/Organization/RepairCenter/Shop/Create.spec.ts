import { faker } from "@faker-js/faker";

describe("Create new Shop", () => {
  beforeEach("Login to Web app", () => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/Shop/Create");
  });

  it("Shop - Negative Cases", { tags: "@smoke" }, () => {
    cy.EditInputElement("Code", faker.datatype.number(99999));
    cy.clickAndCheckAlert("Save", "Name is required\r\n");

    cy.EditInputElement("Name", faker.random.words(2));
    cy.get("input[name='Code']").clear();
    cy.clickAndCheckAlert("Save", "Code is required\r\n");

    cy.EditInputElement("Code", faker.datatype.number(99999));
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "/Shop/Create?*",
      200,
      "Error",
      "Repair Centers\r\n\r\nAt least 1 record is required for Shop Repair Center Grid\r\n"
    );
  });

  it("Create new Shop with Required fields", { tags: "@smoke" }, () => {
    cy.EditInputElement("Code", faker.datatype.number(99999));
    cy.EditInputElement("Name", faker.random.words(2));
    cy.selectRepairCenter();
    cy.clickSaveAndCheckResponse();
  });

  it("Create new Shop with all fields", () => {
    cy.EditInputElement("Code", faker.datatype.number(99999));
    cy.EditInputElement("Name", faker.random.words(2));
    cy.EditInputElement("Address1", faker.random.words(2));
    cy.EditInputElement("Address2", faker.random.words(2));
    cy.EditInputElement("City", faker.address.cityName());
    cy.EditInputElement("State", faker.datatype.number(1000));
    cy.EditInputElement("Zip", faker.datatype.number(1000));
    cy.EditInputElement("Country", faker.random.words(1));
    cy.EditInputElement("ManagerName", faker.random.words(2));
    cy.EditInputElement("PhoneNumber", faker.phone.number("###-###-####"));
    cy.EditInputElement("FaxNumber", faker.datatype.number(1000));
    cy.EditInputElement("Email", faker.internet.email());
    cy.openFlyoutAndSelectRandomValue("Labor Account");
    cy.openFlyoutAndSelectRandomValue("Part Account");
    cy.openFlyoutAndSelectRandomValue("Other Account");
    cy.selectRepairCenter();
    cy.clickSaveAndCheckResponse();
  });
});
