import { faker } from "@faker-js/faker";

const data = {
  balanceType: "Balance Forward",
  detail: "Data",
  group: "Automation test group",
  normalBalance: "Credit",
  subtype: "Avon S",
  type: "Account Developer",
};

function addRepairCenter() {
  cy.contains("Repair Centers").click();
  cy.addRepairCenter();
}

function fillRequiredFields() {
  cy.fillInput("Segment 1", faker.random.numeric(4));
  cy.setWait();
  cy.fillInput("Name", faker.company.name());
  cy.fillCombobox("Type", data.type);
  addRepairCenter();
  cy.contains("Identity").click();
}

describe("add Accounts", () => {
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/Account/Create");
  });

  it("should not add Account without required fields", () => {
    // missing Segment 1
    fillRequiredFields();
    cy.clearInput("Segment 1");
    cy.clickSaveAndCheckAlert(
      "Segment 1 is required\r\nAccount # is required\r\n"
    );

    // missing Name
    cy.reload();
    fillRequiredFields();
    cy.clearInput("Name");
    cy.clickSaveAndCheckAlert("Name is required\r\n");

    // missing Type
    cy.reload();
    fillRequiredFields();
    cy.clearCombobox("Type");
    cy.clickSaveAndCheckAlert("Type is required\r\n");

    // missing Repair Center
    cy.reload();
    cy.fillInput("Segment 1", faker.random.numeric(4));
    cy.setWait();
    cy.fillInput("Name", faker.company.name());
    cy.fillCombobox("Type", data.type);
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "/Account/Create*",
      200,
      "Error",
      "Repair Centers\r\n\r\nAt least 1 record is required for Account Repair Center Grid\r\n"
    );
  });

  it(
    "should add Account with required fields, and then delete it",
    { tags: "@smoke" },
    () => {
      fillRequiredFields();
      cy.clickSaveAndCheckResponse();

      cy.clickDeleteAndCheckResponse();
    }
  );

  it("should add Account with all fields, and then delete it", () => {
    cy.fillInput("Segment 1", faker.random.numeric(4));
    cy.setWait();
    cy.fillInput("Segment 2", faker.random.numeric(4));
    cy.setWait();
    cy.fillInput("Segment 3", faker.random.numeric(4));
    cy.setWait();
    cy.fillInput("Segment 4", faker.random.numeric(4));
    cy.fillInput("Alternate Account #", faker.random.numeric(4));
    cy.fillInput("Name", faker.random.words(2));
    cy.fillCombobox("Group", data.group);
    cy.fillSelect("Balance Type", data.balanceType);
    cy.fillNumericTextBoxInput("Starting Balance", faker.finance.amount());
    cy.fillCombobox("Type", data.type);
    cy.fillCombobox("Subtype", data.subtype);
    cy.fillSelect("Normal Balance", data.normalBalance);
    cy.fillNumericTextBoxInput("Encumbered", faker.finance.amount());
    // this field has a max length of ten characters
    cy.fillInput("Test", faker.random.alpha(10));
    cy.fillSelect("Detail", data.detail);
    addRepairCenter();
    cy.clickSaveAndCheckResponse();

    cy.setWait();
    cy.clickDeleteAndCheckResponse();
  });
});
