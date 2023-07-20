import { faker } from "@faker-js/faker";

describe("Create a Building", () => {
  const data = {
    type: "XML Representative",
    facilityName: "123",
    department: "American Indian Education Program",
    portfolioManagerId: "101",
  };

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/Building/Create");
  });

  it("Building - Negative Cases", () => {
    cy.EditInputElement("Code", faker.datatype.number(99999));
    cy.EditInputElement("Name", faker.random.words(1));
    cy.fillCombobox("Building Type Description", "Auto-Building");
    cy.clickAndCheckAlert("Save", "Facility Name is required\r\n");

    cy.fillCombobox("Facility Name", "Automation Facility");
    cy.get("input[aria-label='Type']").eq(0).clear();
    cy.clickAndCheckAlert("Save", "Type is required\r\n");

    cy.fillCombobox("Building Type Description", "Auto-Building");
    cy.get("input[name='Name']").clear();
    cy.clickAndCheckAlert("Save", "Name is required\r\n");

    cy.EditInputElement("Name", faker.random.words(1));
    cy.get("input[name='Code']").clear();
    cy.clickAndCheckAlert("Save", "Code is required\r\n");
  });

  it("Create Building with Required fields", { tags: "@smoke" }, () => {
    cy.EditInputElement("Code", faker.datatype.number(99999999));
    cy.EditInputElement("Name", faker.datatype.number(99999999));
    cy.fillCombobox("Building Type Description", "Auto-Building");
    cy.openFlyoutAndSelectRandomValue("Facility Name");
    cy.clickSaveAndCheckResponse();
  });

  it("Create Building with All fields", () => {
    cy.EditInputElement("Code", faker.datatype.number(99999999));
    cy.EditInputElement("Name", faker.datatype.number(99999999));
    cy.openFlyoutAndSelectRandomValue("Type");
    cy.openFlyoutAndSelectRandomValue("Facility Name");
    cy.EditInputElement("BuildingNumber", faker.datatype.number(99999));
    cy.openFlyoutAndSelectRandomValue("Department");
    cy.openFlyoutAndSelectRandomValue("Account #");
    cy.openFlyoutAndSelectRandomValue("Rate Schedule");
    cy.EditInputElement("ContactName", faker.name.fullName());
    cy.EditInputElement("Email", faker.internet.email());
    cy.EditInputElement("Website", faker.internet.url());
    cy.EditInputElement("OfficePhone", faker.phone.number("###-###-####"));
    cy.EditInputElement("MobilePhone", faker.phone.number("###-###-####"));
    cy.EditInputElement("Fax", faker.phone.number("###-###-####"));
    cy.EditInputElement("YCoordinate", faker.datatype.number(99999));
    cy.EditInputElement("XCoordinate", faker.datatype.number(99999));
    cy.EditInputElement("Country", faker.address.country());
    cy.EditInputElement("Address1", faker.address.streetAddress());
    cy.EditInputElement("Address2", faker.address.secondaryAddress());
    cy.EditInputElement("City", faker.address.city());
    cy.EditInputElement("State", faker.address.stateAbbr());
    cy.EditInputElement("Zip", faker.address.zipCode());
    cy.EditInputElement(
      "GISUniqueId",
      `${faker.helpers.regexpStyleStringParse(
        "10000000-1000-1000-1000-100000000000"
      )}`
    );
    // cy.openFlyoutAndSelectRandomValue('Construction Type');
    cy.EditInputElement("OriginalContractor", faker.random.words(1));
    cy.fillNumericTextBox(0, faker.datatype.number(1000));
    cy.fillNumericTextBox(1, faker.datatype.number(1000));
    cy.fillNumericTextBox(2, faker.datatype.number(1000));
    cy.get("input[aria-label='Completed Date']").type(
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.get("input[aria-label='Warranty Date']").type(
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.fillCheckbox("In Leasable Portfolio");
    cy.fillCheckbox("Off-site Property");
    cy.fillCheckbox("Sublet");
    cy.openFlyoutAndSelectRandomValue("Portfolio Manager ID");
    cy.fillNumericTextBox(3, faker.datatype.number(1000));
    cy.fillNumericTextBox(4, faker.datatype.number(1000));
    cy.fillNumericTextBox(5, faker.datatype.number(1000));
    cy.fillNumericTextBox(6, faker.datatype.number(1000));
    cy.fillNumericTextBox(7, faker.datatype.number(1000));
    cy.fillNumericTextBox(8, faker.datatype.number(1000));
    cy.openFlyoutAndSelectRandomValue("Assigned Tech ID");
    cy.editTextarea("Comments", faker.random.words(5));
    cy.editTextarea("Popup Message", faker.random.words(5));
    cy.editTextarea("Emergency Information", faker.random.words(5));
    cy.editTextarea("Clean Outs", faker.random.words(5));
    cy.editTextarea("Shut Offs", faker.random.words(5));
    cy.editTextarea("Roof Information", faker.random.words(5));
    cy.get("input[aria-label='Roof Warranty']").type(
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.get("input[aria-label='Roof Replaced']").type(
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.EditInputElement("RoofSlope", faker.datatype.number(1000));
    cy.fillNumericTextBox(9, faker.datatype.number(1000));
    cy.editTextarea("Secondary Contractors", faker.name.fullName());

    cy.contains("PMs").click();
    cy.get("#DefaultAddPm").click();
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
    cy.fillNumericTextBox(0, `${faker.datatype.number(10)}`);
    cy.fillNumericTextBox(1, `${faker.datatype.number(10)}`);
    cy.get("input[aria-label='Next PM Date']").type(
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.fillNumericTextBox(2, `${faker.datatype.number(10)}`);
    cy.get("select[aria-label='Recurrence']").select(2);
    cy.getButtonWithText("Save").click();

    cy.contains("Utility Billing").click();
    cy.get("#toolbarAddBilling").click();
    cy.openFlyoutAndSelectRandomValue("Utility Type");
    cy.openFlyoutAndSelectRandomValue("Charge Account");
    cy.openFlyoutAndSelectRandomValue("Credit Account");
    cy.fillNumericTextBox(0, faker.datatype.number(99999));
    cy.get("input[aria-label='Start Date']").type(
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.get("input[aria-label='End Date']").type(
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.getButtonWithText("Save").click();

    cy.contains("Capital Planning").click();
    cy.get("#toolbarAddLevel").click();
    cy.openFlyoutAndSelectRandomValue("Element");
    cy.fillNumericTextBox(1, "99.05");
    cy.getButtonWithText("Save").click();

    cy.contains("Rates").click();
    cy.fillCheckbox("Rentable");
    cy.fillCheckbox("Smoking");
    cy.fillNumericTextBox(0, faker.datatype.number(1000));
    cy.fillNumericTextBox(1, faker.datatype.number(1000));
    cy.fillNumericTextBox(2, faker.datatype.number(1000));
    cy.fillNumericTextBox(3, faker.datatype.number(1000));
    cy.fillNumericTextBox(4, faker.datatype.number(1000));
    cy.fillNumericTextBox(5, faker.datatype.number(1000));
    cy.fillNumericTextBox(6, faker.datatype.number(1000));
    cy.fillNumericTextBox(7, faker.datatype.number(1000));
    cy.openFlyoutAndSelectRandomValue("Account");

    cy.clickSaveAndCheckResponse();
  });
});
