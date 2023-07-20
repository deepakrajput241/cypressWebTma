import { faker } from "@faker-js/faker";

const data = {
  vendorCode: "3MMM",
  requestor: "abc 123",
  typeCode: "Auto-0",
  account: "1233214566",
  part: "011001",
  departmentCode: "Auto-01",
};

describe("Create Purchase Order record", () => {
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/PurchaseOrder/Create");
  });

  it("Purchase Order - Negative Cases", () => {
    cy.openFlyoutAndSelectRandomValue("Vendor Code");
    cy.openFlyoutAndSelectRandomValue("Type Code");
    cy.clickAndCheckAlert(
      "Save",
      " At least 1 record is required for Purchase Order Item Grid\r\n"
    );

    cy.get("#toolbarAddPurchaseOrderItem").click();
    cy.openFlyoutAndSelectRandomValue("Account");
    cy.openFlyoutAndSelectRandomValue("Part");
    cy.fillNumericTextBox(2, faker.datatype.number(10));
    cy.get("textarea[aria-label='Comment']").eq(1).type(faker.random.words(5));
    cy.getButtonWithText("Save").click();
    cy.wait(500);
    cy.get("input[aria-label='Vendor Code']").eq(0).clear();
    cy.clickAndCheckAlert(
      "Save",
      "Vendor Code is required\r\nVendor Name is required\r\n"
    );

    cy.openFlyoutAndSelectRandomValue("Vendor Code");
    cy.get("input[aria-label='Type Code']").eq(0).clear();
    cy.clickAndCheckAlert(
      "Save",
      "Type Code is required\r\nType Description is required\r\n"
    );
  });

  it("Create Purchase Order with required fields", () => {
    cy.openFlyoutAndSelectRandomValue("Vendor Code");
    cy.openFlyoutAndSelectRandomValue("Type Code");
    cy.get("#toolbarAddPurchaseOrderItem").click();
    cy.openFlyoutAndSelectRandomValue("Account");
    cy.openFlyoutAndSelectRandomValue("Part");
    cy.fillNumericTextBox(2, faker.datatype.number(10));
    cy.get("textarea[aria-label='Comment']").eq(1).type(faker.random.words(5));
    cy.getButtonWithText("Save").click();

    cy.clickSaveAndCheckResponse();
  });

  it("Create Purchase Order with All fields", () => {
    cy.openFlyoutAndSelectRandomValue("Vendor Code");
    cy.openFlyoutAndSelectRandomValue("Type Code");
    cy.get("#toolbarAddPurchaseOrderItem").click();
    cy.openFlyoutAndSelectRandomValue("Account");
    cy.openFlyoutAndSelectRandomValue("Part");
    cy.fillNumericTextBox(2, faker.datatype.number(10));
    cy.get("textarea[aria-label='Comment']").eq(1).type(faker.random.words(5));
    cy.getButtonWithText("Save").click();
    cy.fillCombobox("Department Code", data.departmentCode);
    cy.fillCombobox("Requestor", data.requestor);
    cy.openFlyoutAndSelectRandomValue("Buyer Code");

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
