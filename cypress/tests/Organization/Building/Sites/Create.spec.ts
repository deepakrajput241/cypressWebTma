import { faker } from "@faker-js/faker";

describe("Create a Site", () => {
  const data = { portfolioManagerId: "101" };

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/Site/Create");
  });

  it("Site - Negative Cases", () => {
    cy.EditInputElement("Code", faker.datatype.number(99999));
    cy.clickAndCheckAlert("Save", "Name of Site is required\r\n");

    cy.EditInputElement("Name", faker.random.words(2));
    cy.get("input[name='Code']").clear();
    cy.clickAndCheckAlert("Save", "Site Code is required\r\n");
  });

  it("Create Site with Required fields", { tags: "@smoke" }, () => {
    cy.EditInputElement("Code", faker.datatype.number(99999));
    cy.EditInputElement("Name", faker.random.words(2));
    cy.clickSaveAndCheckResponse();
  });

  it("Create Site with All fields", () => {
    cy.EditInputElement("Code", faker.datatype.number(99999));
    cy.EditInputElement("Name", faker.random.words(2));
    cy.EditInputElement("TitledTo", `Auto_${faker.datatype.number(99999)}`);
    cy.get("input[aria-label='Purchase Date']").type(
      new Date().toLocaleDateString("en-US")
    );
    cy.EditInputElement("OriginalSurveyor", faker.random.words(1));
    cy.EditInputElement("LastSurveyor", faker.random.words(1));
    cy.get("input[aria-label='Orig. Survey Date']").type(
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.get("input[aria-label='Last Survey Date']").type(
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.fillNumericTextBox(0, faker.datatype.number(1000));
    cy.EditInputElement("PlatNo", `Plot_${faker.datatype.number(99999)}`);
    cy.EditInputElement("LotNo", `Lot_${faker.datatype.number(99999)}`);
    cy.EditInputElement("LastTaxAmount", faker.datatype.number(99999));
    cy.EditInputElement("Block", faker.datatype.number(99999));
    cy.fillNumericTextBox(1, faker.datatype.number(1000));
    cy.fillNumericTextBox(2, faker.datatype.number(1000));
    cy.EditInputElement("Instrument1", faker.random.words(2));
    cy.EditInputElement("Instrument2", faker.random.words(2));
    cy.EditInputElement("SurveyorPhone1", faker.random.words(2));
    cy.EditInputElement("SurveyorPhone2", faker.random.words(2));
    cy.EditInputElement("County", faker.random.words(2));
    cy.EditInputElement("TaxCode", faker.random.words(2));
    cy.EditInputElement("CurrentTaxes", faker.datatype.number(99999));
    cy.EditInputElement("PlatBook", faker.random.words(2));
    cy.editTextarea("Current Zoning", faker.random.words(5));
    cy.fillCheckbox("Off-site Property");
    cy.fillCheckbox("Sublet");
    cy.fillCheckbox("In Leasable Portfolio");
    cy.openFlyoutAndSelectRandomValue("Portfolio Manager ID");
    cy.editTextarea("Plat Description 1", faker.random.words(5));
    cy.editTextarea("Plat Description 2", faker.random.words(5));
    cy.editTextarea("Plat Description 3", faker.random.words(5));
    cy.editTextarea("Utility Meter Pt. 1", faker.random.words(5));
    cy.editTextarea("Utility Meter Pt. 2", faker.random.words(5));
    cy.editTextarea("Utility Meter Pt. 3", faker.random.words(5));
    cy.editTextarea("Easement Detail 1", faker.random.words(5));
    cy.editTextarea("Easement Detail 2", faker.random.words(5));
    cy.editTextarea("Easement Detail 3", faker.random.words(5));
    cy.EditInputElement("InsuredBy", faker.random.words(2));
    cy.EditInputElement("InsurerPhone", faker.random.words(2));
    cy.editTextarea(
      "Description of Site or Land Parcel",
      `${faker.phone.phoneNumber()}`
    );
    cy.EditInputElement("PolicyNo", `Policy${faker.datatype.number(99999)}`);
    cy.clickSaveAndCheckResponse();
  });
});
