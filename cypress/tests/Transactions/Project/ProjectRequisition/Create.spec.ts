import { faker } from "@faker-js/faker";

const data = {
  budgetCode: "101Labor",
  vendor: "ABLFNC",
  department: "AIED",
  requisitionType: "Project Requisition Type",
  buyer: "Adam Hanson",
  repairCenterCode: "Facilities",
  projectCode: "4913",
  locationCode: "ADMIN-101",
};

describe("Create Project Requisition", () => {
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/ProjectRequisition/Create");
  });

  it("Project Requisition - Negative Cases", () => {
    cy.fillCombobox("Vendor Name", 1);
    cy.fillCombobox("Requisition Type", 1);
    cy.fillCombobox("Repair Center", 1);
    cy.fillCombobox("Project #", 1);
    cy.clickAndCheckAlert(
      "Save",
      " At least 1 record is required for Project Requisition Items Grid\r\n"
    );

    cy.get("a[id='toolbarAddProjectRequisitionItem']").click();
    cy.fillCombobox("Credit Account Code", "1233214566");
    cy.editTextarea("Item Description", "Automation test item");
    cy.getButtonWithText("Save").click();
    cy.get("input[aria-label='Vendor Name']").eq(0).clear();
    cy.clickAndCheckAlert("Save", "Vendor Name is required\r\n");

    cy.fillCombobox("Vendor Name", "Auto test Manufacture");
    cy.get("input[aria-label='Requisition Type']").eq(0).clear();
    cy.clickAndCheckAlert("Save", "Requisition Type is required\r\n");

    cy.fillCombobox(
      "Project Requisition Type Description",
      "Project Requisition Type"
    );
    cy.get("input[aria-label='Repair Center']").eq(0).clear();
    cy.clickAndCheckAlert("Save", "Repair Center is required\r\n");

    cy.fillCombobox("Repair Center Name", "Auto repair center");
    cy.get("input[aria-label='Project #']").eq(0).clear();
    cy.clickAndCheckAlert("Save", "Project # is required\r\n");
  });

  it(
    "Create Project Requisition with Required Fields",
    { tags: "@smoke" },
    () => {
      cy.fillCombobox("Vendor Name", "Auto test Manufacture");
      cy.fillCombobox(
        "Project Requisition Type Description",
        "Project Requisition Type"
      );
      cy.fillCombobox("Repair Center Name", "Auto repair center");
      cy.fillCombobox("Project Number", "4346");
      cy.get("a[id='toolbarAddProjectRequisitionItem']").click();
      cy.fillCombobox("Credit Account Code", "1233214566");
      cy.editTextarea("Item Description", "Automation test item");
      cy.getButtonWithText("Save").click();
      cy.clickAndCheckResponse(
        "Save",
        "POST",
        "ProjectRequisition/Create?*",
        200
      );
    }
  );

  it("Create Project Requisition with All Fields", () => {
    cy.EditInputElement("ReferenceNumber", faker.datatype.number(1000));
    cy.openFlyoutAndSelectRandomValue("Tax Rate");
    cy.get("input[aria-label='Warranty Date']").type(
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.openFlyoutAndSelectRandomValue("Budget Code");
    cy.openFlyoutAndSelectRandomValue("Vendor Name");
    cy.openFlyoutAndSelectRandomValue("Department");
    cy.openFlyoutAndSelectRandomValue("Requisition Type");
    cy.openFlyoutAndSelectRandomValue("Buyer");
    cy.EditInputElement("Attention", faker.datatype.number(1000));
    cy.openFlyoutAndSelectRandomValue("Billed Account");
    cy.openFlyoutAndSelectRandomValue("Repair Center");
    cy.openFlyoutAndSelectRandomValue("Project #");
    cy.get("a[id='toolbarAddProjectRequisitionItem']").click();
    cy.editTextarea("Item Description", faker.commerce.productDescription());
    cy.openFlyoutAndSelectRandomValue("Credit Account");
    cy.fillNumericTextBox(0, faker.datatype.number(1000));
    cy.fillNumericTextBox(1, faker.datatype.number(1000));
    cy.get("input[aria-label='Delivery Date']").type(
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.getButtonWithText("Save").click();
    cy.get("select[aria-label='Ship To Type']").should("be.visible").select(1);
    cy.openFlyoutAndSelectRandomValue("Location");
    cy.editTextarea("Delivery Notes", faker.random.words(3));
    cy.editTextarea("Comment", faker.random.words(3));
    cy.contains("Attachment").click();
    cy.get("#toolbarAddContact").click().wait(2000);
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
    cy.EditInputElement("Department", faker.commerce.department());
    cy.EditInputElement("Office", faker.random.words(1));
    cy.EditInputElement("Profession", faker.random.words(1));

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
    cy.EditInputElement("OwnerName", faker.name.firstName());
    cy.getButtonWithText("Save").click();

    //Add Task
    cy.get("#toolbarAddTask").should("be.visible").click();
    cy.EditInputElement("Title", faker.random.words(1));
    cy.fillNumericTextBox(0, faker.datatype.number(24));
    cy.EditInputElement("BillingInformation", faker.random.words(1));
    cy.EditInputElement("StatusNote", faker.random.words(1));
    cy.EditInputElement("Priority", faker.datatype.number(10));
    cy.fillNumericTextBox(1, faker.datatype.number(24));
    cy.EditInputElement("OwnerName", faker.name.firstName());
    cy.fillNumericTextBox(2, faker.datatype.number(24));
    cy.EditInputElement("Email", faker.internet.email());
    cy.fillCombobox("Status", "3");
    cy.get("input[aria-label='Due Date']").type(
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.get("input[aria-label='Start Date']").type(
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.get("input[aria-label='Completed']").type(
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.getButtonWithText("Save").click();
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "ProjectRequisition/Create?copyId=?*",
      200
    ).then((id) => {
      reqId = id;
    });
  });
});
