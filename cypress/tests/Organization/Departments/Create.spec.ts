import { faker } from "@faker-js/faker";

describe("Create Departments", () => {
  const data = {
    type: "Administrative",
    account: "1111 2222 3333 4444",
    rateSchedule: "1012",
  };

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/Department/Create");
  });

  it("Departments - Negative Cases", () => {
    cy.EditInputElement("Code", faker.datatype.number(10000));
    cy.EditInputElement("Name", faker.random.words(2));
    cy.clickAndCheckAlert("Save", "Type is required\r\n");

    cy.fillCombobox("Department Type Description", "Department type auto");
    cy.get("input[name='Code']").clear();
    cy.clickAndCheckAlert("Save", "Code is required\r\n");

    cy.EditInputElement("Code", faker.datatype.number(10000));
    cy.get("input[name='Name']").clear();
    cy.clickAndCheckAlert("Save", "Department Name is required\r\n");

    cy.EditInputElement("Name", faker.random.words(2));
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "/Department/Create?*",
      200,
      "Error",
      "Repair Centers\r\n\r\nAt least 1 record is required for Department Repair Center Grid\r\n"
    );
  });

  it("Create Department with Required fields", { tags: "@smoke" }, () => {
    cy.EditInputElement("Code", faker.datatype.number(999999999));
    cy.EditInputElement("Name", faker.random.words(2));
    cy.fillCombobox("Department Type Description", "Department type auto");
    cy.selectRepairCenter();
    cy.clickSaveAndCheckResponse();
  });

  it("Create Department with All fields", () => {
    cy.EditInputElement("Code", faker.datatype.number(999999999));
    cy.EditInputElement("Name", faker.random.words(2));
    cy.openFlyoutAndSelectRandomValue("Type");
    // cy.openFlyoutAndSelectRandomValue('Account ');
    cy.openFlyoutAndSelectRandomValue("Rate Schedule");
    cy.fillNumericTextBox(0, faker.datatype.number(1000));
    cy.EditInputElement("Contact", faker.name.fullName());
    cy.EditInputElement("Email", faker.internet.email());
    cy.EditInputElement("Website", faker.internet.url());
    cy.get("input[aria-label='Office Phone #']").type(
      faker.phone.number("###-###-####")
    );
    cy.EditInputElement("MobilePhone", faker.phone.number("###-###-####"));
    cy.EditInputElement("Fax", faker.phone.number("###-###-####"));
    cy.EditInputElement("Country", faker.address.country());
    cy.EditInputElement("Address1", faker.address.streetAddress());
    cy.EditInputElement("Address2", faker.address.secondaryAddress());
    cy.EditInputElement("City", faker.address.city());
    cy.EditInputElement("State", faker.address.stateAbbr());
    cy.EditInputElement("Zip", faker.address.zipCode());
    cy.editTextarea("Comments", faker.random.words(10));

    cy.selectRepairCenter();

    cy.contains("Accounts").click();
    cy.get("#toolbarAddAccount").click();
    cy.selectCheckBoxFromGrid(
      "/html/body/pageslide[1]/div/div/div/div[2]/form/div/div/div/div/div[2]/table/tbody/tr[1]/td[1]/input"
    );
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
    cy.EditInputElement("Spousename", faker.name.firstName());
    cy.EditInputElement("JobTitle", faker.name.jobTitle());
    cy.EditInputElement("Department", faker.name.jobType(1));
    cy.EditInputElement("Office", faker.random.words(1));
    cy.EditInputElement("Profession", faker.name.jobType());

    cy.EditInputElement("Company", faker.company.companySuffix());
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
    cy.get("#toolbarAddNote").should("be.visible").click();
    cy.EditInputElement("Title", faker.random.words(1));
    cy.editTextarea("Note", faker.random.words(5));
    cy.EditInputElement("OwnerName", faker.name.fullName());
    cy.getButtonWithText("Save").click();

    //Add Task
    cy.get("#toolbarAddTask").click();
    cy.EditInputElement("Title", faker.random.words(1));
    cy.fillNumericTextBox(0, faker.datatype.number(24));
    cy.EditInputElement("BillingInformation", faker.random.words(1));
    cy.EditInputElement("StatusNote", faker.random.words(1));
    cy.EditInputElement("Priority", faker.datatype.number(10));
    cy.fillNumericTextBox(1, faker.datatype.number(24));
    cy.EditInputElement("OwnerName", faker.name.fullName());
    cy.fillNumericTextBox(2, faker.datatype.number(24));
    cy.EditInputElement("Email", faker.internet.email());
    cy.fillCombobox("Status", 3);
    cy.getButtonWithText("Save").click();

    cy.contains("Utility Billing").click();
    cy.get("#toolbarAddBilling").click();
    cy.openFlyoutAndSelectRandomValue("Utility Type");
    cy.openFlyoutAndSelectRandomValue("Charge Account");
    cy.openFlyoutAndSelectRandomValue("Credit Account");
    cy.fillNumericTextBox(0, faker.datatype.number(24));
    cy.get("input[aria-label='Start Date']").type(
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.get("input[aria-label='End Date']").type(
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.getButtonWithText("Save").click();

    cy.contains("Smart Route").click();
    cy.get("#toolbarAddAuthorizer").click();
    cy.fillCombobox("User", 1);
    cy.fillNumericTextBox(0, faker.datatype.number(10));
    cy.getButtonWithText("Save").click();

    cy.clickSaveAndCheckResponse();
  });
});
