import { faker } from "@faker-js/faker";

describe("Create Purchase Requisition Record", () => {
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/PurchaseRequisition/Create");
  });

  it("Purchase Requisition - Negative Cases", () => {
    cy.fillCombobox("Vendor Code", 1);
    cy.fillCombobox("Type Code", 1);
    cy.clickAndCheckAlert(
      "Save",
      " At least 1 record is required for Purchase Requisition Grid Item\r\n"
    );

    cy.get("#toolbarAddPurchaseReqItem").click();
    cy.fillCombobox("Speedtype", 1);
    cy.fillCombobox("Part Code", 1);
    cy.fillNumericTextBox(0, faker.datatype.number(10));
    cy.wait(500);
    cy.getButtonWithText("Save").click();
    cy.get("input[aria-label='Type Code']").eq(0).clear();
    cy.clickAndCheckAlert("Save", "Type Code is required\r\n");
  });

  it("Create Purchase Requisition with required fields", () => {
    cy.fillCombobox("Type Code", 1);
    cy.get("#toolbarAddPurchaseReqItem").click();
    cy.fillCombobox("Speedtype", 1);
    cy.fillCombobox("Part Code", 1);
    cy.fillNumericTextBox(0, faker.datatype.number(10));
    cy.wait(500);
    cy.getButtonWithText("Save").click();

    cy.clickSaveAndCheckResponse();
  });

  it("Create Requisition with Required fields", { tags: "@smoke" }, () => {
    cy.fillCombobox("Vendor Code", 1);
    cy.fillCombobox("Type Code", 1);
    cy.get("#toolbarAddPurchaseReqItem").click();
    cy.fillCombobox("Speedtype", 1);
    cy.fillCombobox("Part Code", 1);
    cy.fillNumericTextBox(0, faker.datatype.number(10));
    cy.wait(500);
    cy.getButtonWithText("Save").click();
  });

  it("Create Purchase Requisition with All fields", () => {
    cy.fillCombobox("Vendor Code", 1);
    cy.fillCombobox("Department Code", 1);
    cy.fillCombobox("Type Code", 1);
    cy.fillCombobox("Requestor", 1);
    cy.EditInputElement("RequestorPhone", faker.phone.number("###-###-####"));
    cy.fillCombobox("Buyer Code", 1);
    cy.fillCombobox("Repair Center Code", 1);
    cy.fillCombobox("Project #", 1);
    cy.EditInputElement("ReferenceNumber", faker.datatype.number(99999));
    cy.fillCombobox("Tax Name", 1);
    cy.EditInputElement("ShipMethod", faker.random.words(1));
    cy.fillCombobox("Status", 1);
    cy.EditInputElement("StatusNote", faker.random.words(2));
    cy.get("input[aria-label='Fiscal year']")
      .eq(0)
      .type(new Date().toLocaleDateString("en-US"));
    cy.get("#toolbarAddPurchaseReqItem").click();
    cy.fillCombobox("Speedtype", 1);
    cy.fillCombobox("Part Code", 1);
    cy.fillNumericTextBox(0, faker.datatype.number(10));
    cy.wait(500);
    cy.getButtonWithText("Save").click();
    cy.get("select[aria-label='Type']").select("Building");
    cy.fillCombobox("Ship To Location Code", 1);
    cy.editTextarea("Delivery Notes", faker.random.words(5));
    cy.editTextarea("Comment", faker.random.words(5));

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
