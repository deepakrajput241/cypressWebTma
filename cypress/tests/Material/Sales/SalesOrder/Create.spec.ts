import { faker } from "@faker-js/faker";

describe("Create Sales Order record", () => {
  const data = {
    referenceNo: "51",
    term: "5",
    discountRate: "2",
    duedate: "05/11/2025",
    statusNote: "Auto test",
    shipLocation: "Building",
    amount: "500",
    tradeCode: "Auto",
    contactManagerName: "Automn",
    contactAssistantName: "Autoan",
    tTotalWork: "2",
    tBillingInfo: "Test",
    tStatusNote: "Auto test1",
    tPriority: "High",
    tPerComplete: "20",
    tMileage: "12",
  };

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/SalesOrder/Create");
  });

  it("Sales Order - Negative Cases", { tags: "@smoke" }, () => {
    cy.getButton("Save").click();
    cy.on("window:alert", (msgTest) => {
      expect(msgTest).to.contain(`Department Name is required`);
      expect(msgTest).to.contain(`Sales Type Description is required`);
      expect(msgTest).to.contain(`Repair Center Name is required`);
      expect(msgTest).to.contain(`Sales Person ID is required`);
      expect(msgTest).to.contain(`Sales Person Name is required`);
      expect(msgTest).to.contain(
        `At least 1 record is required for Sales Order Line Grid`
      );
    });
  });

  it("Create Sales Order with Required fields", { tags: "@smoke" }, () => {
    cy.EditInputElement("Number", faker.datatype.number(999999999));
    cy.fillCombobox("Department Name", "Data Center");
    cy.fillCombobox("Sales Type Description", "SOM");
    cy.fillCombobox("Repair Center Name", "Auxilliary");
    cy.openFlyoutAndSelectRandomValue("Sales Person ID");
    cy.get("#toolbarAddSalesOrderLine").click();
    cy.get(".entryTitle:contains('Sales Order Entry')").should("be.visible");
    cy.clickCheckbox("Taxable");
    cy.get("textarea[aria-label='Comment']").eq(1).type(faker.random.words(5));
    cy.openFlyoutAndSelectRandomValue("Account");
    cy.fillCombobox("Part Code", "1007-Auto-001");
    cy.fillNumericTextBox(4, "1");
    cy.wait(500);
    cy.getButtonWithText("Save").click({ force: true });
    cy.clickSaveAndCheckResponse();
    //TODO - Duplicate Order # causing failure
  });

  it("Create Sales Order record with All fields", () => {
    cy.EditInputElement("Number", faker.datatype.number(999999999));
    cy.fillCombobox("Department Name", 1);
    cy.fillCombobox("Sales Type Description", 1);
    cy.fillCombobox("Repair Center Name", 1);
    cy.fillCombobox("Sales Person ID", 1);
    cy.fillCombobox("Requestor Name", "JL Banks");
    cy.get("dd input[aria-label='Shipping Info']").type("ups");
    cy.EditInputElement("ReferenceNumber", faker.datatype.number(999999999));
    cy.fillInput("Terms", data.term);
    cy.get("input[aria-label='Discount Date']").type(
      new Date().toLocaleDateString("en-US")
    );
    cy.fillInput("Discount Rate", data.discountRate);
    cy.fillDateInput("Due Date");
    cy.fillCombobox("Account #", "1233214566");
    cy.fillCombobox("Rate Schedule Code", "Acc11");
    cy.fillCombobox("Tax Name", "Auto-Tax-01");
    cy.fillCombobox("Status", "Re-opened");
    cy.EditInputElement("StatusNote", faker.random.words(2));
    cy.fillCombobox("Assigned Technician Code", "125707");
    cy.get("numeric-text-box[on-change='onFreightAmountChange()']").type("60");
    cy.get("select[aria-label='Ship To Type']").select("Building");
    cy.fillCombobox("Ship To Location Code", "Admin");
    cy.get("tma-text-area[name='ShipToDeliveryNote']").type("Automation test");
    cy.get("tma-text-area[name='Comment']").type("Auto Utest");
    cy.get("#toolbarAddSalesOrderLine").click();
    cy.get(".entryTitle:contains('Sales Order Entry')").should("be.visible");
    cy.clickCheckbox("Taxable");
    cy.get("textarea[aria-label='Comment']").eq(1).type(faker.random.words(5));
    cy.selectValueFromPOpup("Account", 1);
    cy.fillCombobox("Part Code", "1007-Auto-001");
    cy.fillNumericTextBox(4, "1");
    cy.wait(500);
    cy.getButtonWithText("Save").click();
    cy.get("#toolbarAddSalesOrderLine").click();
    cy.get(".entryTitle:contains('Sales Order Entry')").should("be.visible");
    cy.clickCheckbox("OTS");
    cy.selectValueFromPOpup("Account", 1);
    cy.get("textarea[aria-label='Comment']").eq(1).type(faker.random.words(5));
    cy.get("dd input[name='OTSCode']").type("Auto");
    cy.get("dd input[name='OTSDescription']").type("Auto TestOTS");
    cy.fillNumericTextBox(4, faker.datatype.number(1000));
    cy.fillNumericTextBox(5, faker.datatype.number(1000));
    cy.clickCheckbox("Taxable");
    cy.selectValueFromPOpup("Sales Line Type", 1);
    cy.selectValueFromPOpup("Unit Measure", 1);
    cy.getButtonWithText("Save").click();

    cy.contains("Billing Info").click();
    cy.get("div a[id='toolbarAddCharge']").click();
    cy.get(".entryTitle:contains('Billing Info Entry')").should("be.visible");
    cy.fillCombobox("Account", 1);
    cy.fillInput("Debit Amount", data.amount);
    cy.getButtonWithText("Save").click({ force: true });

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
