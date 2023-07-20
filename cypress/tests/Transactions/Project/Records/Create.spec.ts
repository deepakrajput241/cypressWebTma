import { faker } from "@faker-js/faker";

describe("Create Project", () => {
  let projectID;
  const data = {
    projectType: "Event",
    fund: "1111",
    requestor:
      "5th Health Glendale mesh Analy Mouse Borders male Northwest Frozen",
    entity: "Fountain",
    departmentName: "American Indian Education Program",
    contractorName: "Acme Tools",
    projectManager: "Adam Hanson",
    systemType: "Building Systems (General)",
    parentProject: "0826 Sandbox Test",
    repairCenter: "Facilities",
    facility: "Normandy Facility",
    biomed: "368657",
    tagDescription: "368645",
    priorityCode: "2",
    taskCode: "CARP-ACSTCTILE",
    tradeCode: "ALARM",
    contractorCode: "ACMETLS",
    woTypeCode: "ADM",
    departmentCode: "AIED",
    technicianCode: "101",
    rateSchedule: "1012",
  };

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
  });

  it("Project Record - Neagtive Cases", { tags: "@smoke" }, () => {
    cy.visit("/#!/Project/Create/Identity");
    cy.EditInputElement("Name", faker.datatype.number(99999));
    cy.clickAndCheckAlert("Save", "Type is required\r\n");

    cy.openFlyoutAndSelectRandomValue("Type");
    cy.get("input[aria-label='Name']").clear();
    cy.clickAndCheckAlert("Save", "Name is required\r\n");

    cy.EditInputElement("Name", faker.datatype.number(99999));
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "/Project/Create?*",
      200,
      "Error",
      "Repair Centers\r\n\r\nAt least 1 record is required for Project Repair Center Grid\r\n"
    );
  });

  it("Create Project with Required Fields", { tags: "@smoke" }, () => {
    cy.visit("/#!/Project/Create/Identity");
    cy.openFlyoutAndSelectRandomValue("Type");
    cy.EditInputElement("Name", faker.datatype.number(99999));
    cy.selectRepairCenter();
    cy.clickAndCheckResponse("Save", "POST", "/Project/Create?*", 200);
  });

  it("Create Project With All Fields", { tags: "@spreadsheet" }, () => {
    cy.visit("/#!/Project/Create/Identity");
    cy.openFlyoutAndSelectRandomValue("Type");
    cy.openFlyoutAndSelectRandomValue("Fund");
    cy.openFlyoutAndSelectRandomValue("Account #");
    cy.openFlyoutAndSelectRandomValue("Requestor");
    cy.EditInputElement("RequestorsPhone", faker.phone.number("###-###-####"));
    cy.EditInputElement("Email", faker.internet.email());
    cy.get("select[aria-label='Item Type Id']").should("be.visible").select(1);
    cy.openFlyoutAndSelectRandomValue("Item Code");
    cy.EditInputElement("Priority", faker.datatype.number(1000));
    cy.openFlyoutAndSelectRandomValue("Status");
    cy.EditInputElement("StatusNote", faker.random.word(3));
    cy.EditInputElement("Name", faker.datatype.number(99999));
    cy.openFlyoutAndSelectRandomValue("Department Name");
    cy.openFlyoutAndSelectRandomValue("Contractor Name");
    cy.openFlyoutAndSelectRandomValue("Project Manager");
    cy.EditInputElement("Supervisor", faker.name.firstName());
    cy.EditInputElement("Site", faker.random.words(1));
    cy.openFlyoutAndSelectRandomValue("System");
    cy.openFlyoutAndSelectRandomValue("Parent Project");
    cy.fillNumericTextBox(0, new Date().getFullYear());
    cy.fillNumericTextBox(1, "2025");
    cy.get("input[aria-label='Warranty Expires']").type(
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.get("input[aria-label='Prep Start Date']").type(
      faker.date.recent().toLocaleDateString("en-US")
    );
    cy.get("input[aria-label='Start Date']").type(
      faker.date.recent().toLocaleDateString("en-US")
    );
    cy.get("input[aria-label='Due Date']").type(
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.get("input[aria-label='Completed Date']").type(
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.fillNumericTextBox(2, faker.datatype.number(1000));
    cy.fillNumericTextBox(3, faker.datatype.number(1000));
    cy.get("input[aria-label='text 100']").type(faker.datatype.number(1000));
    cy.get("input[aria-label='date time']")
      .eq(0)
      .type(faker.date.recent().toLocaleDateString("en-US"));
    cy.fillNumericTextBox(4, faker.datatype.number(1000));
    cy.get("input[aria-label='text 50']").type(faker.datatype.number(1000));
    cy.get("input[aria-label='text 200']").type(faker.datatype.number(1000));
    cy.editTextarea("Description", faker.commerce.productDescription());
    cy.editTextarea("Comment", faker.random.words(5));
    cy.selectRepairCenter();
    cy.contains("Tasks & Resources").click();
    cy.get("#toolbarAddProjectTask").should("be.visible").click();
    cy.fillInput("Task Name", faker.random.words(3));
    cy.editTextarea("Task Description", faker.name.jobDescriptor());
    cy.fillCombobox("Task Type", 1);
    cy.get(
      "input[aria-label='Estimated Start'][k-options='dateTimeCtrl.dateOptions']"
    ).type(faker.date.future().toLocaleDateString("en-US"));
    cy.get(
      "input[aria-label='Actual Start'][k-options='dateTimeCtrl.dateOptions']"
    ).type(faker.date.future().toLocaleDateString("en-US"));
    cy.get(
      "input[aria-label='Estimated End'][k-options='dateTimeCtrl.dateOptions']"
    ).type(faker.date.future().toLocaleDateString("en-US"));
    cy.get(
      "input[aria-label='Actual End'][k-options='dateTimeCtrl.dateOptions']"
    ).type(faker.date.future().toLocaleDateString("en-US"));
    cy.clickCheckbox("Fixed");
    cy.fillNumericTextBox(0, faker.datatype.number(1000));
    cy.fillCombobox("Status", 1);
    cy.fillNumericTextBox(1, faker.datatype.number(1000));
    cy.fillInput("Status Note", faker.random.words(2));
    cy.get("select[aria-label='Location Type DDL']").select(1);
    cy.fillCombobox("Location", 1);
    cy.get("select[aria-label='Item Type DDL']").select(2);
    cy.fillCombobox("Tag Number", 1);
    cy.fillCombobox("Priority Code", 1);
    cy.fillCombobox("Task Code", 1);
    cy.fillCombobox("Trade Code", 1);
    cy.clickCheckbox("SubContractor");
    cy.fillCombobox("Contractor Code", 1);
    cy.fillInput("Phone", faker.phone.number("###-###-####"));
    cy.fillCombobox("WO Type Code", 1);
    cy.fillCombobox("Department Code", 1);
    cy.fillCombobox("Repair Center Code", 1);
    cy.fillCombobox("Requestor", 1);
    cy.fillInput("Phone #", faker.phone.number("###-###-####"));
    cy.fillInput("Email", faker.internet.email());
    cy.fillCombobox("Technician Code", 1);
    cy.fillCombobox("Rate Schedule Code", 1);
    cy.editTextarea("Comment", faker.random.words(5));
    cy.get("a[ng-click='saveRecord()']").click();
    cy.contains("Attachment").click();
    cy.get("#toolbarAddContact").click();
    cy.fillInput("Title", faker.random.words(1));
    cy.fillInput("First Name", faker.name.firstName());
    cy.fillInput("Last Name", faker.name.lastName());
    cy.fillInput("Middle Name", faker.name.middleName());
    cy.fillInput("Address 1", faker.address.streetAddress());
    cy.fillInput("Address 2", faker.address.secondaryAddress());
    cy.fillInput("City", faker.address.city());
    cy.fillInput("State", faker.address.stateAbbr());
    cy.fillInput("Zip", faker.address.zipCode());
    cy.fillInput("Suffix", faker.name.suffix());
    cy.fillInput("Nick Name", faker.name.firstName());
    cy.fillInput("Spouse's Name", faker.name.firstName());
    cy.fillInput("Job Title", faker.name.jobTitle());
    cy.fillInput("Department", faker.commerce.department());
    cy.fillInput("Office", faker.random.words(1));
    cy.fillInput("Profession", faker.name.jobTitle());

    cy.fillInput("Company", faker.company.companySuffix());
    cy.fillInput("Business Phone", faker.phone.number("###-###-####"));
    cy.fillInput("Business Fax", faker.phone.number("###-###-####"));
    cy.fillInput("Manager Name", faker.name.fullName());
    cy.fillInput("Assistant Name", faker.name.fullName());
    cy.fillInput("Email", faker.internet.email());
    cy.fillInput("Home Phone", faker.phone.number("###-###-####"));
    cy.fillInput("Mobile Phone", faker.phone.number("###-###-####"));
    cy.fillInput("URL", faker.internet.url());
    cy.get("input[aria-label='Birthday']").type(
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.get("input[aria-label='Anniversary']").type(
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.get("a[ng-click='saveRecord()']").should("be.visible").click();

    //Add Note
    cy.get("#toolbarAddNote").should("be.visible").click();
    cy.wait(1000);
    cy.fillInput("Subject", faker.random.words(1));
    cy.editTextarea("Note", faker.random.words(2));
    cy.fillInput("Owner", faker.name.fullName());
    cy.get("a[ng-click='saveRecord()']").should("be.visible").click();

    //Add Task
    cy.get("#toolbarAddTask").should("be.visible").click();
    cy.fillInput("Task", faker.random.words(1));
    cy.fillNumericTextBox(0, faker.datatype.number(24));
    cy.fillInput("Billing Info", faker.random.words(1));
    cy.fillInput("Status Note", faker.random.words(1));
    cy.fillInput("Priority", faker.datatype.number(10));
    cy.fillNumericTextBox(1, faker.datatype.number(24));
    cy.fillInput("Owner", faker.name.fullName());
    cy.fillNumericTextBox(2, faker.datatype.number(24));
    cy.fillInput("Email", faker.internet.email());
    cy.fillCombobox("Status", 3);
    cy.get("a[ng-click='saveRecord()']").should("be.visible").click();
    cy.clickAndCheckResponse("Save", "POST", "/Project/Create?*", 200).then(
      (id) => {
        projectID = id;
      }
    );
  });

  it("Delete Project Record", () => {
    cy.visit(`/#!/Project/${projectID}/Identity`);
    cy.clickDeleteAndCheckResponse();
  });
});
