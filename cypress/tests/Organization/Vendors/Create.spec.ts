import { faker } from "@faker-js/faker";

describe("Create New Vendor", () => {
  const data = {
    type: "Professional Services",
    account: "1111 2222 3333 4444",
  };

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/Vendor/Create");
  });

  it("Vendors - Negative Cases", () => {
    cy.wait(1000);
    cy.clickAndCheckAlert(
      "Save",
      "At least one of 3 checkboxes: Vendor, Manufacturer,Contractor  is required"
    );

    cy.EditInputElement("Name", faker.random.words(2));
    cy.fillCombobox("Vendor Type Description", "Auto type");
    cy.clickCheckbox("IsVendor");
    cy.clickAndCheckAlert("Save", "Code is required\r\n");

    cy.EditInputElement("Code", faker.datatype.number(9999999));
    cy.get("input[name='Name']").clear();
    cy.clickAndCheckAlert("Save", "Name is required\r\n");

    cy.EditInputElement("Name", faker.random.words(2));
    cy.get("input[aria-label='Type']").eq(0).clear();
    cy.clickAndCheckAlert("Save", "Type is required\r\n");

    cy.fillCombobox("Vendor Type Description", "Auto type");
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "/Vendor/Create?*",
      200,
      "Error",
      "Repair Centers\r\n\r\nAt least 1 record is required for Repair Center Grid Code\r\n"
    );
  });

  it("Create Vendor with Required fields", { tags: "@smoke" }, () => {
    cy.EditInputElement("Code", faker.datatype.number(99999999));
    cy.EditInputElement("Name", faker.random.words(2));
    cy.fillCombobox("Vendor Type Description", "Auto type");
    cy.clickCheckbox("IsVendor");
    cy.selectRepairCenter();
    cy.clickSaveAndCheckResponse();
  });

  it("Create Vendor with All fields", () => {
    cy.EditInputElement("Code", faker.datatype.number(9999999));
    cy.EditInputElement("Name", faker.random.words(2));
    cy.openFlyoutAndSelectRandomValue("Type");
    cy.EditInputElement("URL", faker.internet.url());
    cy.EditInputElement("Term", faker.datatype.number(1000));
    cy.fillNumericTextBox(0, faker.datatype.number(100));
    cy.fillNumericTextBox(1, faker.datatype.number(100));
    cy.fillNumericTextBox(2, faker.datatype.number(100));
    cy.editTextarea("Comments", faker.random.words(5));
    cy.fillCheckbox("Vendor");
    cy.fillCheckbox("Manufacturer");
    cy.fillCheckbox("Contractor");
    cy.fillCheckbox("Broker");
    cy.fillCheckbox("Block P Card");
    cy.EditInputElement("CustomerNumber", `Cust${faker.datatype.number(1000)}`);
    cy.fillNumericTextBox(3, faker.datatype.number(100));
    cy.EditInputElement("SICCode", faker.datatype.number(1000));
    cy.fillCheckbox("Taxable OTP line");
    cy.EditInputElement("TaxCode", `Tax${faker.datatype.number(1000)}`);
    cy.EditInputElement("TaxNumber", `${faker.datatype.number(99999999)}`);
    cy.fillNumericTextBox(4, faker.datatype.number(100));
    cy.get("input[aria-label='Insurance Expires']").type(
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.fillNumericTextBox(6, faker.datatype.number(100));
    cy.EditInputElement(
      "AlternateIdentity",
      `Auto_${faker.datatype.number(1000)}`
    );
    cy.EditInputElement("OrganizationUnit", faker.datatype.number(1000));
    cy.fillNumericTextBox(7, faker.datatype.number(100));
    cy.openFlyoutAndSelectRandomValue("Account");

    cy.selectRepairCenter();

    cy.contains("Address").click();
    cy.get("#toolbarAddVendorAddress").click();
    cy.EditInputElement("Category", faker.random.words(2));
    cy.EditInputElement("AddressLine1", faker.address.streetAddress());
    cy.EditInputElement("AddressLine2", faker.address.secondaryAddress());
    cy.EditInputElement("City", faker.address.city());
    cy.EditInputElement("State", faker.address.stateAbbr());
    cy.EditInputElement("Zipcode", faker.address.zipCode());
    cy.EditInputElement("Contact", faker.name.fullName());
    cy.EditInputElement("Email", faker.internet.email());
    cy.EditInputElement("Phone", faker.phone.number("###-###-####"));
    cy.EditInputElement("PhoneExtension", faker.datatype.number(99999));
    cy.EditInputElement("Fax", faker.phone.number("###-###-####"));
    cy.getButtonWithText("Save").click();

    cy.contains("Task Type").click();
    cy.get("#toolbarAddVendorTaskType").click();
    cy.selectRandomCheckBoxFromGrid(
      1,
      "/html/body/pageslide[1]/div/div/div/div[2]/form/div/div/div/div[2]/table/tbody/tr[1]/td[1]/input"
    );
    cy.getButtonWithText("Add Selected").click();

    cy.contains("Utility Account").click();
    cy.get("#toolbarAddVendorUtility").click();
    cy.EditInputElement("Code", `Auto_${faker.datatype.number(99999)}`);
    cy.EditInputElement("Name", faker.random.words(2));
    cy.getButtonWithText("Save").click();

    cy.contains("Attachment").click();
    cy.get("#toolbarAddContact").click();
    cy.EditInputElement("Title", faker.random.words(1));
    cy.EditInputElement("FirstName", faker.name.firstName());
    cy.EditInputElement("LastName", faker.name.lastName());
    cy.EditInputElement("MiddleName", faker.name.middleName());
    cy.EditInputElement("Address1", faker.address.streetAddress());
    cy.EditInputElement("Address2", faker.address.secondaryAddress());
    cy.EditInputElement("City", faker.address.city());
    cy.EditInputElement("State", faker.address.stateAbbr());
    cy.EditInputElement("Zip", faker.address.zipCode());
    cy.EditInputElement("Suffix", faker.name.suffix());
    cy.EditInputElement("Nickname", faker.name.firstName());
    cy.EditInputElement("Spousename", faker.name.fullName());
    cy.EditInputElement("JobTitle", faker.name.jobTitle());
    cy.EditInputElement("Department", faker.commerce.department());
    cy.EditInputElement("Office", faker.random.words(1));
    cy.EditInputElement("Profession", faker.name.jobType());

    cy.EditInputElement("Company", faker.random.words(1));
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
    cy.getButtonWithText("Save").click();

    //Add Note
    cy.get("#toolbarAddNote").click();
    cy.fillCheckbox("Private");
    cy.EditInputElement("Title", faker.random.words(1));
    cy.editTextarea("Note", faker.random.words(5));
    cy.EditInputElement("OwnerName", faker.name.fullName());
    cy.getButtonWithText("Save").click();

    //Add Task
    cy.get("#toolbarAddTask").click();
    cy.fillCheckbox("Private");
    cy.EditInputElement("Title", faker.random.word(1));
    cy.fillNumericTextBox(0, faker.datatype.number(24));
    cy.EditInputElement("BillingInformation", faker.random.words(1));
    cy.EditInputElement("StatusNote", faker.random.words(1));
    cy.EditInputElement("Priority", faker.datatype.number(100));
    cy.fillNumericTextBox(1, faker.datatype.number(24));
    cy.EditInputElement("OwnerName", faker.name.fullName());
    cy.fillNumericTextBox(2, faker.datatype.number(24));
    cy.EditInputElement("Email", faker.internet.email());
    cy.fillCombobox("Status", "3");
    cy.getButtonWithText("Save").click();

    cy.clickSaveAndCheckResponse();
  });
});
