import { faker } from "@faker-js/faker";

const data = {
  agent: "Adam Hanson",
  budgetCode: "WH",
  department: "AIED",
  itemCode: "223355",
  repairCenter: "East Loan",
  requestor: "Account mobile",
  vehicleType: "Vehicle Fleet Tag",
};

function fillRequiredFields() {
  cy.get("[aria-label='Rental #'] input").first().type(faker.random.numeric(5));
  cy.fillCombobox("Agent", data.agent);
  cy.fillCombobox("Repair Center", data.repairCenter);
  cy.fillCombobox("Requestor", data.requestor);
  addRentalResource();
}

function addRentalResource() {
  cy.contains("Add Resource").click();
  cy.fillDateInput("Rental End", new Date().toLocaleDateString("en-US"));
  cy.fillSelect("Item Type", "Vehicle");
  // fill Item Code
  cy.get("span[name='ItemCodeContainer'] input")
    .first()
    .as("itemCode")
    .type(data.itemCode);
  cy.get("li").contains(`${data.itemCode}`).click({ force: true });
  cy.get("@itemCode").should("have.value", data.itemCode);
  cy.contains("button", "Save").click();
}

describe("create Rental", () => {
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/Rental/Create");
  });

  it("should not create Rental without required fields", () => {
    // missing Rental #
    fillRequiredFields();
    cy.get("[aria-label='Rental #'] input").first().clear();
    cy.clickSaveAndCheckAlert("Rental # is required\r\n");

    // missing Agent
    cy.reload();
    fillRequiredFields();
    cy.clearCombobox("Agent");
    cy.clickSaveAndCheckAlert("Agent is required\r\n");

    // missing Repair Center
    cy.reload();
    fillRequiredFields();
    cy.clearCombobox("Repair Center");
    cy.clickSaveAndCheckAlert("Repair Center is required\r\n");

    // missing Requestor
    cy.reload();
    fillRequiredFields();
    cy.clearCombobox("Requestor");
    cy.clickSaveAndCheckAlert("Requestor is required\r\n");

    // missing Rental Resource
    cy.reload();
    cy.get("[aria-label='Rental #'] input")
      .first()
      .type(faker.random.numeric(5));
    cy.fillCombobox("Agent", data.agent);
    cy.fillCombobox("Repair Center", data.repairCenter);
    cy.fillCombobox("Requestor", data.requestor);
    cy.clickSaveAndCheckAlert(
      " At least 1 record is required for Rental Resource Item Grid\r\n"
    );
  });

  it(
    "should create new Rental with required fields",
    { tags: "@smoke" },
    () => {
      fillRequiredFields();
      cy.clickSaveAndCheckResponse();

      cy.clickDeleteAndCheckResponse();
    }
  );

  it.skip("Create new Rental with All Fields", () => {
    cy.fillNumericTextBox(0, faker.datatype.number(999999));
    cy.fillCombobox("Agent", 1);
    cy.fillCombobox("Repair Center", 1);
    cy.EditInputElement("Organization", `Auto_${faker.datatype.number(999)}`);
    cy.fillCombobox("Charge Account", 1);
    cy.fillCombobox("Tax Rate", 1);
    cy.fillCombobox("Requestor", 1);
    cy.EditInputElement(
      "ReferenceNumber",
      `Auto_${faker.datatype.number(999)}`
    );
    cy.fillCombobox("Department", 1);
    cy.fillCombobox("Budget Code", 1);
    cy.EditInputElement("Address1", faker.address.streetAddress());
    cy.EditInputElement("Address2", faker.address.secondaryAddress());
    cy.EditInputElement("City", faker.address.city());
    cy.EditInputElement("State", faker.address.stateAbbr());
    cy.EditInputElement("Zip", faker.address.zipCode());
    cy.EditInputElement("PhoneNumber", faker.phone.number("###-###-####"));
    cy.EditInputElement("FaxNumber", faker.phone.number("###-###-####"));
    cy.EditInputElement("Email", faker.internet.email());
    cy.EditInputElement("Country", faker.address.country());
    cy.EditInputElement("ContactPerson", faker.name.fullName());
    cy.get("#toolbarAddRentalResource").should("be.visible").click().wait(1000);
    cy.get(
      "input[aria-label='Rental End'][k-options='dateTimeCtrl.dateOptions']"
    ).type(new Date().toLocaleDateString("en-US"));
    cy.get("select[name='ItemTypeId']").select(2);
    cy.get("div[name='ItemCodeBtnContainer']").should("be.visible").click();
    cy.get(".k-grid-content.k-auto-scrollable")
      .eq(1)
      .should("be.visible")
      .find("tr")
      .then((row) =>
        cy
          .get(".k-button.k-button-icontext")
          .eq(Cypress._.random(0, row.length - 1))
          .click()
      );
    cy.getButtonWithText("Save").click();
    cy.editTextarea("Comments", faker.random.words(5));
    cy.clickAndCheckResponse("Save", "POST", "/Rental/Create*", 200);
  });
});
