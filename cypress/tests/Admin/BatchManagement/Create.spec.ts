import { faker } from "@faker-js/faker";

describe("Create Batch Management", () => {
  const data = {
    repairCenter: "Auto-01",
    account: "Auto_104",
    workOrderType: "PM",
    contract: "4444",
    technicianId: "101",
    shop: "Auto_108",
    trade: "Auto_267",
    task: "Auto_106",
    regulatory: "Both Regulated/Non-Regulated",
  };

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/BatchJob/Create");
  });

  it("Batch Management - Negative Cases", { tags: "@smoke" }, () => {
    cy.get("a[name='PostChargesToSL']").click();
    cy.get("input[name='Next']").click();
    cy.clickAndCheckAlert("Save", "Post Start Date is required");
  });

  it(
    "Create Batch Management with Post Charges to Sub Ledger",
    { tags: "@spreadsheet" },
    () => {
      cy.get("a[name='PostChargesToSL']").click();
      cy.clickCheckbox("RecurringBJ");
      cy.fillNumericTextBox(0, faker.datatype.number(100));
      cy.get("select[name='IntervalId']").select(faker.datatype.number(3));
      cy.get("input[aria-label='Until']").type(
        new Date().toLocaleDateString("en-US")
      );
      cy.fillInput("Email", faker.internet.email());
      cy.editTextarea("Notes", faker.random.words(10));
      cy.wait(500);
      cy.get("input[name='Next']").click();
      cy.get("input[aria-label='Post Date']").type(
        new Date().toLocaleDateString("en-US")
      );
      cy.selectCheckBoxFromGrid(
        "/html/body/pageslide[1]/div/div/div/div[2]/form/div/div/div/div[3]/div/div[2]/div/div/div/div/div[2]/table/tbody/tr[1]/td[1]/input"
      );
      cy.get("input[name='Save']").click();
      cy.get("a[ng-click='refreshList()']").click({ force: true });
    }
  );

  it(
    "Create Batch Management with Project Task Generation",
    { tags: "@spreadsheet" },
    () => {
      cy.get("a[name='ProjectTaskGeneration']").click();
      cy.get("input[kendo-date-picker='datePicker']")
        .eq(0)
        .clear()
        .type(new Date().toLocaleDateString("en-US"));
      cy.clickCheckbox("RecurringBJ");
      cy.fillNumericTextBox(0, faker.datatype.number(100));
      cy.get("select[name='IntervalId']").select(faker.datatype.number(3));
      cy.get("input[aria-label='Until']").type(
        new Date().toLocaleDateString("en-US")
      );
      cy.fillInput("Email", faker.internet.email());
      cy.editTextarea("Notes", faker.random.words(10));
      cy.wait(500);
      cy.get("input[name='Next']").click();
      cy.fillNumericTextBox(0, faker.datatype.number(1000));
      cy.fillCombobox("Repair Center", "Auto-01");
      cy.get("input[name='Finish']").click();
      cy.get("a[ng-click='refreshList()']").click({ force: true });
    }
  );

  it("Create Batch Management with PM Generation", () => {
    cy.get("a[name='PMGeneration']").click();
    cy.get("input[kendo-date-picker='datePicker']")
      .eq(0)
      .clear()
      .type(new Date().toLocaleDateString("en-US"));
    cy.clickCheckbox("RecurringBJ");
    cy.fillNumericTextBox(0, faker.datatype.number(100));
    cy.get("select[name='IntervalId']").select(faker.datatype.number(3));
    cy.get("input[aria-label='Until']").type(
      new Date().toLocaleDateString("en-US")
    );
    cy.fillInput("Email", faker.internet.email());
    cy.editTextarea("Notes", faker.random.words(10));
    cy.wait(500);
    cy.get("input[name='Next']").click();
    cy.fillNumericTextBox(0, faker.datatype.number(1000));
    cy.get("select[aria-label='Location Type Id']").select("Zone");
    cy.fillCombobox("Zone", "Auto_18166");
    cy.fillCombobox("Repair Center", "Auto-01");
    cy.fillCombobox("Task", "Test");
    cy.fillNumericTextBox(1, faker.datatype.number(1000));
    cy.get("select[aria-label='DueEveryInterval']").select("Day");
    cy.get("input[name='Save']").click();
    cy.get("a[ng-click='refreshList()']").click({ force: true });
  });

  it("Create Batch Management with Import Weather", () => {
    cy.get("a[name='ImportWeather']").click();
    cy.get("input[kendo-date-picker='datePicker']")
      .eq(0)
      .clear()
      .type(new Date().toLocaleDateString("en-US"));
    cy.clickCheckbox("RecurringBJ");
    cy.fillNumericTextBox(0, faker.datatype.number(100));
    cy.get("select[name='IntervalId']").select(faker.datatype.number(3));
    cy.get("input[aria-label='Until']").type(
      new Date().toLocaleDateString("en-US")
    );
    cy.fillInput("Email", faker.internet.email());
    cy.editTextarea("Notes", faker.random.words(10));
    cy.wait(500);
    cy.get("input[name='Finish']").click();
  });

  it("Create Batch Management with Capital Processes", () => {
    cy.get("a[name='CPProcesses']").click();
    cy.get("input[kendo-date-picker='datePicker']")
      .eq(0)
      .clear()
      .type(new Date().toLocaleDateString("en-US"));
    cy.clickCheckbox("RecurringBJ");
    cy.fillNumericTextBox(0, faker.datatype.number(100));
    cy.get("select[name='IntervalId']").select(faker.datatype.number(3));
    cy.get("input[aria-label='Until']").type(
      new Date().toLocaleDateString("en-US")
    );
    cy.fillInput("Email", faker.internet.email());
    cy.editTextarea("Notes", faker.random.words(10));
    cy.wait(500);
    cy.get("input[name='Finish']").click();
  });

  it(
    "Create Batch Management with Generate Lease Invoice",
    { tags: "@spreadsheet" },
    () => {
      cy.get("a[name='GenerateLeaseInvoice']").click();
      cy.get("input[kendo-date-picker='datePicker']")
        .eq(0)
        .clear()
        .type(new Date().toLocaleDateString("en-US"));
      cy.clickCheckbox("RecurringBJ");
      cy.fillNumericTextBox(0, faker.datatype.number(100));
      cy.get("select[name='IntervalId']").select(faker.datatype.number(3));
      cy.get("input[aria-label='Until']").type(
        new Date().toLocaleDateString("en-US")
      );
      cy.fillInput("Email", faker.internet.email());
      cy.editTextarea("Notes", faker.random.words(10));
      cy.wait(500);
      cy.get("input[name='Next']").click();
      cy.fillNumericTextBox(0, faker.datatype.number(1000));
      cy.fillCombobox("Repair Center", "Auto-01");
      cy.get("input[name='Finish']").click();
      cy.get("a[ng-click='refreshList()']").click({ force: true });
    }
  );

  it("Create Batch Management with Custodial Inspection Generation", () => {
    cy.get("a[name='CDInspectionGeneration']").click();
    cy.get("input[kendo-date-picker='datePicker']")
      .eq(0)
      .clear()
      .type(new Date().toLocaleDateString("en-US"));
    cy.clickCheckbox("RecurringBJ");
    cy.fillNumericTextBox(0, faker.datatype.number(100));
    cy.get("select[name='IntervalId']").select(faker.datatype.number(3));
    cy.get("input[aria-label='Until']").type(
      new Date().toLocaleDateString("en-US")
    );
    cy.fillInput("Email", faker.internet.email());
    cy.editTextarea("Notes", faker.random.words(10));
    cy.wait(500);
    cy.get("input[name='Finish']").click();
  });
});
