import { faker } from "@faker-js/faker";

const data = {
  subType: "Borders primary Recycled",
  type: "Aluminium FTP Luxurious",
};

function fillRequiredFields() {
  cy.fillInput("Code", faker.random.numeric(7));
  cy.setWait();
  cy.fillCombobox("Type", data.type);
  cy.fillInput("Description", faker.random.words(5));
  addRepairCenter();
}

function addRepairCenter() {
  cy.contains("Repair Centers").click();
  cy.addRepairCenter();
}

describe("add Funding Source", () => {
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/CAFundingSource/Create");
  });

  it("should not add Funding Source without required fields", () => {
    // missing Code
    fillRequiredFields();
    cy.contains("Identity").click();
    cy.clearInput("Code");
    cy.clickSaveAndCheckAlert("Code is required\r\n");

    // missing Type
    cy.reload();
    fillRequiredFields();
    cy.contains("Identity").click();
    cy.clearCombobox("Type");
    cy.clickSaveAndCheckAlert("Type is required\r\n");

    // missing Description
    cy.reload();
    fillRequiredFields();
    cy.contains("Identity").click();
    cy.clearInput("Description");
    cy.clickSaveAndCheckAlert("Description is required\r\n");

    // missing Repair Center
    cy.reload();
    fillRequiredFields();
    // delete Repair Center
    cy.get("tbody a:first").click();
    cy.contains("Identity").click();
    cy.clickSaveAndCheckAlert(
      " At least 1 record is required for CA Funding Source Repair Center\r\n"
    );
  });

  it(
    "should add Funding Source with required fields, and then delete it",
    { tags: "@smoke" },
    () => {
      fillRequiredFields();
      cy.clickSaveAndCheckResponse();

      //TODO: app error - see ticket 1556
      // cy.clickDeleteAndCheckResponse();
    }
  );

  it("should add Funding Source with all fields, and then delete it", () => {
    cy.fillInput("Code", faker.random.numeric(7));
    cy.fillCombobox("Type", data.type);
    cy.fillCombobox("Sub-type", data.subType);
    cy.fillInput("Description", faker.random.words(5));
    cy.fillTextarea("Detail", faker.lorem.sentences(2));

    //TODO: app error - see ticket 1556
    // cy.clickSaveAndCheckResponse();
  });
});
