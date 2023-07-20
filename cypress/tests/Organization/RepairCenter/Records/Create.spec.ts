import { faker } from "@faker-js/faker";

describe("Create new Records", () => {
  const data = {
    timeType: "ADM",
    woType: "ADM",
    defaultOverageAccount: "1111 2222 3333 4444",
  };

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/RepairCenter/Create");
  });

  it("Repair Center Record - Negative Cases", { tags: "@smoke" }, () => {
    cy.EditInputElement("Code", faker.datatype.number(1000));
    cy.EditInputElement("Name", faker.random.word());
    cy.EditInputElement("WorkOrderPrefix", faker.datatype.number(100000));
    cy.fillNumericTextBox(0, faker.datatype.number(100));
    cy.clickAndCheckAlert("Save", "Time Type is required\r\n");

    cy.openFlyoutAndSelectRandomValue("Time Type");
    cy.get("input[name='Code']").clear();
    cy.clickAndCheckAlert("Save", "Code is required\r\n");

    cy.EditInputElement("Code", faker.datatype.number(1000));
    cy.get("input[name='Name']").clear();
    cy.clickAndCheckAlert("Save", "Name is required\r\n");

    cy.EditInputElement("Name", faker.random.word());
    cy.get("input[name='WorkOrderPrefix']").clear();
    cy.clickAndCheckAlert("Save", "WO Prefix is required\r\n");

    cy.get(".k-formatted-value.k-input.ng-scope").eq(0).clear();
    cy.EditInputElement("WorkOrderPrefix", faker.datatype.number(100000));
    cy.clickAndCheckAlert("Save", "Counter is required\r\n");
  });

  it("Create new Record with Required fields", { tags: "@smoke" }, () => {
    cy.EditInputElement("Code", faker.datatype.number(1000));
    cy.EditInputElement("Name", faker.random.word());
    cy.openFlyoutAndSelectRandomValue("Time Type");
    cy.EditInputElement("WorkOrderPrefix", faker.datatype.number(100000));
    cy.fillNumericTextBox(0, faker.datatype.number(100));
    cy.clickSaveAndCheckResponse();
  });

  it("Create new Record With All Fields", () => {
    cy.EditInputElement("Code", faker.datatype.number(1000));
    cy.EditInputElement("Name", faker.random.word());
    cy.openFlyoutAndSelectRandomValue("Time Type");
    cy.openFlyoutAndSelectRandomValue("WO Type");
    cy.openFlyoutAndSelectRandomValue("Priority");
    cy.openFlyoutAndSelectRandomValue("Check-In Task");
    cy.openFlyoutAndSelectRandomValue("Ticket Task");
    cy.EditInputElement("WorkOrderPrefix", faker.datatype.number(100000));
    cy.fillNumericTextBox(0, faker.datatype.number(100));
    cy.EditInputElement("Manager", faker.name.firstName());
    cy.EditInputElement("Phone", faker.phone.number("###-###-####"));
    cy.EditInputElement("Address1", faker.address.streetAddress(2));
    cy.EditInputElement("Address2", faker.address.secondaryAddress(2));
    cy.EditInputElement("Fax", faker.phone.number("###-###-####"));
    cy.EditInputElement("City", faker.address.city());
    cy.EditInputElement("State", faker.address.stateAbbr());
    cy.EditInputElement("Country", faker.address.country());
    cy.EditInputElement("Zip", faker.address.zipCode());
    cy.fillCheckbox("Estimates Required");
    cy.fillCheckbox("WO Authorization Required");
    cy.fillCheckbox("Hide WO Estimates");
    cy.fillCheckbox("Check Dupe Work");
    cy.fillCheckbox("Open WO Only");
    cy.fillCheckbox("Consolidate PM");
    cy.fillCheckbox("Most WO Chargeable");
    cy.fillCheckbox("Print Detail");
    cy.fillCheckbox("Print Building Address");
    cy.fillCheckbox("Print Belt/Filter/Part");
    cy.fillCheckbox("Prompt for Print");
    cy.fillCheckbox("Close Task");
    cy.fillCheckbox("Hide Work Order Area (Sq. Ft.)");
    cy.fillCheckbox("Suppress Right to Know Graphics");
    cy.fillCheckbox("Exclude Auto Notify Technician for PM Work Orders");
    cy.fillNumericTextBox(1, faker.datatype.number(1000));
    cy.get("select[aria-label='Time Zone']").select(
      Math.floor(Math.random() * 75)
    );
    cy.EditInputElement("FiveSevenDayPM", "5");
    cy.EditInputElement("PMDays", faker.datatype.number(100));
    cy.openFlyoutAndSelectRandomValue("Auto Print User");
    cy.EditInputElement("MailboxName", faker.internet.email());
    cy.fillCheckbox("Override Technician Rate");
    cy.fillNumericTextBox(2, faker.datatype.number(1000));
    cy.openFlyoutAndSelectRandomValue("Default Overage Account");
    cy.fillCheckbox("Apply Multiplier");
    cy.fillCheckbox("Purchase Order Authorization Required");
    cy.fillCheckbox("PO Change Order Authorization Required");
    cy.fillCheckbox("Project Requisition Authorization Required");
    cy.fillCheckbox("Purchase Requisition Authorization Required");
    cy.fillCheckbox("Material Request Authorization Required");

    cy.contains("Trade").click();
    cy.wait(2000);
    cy.get("#toolbarAddTrade").click().wait(2000);
    cy.selectRandomCheckBoxFromGrid(
      1,
      "/html/body/pageslide[1]/div/div/div/div[2]/form/div/div/div/div[2]/table/tbody/tr[1]/td[1]/input"
    );
    cy.getButtonWithText("Add Selected").click();

    cy.contains("Customer Survey").click();
    cy.wait(2000);
    cy.fillCheckbox("Enabled");
    cy.fillCheckbox("Trigger by WO Finish Date");
    cy.fillCheckbox("Email Shop");
    cy.fillNumericTextBox(0, faker.datatype.number(1000));
    cy.EditInputElement("SurveyNotifyEmail", faker.internet.email());
    cy.fillCheckbox("Email Trade");
    cy.editTextarea("TQM Text", faker.random.word(5));
    cy.EditInputElement("WOSurveyTitle", faker.random.word(5));
    cy.wait(2000);
    cy.get("#toolbarAddWOSection").click().wait(2000);
    cy.EditInputElement("SectionDescription", faker.datatype.number(1000));
    cy.getButtonWithText("Save").click();
    cy.get("#toolbarAddWOType").click().wait(2000);
    cy.selectRandomCheckBoxFromGrid(
      3,
      "/html/body/pageslide[1]/div/div/div/div[2]/form/div/dl/div/div[2]/table/tbody/tr[2]/td[1]/input"
    );
    cy.getButtonWithText("Add Selected").click();
    cy.get("#toolbarAddProjectSection").click().wait(2000);
    cy.EditInputElement("SectionDescription", faker.datatype.number(1000));
    cy.getButtonWithText("Save").click();

    cy.contains("Auto Attend").click();
    cy.wait(2000);
    cy.get("#toolbarAddAutoConvertRule").click().wait(2000);
    cy.fillCheckbox("Sunday");
    cy.fillCheckbox("Monday");
    cy.fillCheckbox("Tuesday");
    cy.fillCheckbox("Wednesday");
    cy.fillCheckbox("Thursday");
    cy.fillCheckbox("Friday");
    cy.fillCheckbox("Saturday");
    cy.fillCheckbox("Use Time Based");
    cy.get("input[aria-label='Start Time']").type("12:00 PM");
    cy.get("input[aria-label='End Time']").type("02:00 PM");
    cy.fillCombobox("Default Priority", 1);
    cy.fillCombobox("Default Task", 1);
    cy.fillCheckbox("Override Authorization");
    cy.fillCheckbox("Auto Print");
    cy.getButtonWithText("Save").click();

    cy.contains("Linked Accounts").click();
    cy.openFlyoutAndSelectRandomValue(
      "Expense or Cost of Sales Account for Freight"
    );
    cy.openFlyoutAndSelectRandomValue("Discounts Taken on Invoices");
    cy.openFlyoutAndSelectRandomValue(
      "Income Account for Freight on Sales Orders"
    );
    cy.openFlyoutAndSelectRandomValue("Collected Markup");
    cy.openFlyoutAndSelectRandomValue("Discounts Given");

    cy.contains("Email Settings").click();
    cy.get("#toolbarAddEmailSetting").click();
    cy.get("iframe[title='Editable area. Press F10 for toolbar.']")
      .eq(0)
      .its("0.contentDocument.body")
      .wait(2000)
      .type(faker.random.words(5));
    cy.wait(2000);
    cy.get("iframe[title='Editable area. Press F10 for toolbar.']")
      .eq(1)
      .its("0.contentDocument.body")
      .wait(2000)
      .type(faker.random.words(5));
    cy.wait(2000);
    cy.getButtonWithText("Save").click();

    cy.contains("Smart Route").click();
    cy.wait(2000);
    cy.get("#toolbarAddAuthorizer").click().wait(2000);
    cy.fillCombobox("User", 1);
    cy.fillNumericTextBox(0, faker.datatype.number(1000));
    cy.getButtonWithText("Save").click();

    cy.clickSaveAndCheckResponse();
  });
});
