import { faker } from "@faker-js/faker";

describe("Create Lease Management Record", () => {
  const data = {
    tenantId: "Auto_62",
    repairCenter: "SGTB Electric Repair Center",
    leaseType: "Auto-Human",
    department: "Data Center",
    broker: "3M",
    taskCode: "000000",
  };

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/Lease/Create");
  });

  it("Lease Management Record - Negative Cases", () => {
    cy.EditInputElement("Number", faker.datatype.number(99999999));
    cy.clickAndCheckAlert("Save", "Lease Type is required\r\n");

    cy.openFlyoutAndSelectRandomValue("Lease Type");
    cy.get("input[name='Number']").clear();
    cy.clickAndCheckAlert("Save", "Lease # is required\r\n");
  });

  it(
    "Create Lease Management Record with required fields",
    { tags: "@smoke" },
    () => {
      cy.EditInputElement("Number", faker.datatype.number(99999999));
      cy.openFlyoutAndSelectRandomValue("Lease Type");
      cy.clickSaveAndCheckResponse();
    }
  );

  it("Create Lease Management Record with All fields", () => {
    cy.EditInputElement("Number", faker.datatype.number(99999999));
    cy.openFlyoutAndSelectRandomValue("Tenant ID");
    cy.editTextarea("Description", faker.random.words(5));
    cy.openFlyoutAndSelectRandomValue("Repair Center");
    cy.openFlyoutAndSelectRandomValue("Lease Type");
    cy.openFlyoutAndSelectRandomValue("Department");
    cy.openFlyoutAndSelectRandomValue("Status");
    cy.EditInputElement("StatusNote", faker.random.words(1));
    cy.fillNumericTextBox(0, faker.datatype.number(9999));
    cy.fillNumericTextBox(1, faker.datatype.number(9999));
    cy.fillNumericTextBox(2, faker.datatype.number(9999));
    cy.fillNumericTextBox(3, faker.datatype.number(9999));
    cy.fillNumericTextBox(4, faker.datatype.number(9999));
    cy.fillNumericTextBox(5, faker.datatype.number(9999));
    cy.get("input[aria-label='Lease Start']").type(
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.get("input[aria-label='Rent Due Date']").type(
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.get("input[aria-label='Early Termination']").type(
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.get("input[aria-label='Review Date']").type(
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.get("input[aria-label='Lease Close']").type(
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.get("input[aria-label='Expiration Date']").type(
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.get("input[aria-label='Occupancy Date']").type(
      faker.date.future().toLocaleDateString("en-US")
    );

    //Click on Add Broker
    cy.get("#toolbarAddBroker").click();
    cy.fillCombobox("Broker", 7);
    cy.get("input[aria-label='Listing Date']").type(
      faker.date.recent().toLocaleDateString("en-US")
    );
    cy.get("input[aria-label='Expiration Date']")
      .eq(1)
      .type(faker.date.future().toLocaleDateString("en-US"));
    cy.fillNumericTextBox(6, faker.datatype.number(9999));
    cy.fillNumericTextBox(7, faker.datatype.number(9999));
    cy.get("input[aria-label='Date Paid']").type(
      faker.date.recent().toLocaleDateString("en-US")
    );
    cy.EditInputElement("CheckNumber", faker.datatype.number(9999999));
    cy.getButtonWithText("Save").click();

    //Click on Add Amendments
    cy.get("#toolbarAddAmendment").click();
    cy.get("input[aria-label='Amendment #']").type(
      faker.datatype.number(9999999)
    );
    cy.get("input[aria-label='Amendment Date']").type(
      faker.date.recent().toLocaleDateString("en-US")
    );
    cy.fillCombobox("Modification Code", 7);
    cy.get("input[aria-label='Effective Date']").type(
      faker.date.recent().toLocaleDateString("en-US")
    );
    cy.get("input[aria-label='Execution Date']").type(
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.get("textarea[aria-label='Description']")
      .eq(1)
      .clear()
      .wait(500)
      .type(faker.random.words(5));
    cy.getButtonWithText("Save").click();

    //Click on Add Appraisals
    cy.get("#toolbarAddAppraisal").click().wait(500);
    cy.EditInputElement("AppraiserName", faker.name.fullName());
    cy.EditInputElement("AppraiserPhone", faker.phone.number("###-###-####"));
    cy.get("input[aria-label='Appraisal Date']").type(
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.fillNumericTextBox(6, faker.datatype.number(9999));
    cy.fillNumericTextBox(7, faker.datatype.number(9999));
    cy.get("textarea[aria-label='Description']")
      .eq(1)
      .clear()
      .wait(500)
      .type(faker.random.words(5));
    cy.getButtonWithText("Save").click();

    //Click on Add Estimates
    cy.get("#toolbarAddEstimate").click();
    cy.get("input[aria-label='Estimate Date']").type(
      faker.date.future().toLocaleDateString("en-US")
    );
    // cy.fillNumericTextBox(6, faker.datatype.number(9999));
    // cy.fillNumericTextBox(7, faker.datatyple.number(9999));
    cy.EditInputElement("EstimatorName", faker.name.fullName());
    cy.EditInputElement("EstimatorPhone", faker.phone.number("###-###-####"));
    cy.get("textarea[aria-label='Description']")
      .eq(1)
      .clear()
      .wait(500)
      .type(faker.random.words(5));
    cy.getButtonWithText("Save").click();

    //Click On Tax
    cy.get("#toolbarAddTax").click();
    cy.wait(1000);
    cy.get("input[aria-label='1st Payment Date']").type(
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.get("input[aria-label='2nd Payment Date']").type(
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.fillNumericTextBox(6, new Date().getFullYear());
    cy.fillNumericTextBox(7, faker.datatype.number(9999));
    cy.fillNumericTextBox(8, faker.datatype.number(9999));
    cy.fillNumericTextBox(9, faker.datatype.number(9999));
    cy.getButtonWithText("Save").click();

    //Click on Add Responsibilities
    cy.get("#toolbarAddResponsibility").click();
    cy.fillCombobox("Task Code", 7);
    cy.fillCombobox("Rate Code", 7);
    cy.getButtonWithText("Save").click();

    //Click on Add Punch List
    cy.get("#toolbarAddPunch").click();
    cy.EditInputElement("Item", faker.random.words(1));
    cy.get("input[aria-label='Date Reported']").type(
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.get("input[aria-label='Date Due']").type(
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.get("input[aria-label='Correction Date']").type(
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.fillNumericTextBox(6, faker.datatype.number(9999));
    cy.EditInputElement("SurveyorName", faker.name.fullName());
    cy.fillCombobox("Task Code", 7);
    cy.fillCombobox("Repair Center Code", 7);
    cy.editTextarea("Comment", faker.random.words(5));
    cy.getButtonWithText("Save").click();

    cy.editTextarea("Comments", faker.random.words(5));
    cy.editTextarea("Abstract", faker.random.words(5));

    cy.contains("Lease Location").click();
    cy.get("#toolbarAddLocation").click();
    cy.selectRandomCheckBoxFromGrid(
      1,
      "/html/body/pageslide[1]/div/div/div/div[2]/form/div/div[3]/div/div/div/div/div/div[2]/table/tbody/tr[1]/td[1]/input"
    );
    cy.getButtonWithText("Add Selected").click();

    cy.contains("Budget & Receivable").click();
    cy.EditInputElement("FASBClass", faker.random.words(1));
    cy.fillNumericTextBox(0, faker.datatype.number(99999));
    cy.fillNumericTextBox(1, faker.datatype.number(99999));
    cy.fillNumericTextBox(2, faker.datatype.number(99999));
    cy.fillNumericTextBox(3, faker.datatype.number(99999));
    cy.fillNumericTextBox(4, faker.datatype.number(99999));
    cy.fillNumericTextBox(5, faker.datatype.number(99999));
    cy.fillNumericTextBox(6, faker.datatype.number(99999));
    cy.fillNumericTextBox(7, faker.datatype.number(99999));
    cy.fillNumericTextBox(8, faker.datatype.number(99999));
    cy.get("input[aria-label='CPI Increase Date']").type(
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.EditInputElement("PaymentFrequencyValue", faker.datatype.number(99));
    cy.get("select[name='PaymentFrequency']").select("Month/s");
    cy.get("input[aria-label='Due Date']").type(
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.fillNumericTextBox(9, faker.datatype.number(99999));
    cy.fillNumericTextBox(10, faker.datatype.number(99999));
    cy.fillNumericTextBox(11, faker.datatype.number(99999));
    cy.fillNumericTextBox(12, faker.datatype.number(99999));
    cy.fillNumericTextBox(13, faker.datatype.number(99999));
    cy.fillNumericTextBox(14, faker.datatype.number(99999));
    cy.fillNumericTextBox(15, faker.datatype.number(99999));
    cy.fillNumericTextBox(16, faker.datatype.number(99999));
    cy.fillNumericTextBox(17, faker.datatype.number(99999));
    cy.EditInputElement("LastCheckNumber", faker.datatype.number(9999));
    cy.EditInputElement("BankName", faker.random.words(1));
    cy.fillNumericTextBox(18, faker.datatype.number(99999));
    cy.fillNumericTextBox(19, faker.datatype.number(99999));
    cy.fillNumericTextBox(20, faker.datatype.number(99999));
    cy.fillNumericTextBox(21, faker.datatype.number(99999));
    cy.fillNumericTextBox(22, faker.datatype.number(99999));
    cy.EditInputElement("TenantMemo", faker.datatype.number(99999));
    cy.fillNumericTextBox(23, faker.datatype.number(99999));
    cy.fillNumericTextBox(24, faker.datatype.number(99999));
    cy.fillNumericTextBox(25, faker.datatype.number(99999));

    cy.contains("Options").click();
    cy.get("#toolbarAddLeaseItem").click();
    cy.fillCombobox("Option Type Code", 1);
    cy.get("input[aria-label='Exercise Date']").type(
      new Date().toLocaleDateString("en-US")
    );
    cy.get("input[aria-label='Effective Date']").type(
      new Date().toLocaleDateString("en-US")
    );
    cy.get("input[aria-label='Expiration Date']").type(
      new Date().toLocaleDateString("en-US")
    );
    cy.get("input[aria-label='Review Date']").type(
      new Date().toLocaleDateString("en-US")
    );
    cy.fillNumericTextBox(0, faker.datatype.number(9999));
    cy.getButtonWithText("Save").click();

    cy.contains("Schedules").click();
    cy.get("#toolbarAddLine").click();
    cy.get("input[aria-label='Start Date']").type(
      faker.date.recent().toLocaleDateString("en-US")
    );
    cy.get("select[name='PaymentFrequency']").select("Annually");
    cy.fillNumericTextBox(0, faker.datatype.number(9999));
    cy.get("input[aria-label='Start Date']").type(
      faker.date.recent().toLocaleDateString("en-US")
    );
    cy.get("input[aria-label='End Date']").type(
      faker.date.recent().toLocaleDateString("en-US")
    );
    cy.get("input[aria-label='Next Date']").type(
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.get("input[aria-label='Last Date']").type(
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.editTextarea("Description", faker.random.words(5));
    cy.fillNumericTextBox(1, faker.datatype.number(99999));
    cy.fillNumericTextBox(2, faker.datatype.number(99999));
    cy.fillNumericTextBox(3, faker.datatype.number(99999));
    cy.fillNumericTextBox(4, faker.datatype.number(99999));
    cy.fillNumericTextBox(6, faker.datatype.number(99999));
    cy.fillNumericTextBox(7, faker.datatype.number(99999));
    cy.getButtonWithText("Save").click();

    cy.contains("Stakeholders").click();
    cy.get("#toolbarAddStakeHolder").click();
    cy.EditInputElement("FirstName", faker.name.firstName());
    cy.EditInputElement("LastName", faker.name.lastName());
    cy.EditInputElement("Role", faker.name.jobTitle());
    cy.EditInputElement("Address1", faker.address.streetAddress());
    cy.EditInputElement("Address2", faker.address.secondaryAddress());
    cy.EditInputElement("City", faker.address.city());
    cy.EditInputElement("State", faker.address.stateAbbr());
    cy.EditInputElement("Zip", faker.address.zipCode());
    cy.EditInputElement("WorkPhone", faker.phone.number("###-###-####"));
    cy.EditInputElement("CellPhone", faker.phone.number("###-###-####"));
    cy.EditInputElement("Fax", faker.phone.number("###-###-####"));
    cy.EditInputElement("Email", faker.internet.email());
    cy.getButtonWithText("Save").click();

    cy.contains("Income Distribution").click();
    cy.get("#toolbarAddAccount").click();
    cy.fillCombobox("Account", 1);
    cy.fillNumericTextBox(1, faker.datatype.number(99));
    cy.fillNumericTextBox(2, faker.datatype.number(99999));
    cy.getButtonWithText("Save").click();

    cy.wait(500);
    cy.get("#toolbarAutoDistribute").click();

    cy.clickSaveAndCheckResponse();
  });
});
