import { faker } from "@faker-js/faker";

describe("Create a Division", () => {
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/Division/Create");
  });

  it("Divisions - Negative Cases", () => {
    cy.EditInputElement("Code", faker.datatype.number(99999999));
    cy.clickAndCheckAlert("Save", "Name is required\r\n");

    cy.EditInputElement("Name", faker.random.words(2));
    cy.get("input[name='Code']").clear();
    cy.clickAndCheckAlert("Save", "Code is required\r\n");
  });

  it("Create Division with Required fields", { tags: "@smoke" }, () => {
    cy.EditInputElement("Code", faker.datatype.number(99999999));
    cy.EditInputElement("Name", faker.random.words(2));
    cy.clickSaveAndCheckResponse();
  });

  it("Create Division with All fields", () => {
    cy.EditInputElement("Code", faker.datatype.number(99999999));
    cy.EditInputElement("Name", faker.random.words(2));
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
    cy.EditInputElement("State", faker.address.state());
    cy.EditInputElement("Zip", faker.address.zipCode());
    cy.editTextarea("Comments", faker.random.words(5));

    cy.contains("Contractor").click();
    cy.get("#toolbarAddContractor").click();
    cy.get("#divItems").click().wait(1000);
    cy.get("a[name='Search']").should("be.visible").click();
    cy.selectRandomCheckBoxFromGrid(
      1,
      "/html/body/pageslide[1]/div/div/div/div[2]/form/div/div[3]/div/div/div/div/div/div[2]/table/tbody/tr[1]/td[1]/input"
    );
    cy.getButtonWithText("Add Selected").click();

    cy.clickSaveAndCheckResponse();
  });
});
