import { faker } from "@faker-js/faker";

describe("Create Requisition For Quote", () => {
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/Quote/Create");
  });

  it("Purchse For Quote - Negative Cases", { tags: "@smoke" }, () => {
    cy.fillCombobox("RC Code", 2);
    cy.clickAndCheckAlert("Save", "At least one Quote Item line is required");
  });

  it(
    "Create Purchase For Quote record with required fields",
    { tags: "@smoke" },
    () => {
      cy.get("#toolbarAddQuoteItem").click();
      cy.fillCombobox("Account", 2);
      cy.fillCombobox("Part", 2);
      cy.fillNumericTextBox(0, faker.datatype.number(10));
      cy.getButtonWithText("Save").click();
      cy.clickSaveAndCheckResponse();
    }
  );

  it("Create Purchase For Quote record with All fields", () => {
    cy.fillCombobox("RC Code", 2);
    cy.fillCombobox("Department", 2);
    cy.fillCombobox("Tax Name", 2);
    cy.get("input[aria-label='Requestor']").type(faker.random.words(1));
    cy.EditInputElement("RequestorPhone", faker.phone.number("###-###-####"));
    cy.fillCombobox("Status", 2);
    cy.fillCombobox("Buyer Code", 2);
    cy.get("#toolbarAddQuoteItem").click();
    cy.fillCombobox("Account", 2);
    cy.fillCombobox("Part", 2);
    cy.fillNumericTextBox(0, faker.datatype.number(10));
    cy.getButtonWithText("Save").click();

    cy.get("#toolbarAddVendor").click();
    cy.fillCombobox("Vendor Code", 2);
    cy.getButtonWithText("Save").click();

    cy.editTextarea("Comment", faker.random.words(5));
    cy.get("select[aria-label='Location']").select("Facility");
    cy.fillCombobox("Location Code", 2);
    cy.editTextarea("Delivery Notes", faker.random.words(5));

    cy.contains("Attachment").click();
    cy.get("#toolbarAddContact").click();
    cy.EditInputElement("Title", faker.random.words(1));
    cy.EditInputElement("FirstName", faker.name.firstName());
    cy.EditInputElement("LastName", faker.name.lastName());
    cy.EditInputElement("MiddleName", faker.name.middleName());
    cy.EditInputElement("Address1", faker.address.streetAddress());
    cy.EditInputElement("Address2", faker.address.streetAddress());
    cy.EditInputElement("City", faker.address.city());
    cy.EditInputElement("State", faker.address.state());
    cy.EditInputElement("Zip", faker.address.zipCode());
    cy.EditInputElement("Suffix", faker.datatype.number(5));
    cy.EditInputElement("Nickname", faker.name.suffix());
    cy.EditInputElement("Spousename", faker.random.words(5));
    cy.EditInputElement("JobTitle", faker.name.jobTitle());
    cy.EditInputElement("Department", faker.name.jobType());
    cy.EditInputElement("Office", faker.random.words(1));
    cy.EditInputElement("Company", faker.random.words(1));
    cy.EditInputElement("BusinessPhone", faker.phone.number("###-###-####"));
    cy.EditInputElement("BusinessFax", faker.phone.number("###-###-####"));
    cy.EditInputElement("ManagerName", faker.name.firstName());
    cy.EditInputElement("AssistantName", faker.random.words(1));
    cy.EditInputElement("Email", faker.internet.email());
    cy.EditInputElement("HomePhone", faker.phone.number("###-###-####"));
    cy.EditInputElement("MobilePhone", faker.phone.number("###-###-####"));
    cy.fillDateInput("Birthday Date");
    cy.fillDateInput("Anniversary Date");
    cy.getButtonWithText("Save").click();

    cy.get("#toolbarAddNote").click();
    cy.EditInputElement("Title", faker.random.words(2));
    cy.fillTextarea("Note", faker.random.words(2));
    cy.EditInputElement("OwnerName", faker.name.firstName());
    cy.getButtonWithText("Save").click();

    cy.get("#toolbarAddTask").click();
    cy.EditInputElement("Title", faker.random.words(2));
    cy.fillDateInput("Due Date");
    cy.fillDateInput("Start Date");
    cy.fillDateInput("Close Date");
    cy.fillNumericTextBox(0, `${faker.datatype.number(10)}`);
    cy.EditInputElement("BillingInformation", faker.datatype.number(100));
    cy.fillCombobox("Status", 3);
    cy.EditInputElement("StatusNote", faker.random.words(1));
    cy.EditInputElement("Priority", faker.datatype.number(50));
    cy.fillNumericTextBox(1, faker.datatype.number(50));
    cy.EditInputElement("OwnerName", faker.name.firstName());
    cy.fillNumericTextBox(2, faker.datatype.number(50));
    cy.EditInputElement("Email", faker.internet.email());
    cy.getButtonWithText("Save").click();

    cy.clickSaveAndCheckResponse();
  });
});
