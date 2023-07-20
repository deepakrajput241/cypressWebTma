import { faker } from "@faker-js/faker";

const data = {
  type: "Administrative",
  districtCode: "District Code",
  accounts: "1111 2222 3333 4444",
};

function fillRequiredFields() {
  cy.fillInput("Facility Code", faker.random.numeric(5));
  cy.fillCombobox("Type", data.type);
  cy.fillInput("Facility Name", faker.random.words(2));
  cy.contains("Repair Centers").click();
  cy.addRepairCenter();
  cy.contains("Identity").click();
}

describe("Create New Facility", () => {
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/Facility/Create");
  });

  it("Facilities - Negative Cases", () => {
    // without Facility Code
    fillRequiredFields();
    cy.clearInput("Facility Code");
    cy.clickSaveAndCheckAlert("Facility Code is required\r\n");

    // without Type
    cy.reload();
    fillRequiredFields();
    cy.clearCombobox("Type");
    cy.clickSaveAndCheckAlert("Type is required\r\n");

    // without Facility Name
    cy.reload();
    fillRequiredFields();
    cy.clearInput("Facility Name");
    cy.clickSaveAndCheckAlert("Facility Name is required\r\n");

    // without Repair Center
    cy.reload();
    cy.fillInput("Facility Code", faker.random.numeric(5));
    cy.fillCombobox("Type", data.type);
    cy.fillInput("Facility Name", faker.random.words(2));
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "/Facility/Create?*",
      200,
      "Error",
      "Identity\r\n\r\nRepair Center is required\r\n\r\nRepair Centers\r\n\r\nAt least 1 record is required for Facility Repair Center Grid\r\n"
    );
  });

  it(
    "should create Facility with required fields, and then delete it",
    { tags: "@smoke" },
    () => {
      fillRequiredFields();
      cy.clickSaveAndCheckResponse();

      cy.clickDeleteAndCheckResponse();
    }
  );

  it.skip("Create Facility with All fields", () => {
    cy.EditInputElement("Code", faker.datatype.number(99999));
    cy.EditInputElement("Name", faker.datatype.number(99999));
    cy.openFlyoutAndSelectRandomValue("District Name");
    cy.openFlyoutAndSelectRandomValue("Accounts");
    cy.openFlyoutAndSelectRandomValue("Type");
    cy.openFlyoutAndSelectRandomValue("Rate Schedule");
    cy.EditInputElement("Manager", faker.name.fullName());
    cy.EditInputElement("Email", faker.internet.email());
    cy.EditInputElement("Url", faker.internet.url());
    cy.EditInputElement("Phone", faker.phone.number("###-###-####"));
    cy.EditInputElement("MobilePhone", faker.phone.number("###-###-####"));
    cy.EditInputElement("Fax", faker.phone.number("###-###-####"));
    cy.fillNumericTextBox(0, faker.datatype.number(99999));
    cy.fillNumericTextBox(1, faker.datatype.number(99999));
    cy.EditInputElement("Country", faker.address.country());
    cy.EditInputElement("Address1", faker.address.streetAddress());
    cy.EditInputElement("Address2", faker.address.secondaryAddress());
    cy.EditInputElement("City", faker.address.city());
    cy.EditInputElement("State", faker.address.stateAbbr());
    cy.EditInputElement("Zip", faker.address.zipCode());
    cy.EditInputElement("GISUniqueId", "11111111-1212-1212-1212-111111111111");
    cy.fillNumericTextBox(2, faker.datatype.number(99999));
    cy.editTextarea("Comments", faker.random.words(10));
    cy.editTextarea("Popup Message", faker.random.words(10));

    //Click On Attachment Tab
    cy.contains("Attachment").click();
    cy.get("#toolbarAddContact").click();
    cy.EditInputElement("Title", faker.name.jobTitle());
    cy.EditInputElement("FirstName", faker.name.firstName());
    cy.EditInputElement("LastName", faker.name.lastName());
    cy.EditInputElement("MiddleName", faker.name.middleName());
    cy.EditInputElement("Address1", faker.address.streetAddress());
    cy.EditInputElement("Address2", faker.address.secondaryAddress());
    cy.EditInputElement("City", faker.address.city());
    cy.EditInputElement("State", faker.address.state());
    cy.EditInputElement("Zip", faker.address.zipCode());
    cy.EditInputElement("Suffix", faker.name.suffix());
    cy.EditInputElement("Nickname", faker.name.firstName());
    cy.EditInputElement("Spousename", faker.name.firstName());
    cy.EditInputElement("JobTitle", faker.name.jobTitle());
    cy.EditInputElement("Department", faker.commerce.department());
    cy.EditInputElement("Office", faker.random.words(1));
    cy.EditInputElement("Profession", faker.name.jobType());

    cy.EditInputElement("Company", faker.company.name());
    cy.EditInputElement("BusinessPhone", faker.phone.number("###-###-####"));
    cy.EditInputElement("BusinessFax", faker.phone.number("###-###-####"));
    cy.EditInputElement("ManagerName", faker.name.fullName());
    cy.EditInputElement("AssistantName", faker.name.fullName());
    cy.EditInputElement("Email", faker.internet.email());
    cy.EditInputElement("HomePhone", faker.phone.number("###-###-####"));
    cy.EditInputElement("MobilePhone", faker.phone.number("###-###-####"));
    cy.EditInputElement("Url", faker.internet.url());
    cy.get("input[aria-label='Birthday']").type(
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.get("input[aria-label='Anniversary']").type(
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.get("a[ng-click='saveRecord()']").should("be.visible").click();
    cy.selectRepairCenter();

    //Click On PMs
    cy.contains("PMs").click();
    cy.get("#DefaultAddPm").should("be.visible").click();
    cy.fillCombobox("Task Code", 3);
    cy.fillCombobox("Repair Center", 3);
    cy.fillCombobox("Work Order Type", 3);
    cy.fillCombobox("Priority Code", 3);
    cy.fillCombobox("Trade", 3);
    cy.fillCombobox("Department", 3);
    cy.fillCombobox("Account #", 3);
    cy.fillCombobox("Technician Code", 3);
    cy.fillCombobox("Rate Schedule", 3);
    cy.fillCombobox("Warehouse Code", 3);
    cy.fillCheckbox("Charge");
    cy.fillNumericTextBox(0, faker.datatype.number(10));
    cy.fillNumericTextBox(1, faker.datatype.number(10));
    cy.get("input[aria-label='Next PM Date']").type(
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.fillNumericTextBox(2, faker.datatype.number(10));
    cy.get("select[aria-label='Recurrence']").select(2);
    cy.get("a[ng-click='saveRecord()']").should("be.visible").click();

    cy.clickSaveAndCheckResponse();
  });
});
