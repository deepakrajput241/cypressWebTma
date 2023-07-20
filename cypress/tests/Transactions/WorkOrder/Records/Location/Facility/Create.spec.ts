import { faker } from "@faker-js/faker";

const data = {
  locationCode: "75850",
  priorityDescription: "2 - Emergency (Immediate)",
  repairCenterCode: "10037",
  supervisorName: "513103",
  taskCode: "109",
  woTypeDescription: "Administrative",
};

function fillRequiredFields() {
  cy.fillSelect("Location Type", "Facility");
  cy.fillCombobox("Location Code", data.locationCode);
  cy.fillCombobox("WO Type Description", data.woTypeDescription);
  cy.fillCombobox("Priority Description", data.priorityDescription);
  cy.fillTextarea("Request", faker.random.words(5));
  cy.fillCombobox("Task Code", data.taskCode);
}

describe(
  "should create Work Order for Location of type Facility",
  { tags: "@smoke" },
  () => {
    beforeEach(() => {
      cy.login(Cypress.env("user1"));
      cy.visit("/#!/WorkOrder/Create");
    });

    it("should not create Work Order for Location of type Facility without required fields", () => {
      // missing Location Code
      fillRequiredFields();
      cy.clearCombobox("Location Code");
      cy.clickSaveAndCheckAlert("Please select an item or a location");

      // missing Repair Center Code
      cy.reload();
      fillRequiredFields();
      cy.clearCombobox("Repair Center Code");
      cy.clickSaveAndCheckAlert("Repair Center Code is required\r\n");

      // missing "WO Type Description"
      cy.reload();
      fillRequiredFields();
      cy.clearCombobox("WO Type Description");
      cy.clickSaveAndCheckAlert("WO Type Description is required\r\n");

      // missing "Priority Description"
      cy.reload();
      fillRequiredFields();
      cy.clearCombobox("Priority Description");
      cy.clickSaveAndCheckAlert("Priority Description is required\r\n");

      //missing "Request"
      cy.reload();
      fillRequiredFields();
      cy.clearTextarea("Request");
      cy.clickSaveAndCheckAlert("Request is required\r\n");

      // missing "Task Code"
      cy.reload();
      fillRequiredFields();
      cy.clearCombobox("Task Code");
      cy.clickSaveAndCheckAlert(
        "Task Code is required\r\nTask Desc is required\r\n"
      );
    });

    it("should create Work Order for Location of type Facility with required fields, and then delete it", () => {
      fillRequiredFields();
      cy.clickSaveAndCheckResponse();

      cy.clickDeleteAndCheckResponse();
    });

    // TODO: take a look at this test and refactor
    it.skip("should create Work Order for Location of type Facility with all fields, and then delete it", () => {
      cy.fillSelect("Location Type", "Facility");
      cy.fillCombobox("Location Code", data.locationCode);
      cy.fillCombobox("Requestor", "Diesel Rockwall");
      cy.EditInputElement("RequestorPhone", faker.phone.number("###-###-####"));
      cy.EditInputElement("RequestorEmail", faker.internet.email());
      cy.fillCombobox("Status", "Assigned");
      cy.EditInputElement("StatusNote", faker.random.words(1));
      cy.fillCombobox("WO Type Description", data.woTypeDescription);
      cy.fillCombobox("Priority Description", data.priorityDescription);
      cy.fillTextarea("Request", faker.random.words(10));
      cy.fillDateInput(
        "Finish Date",
        faker.date.future().toLocaleDateString("en-US")
      );
      cy.fillDateInput(
        "Closed Date",
        faker.date.future().toLocaleDateString("en-US")
      );
      cy.fillDateInput(
        "Est. Start Date",
        new Date().toLocaleDateString("en-US")
      );
      cy.fillDateInput(
        "Est. End Date",
        faker.date.future().toLocaleDateString("en-US")
      );
      cy.fillCombobox("Task Code", data.taskCode);
      cy.fillCombobox("*Key Number", "A-Run-6220");
      cy.fillCombobox("Key Holder", "101");
      cy.fillCombobox("Contractor Code", "1639104");
      cy.fillCheckbox("Work Not Done");
      cy.fillCheckbox("Not Located");
      cy.fillCheckbox("Failed PM");
      cy.fillCombobox("Failure Code", "Auto-6619");
      cy.fillCombobox("Event Code", "13850362");
      cy.fillCombobox("Project #", "4355");
      cy.fillCombobox("Tax Rate", "Auto-ADP");
      cy.fillNumericTextBox(0, faker.address.longitude());
      cy.fillNumericTextBox(1, faker.address.latitude());
      cy.fillSelect("Dropdown Joe", "Option 1");
      cy.fillSelect("Tool Delayed", "10 Hours");
      cy.fillNumericTextBox(5, faker.datatype.number(24));
      cy.fillNumericTextBox(6, faker.datatype.number(24));

      cy.contains("Results").click();
      cy.get("#toolbarAddComment").click().wait(500);
      cy.editTextarea("Task Comment", faker.random.words(3));
      cy.getButtonWithText("Save").click();
      cy.editTextarea("General Comments", faker.random.words(2));
      cy.fillDateInput(
        "Department Sign Off",
        faker.date.future().toLocaleDateString("en-US")
      );
      cy.fillDateInput(
        "Building Svcs Sign Off",
        faker.date.future().toLocaleDateString("en-US")
      );
      cy.EditInputElement("DepartmentHead", faker.name.fullName());
      cy.fillCheckbox("Operator Error");
      cy.fillCheckbox("Action Required");
      cy.fillCheckbox("Operator Risk");
      cy.fillCheckbox("Patient Risk");
      cy.editTextarea("Corrective Action", faker.random.words(3));

      cy.contains("Costs").click();
      cy.get("#toolbarAddLabor").click();
      cy.fillCombobox("Technician Code", 4);
      cy.fillCombobox("Trade", 4);
      cy.fillNumericTextBox(0, faker.datatype.number(24));
      cy.editTextarea("Labor Comment", faker.random.words(5));
      cy.editTextarea("Technician Comment", faker.random.words(5));
      cy.editTextarea("General Comments", faker.random.words(5));
      cy.get("#toolbarAddLaborAdjustment").click();
      cy.wait(500);
      cy.selectCheckBoxFromGrid(
        "/html/body/pageslide[2]/div/div/div/div[2]/form/div/div/div/div[2]/table/tbody/tr[1]/td[1]/input"
      );
      cy.getButtonWithText("Add Selected").click();
      cy.getButtonWithText("Save").click();

      //Post Test Item
      cy.get("input[name='PostTestItem']").should("be.visible").click();
      cy.fillCombobox("Item Tag#", 3);
      cy.fillCheckbox("Chargeable");
      cy.fillCheckbox("Flat Rate?");
      cy.fillNumericTextBox(1, faker.datatype.number(24));
      cy.EditInputElement("Unit", faker.datatype.number(100));
      cy.openFlyoutAndSelectRandomValue("Account #");
      cy.editTextarea("Comment", faker.random.words(5));
      cy.getButtonWithText("Save").click();

      cy.contains("Billing Info").click();
      cy.get("#toolbarAddTier").click();

      cy.contains("Schedule").click();
      cy.get("#toolbarAddSchedule").click();
      cy.fillCombobox("Technician", 8);
      cy.wait(1000);
      cy.openFlyoutAndSelectRandomValue("Trade Code");
      cy.editTextarea("Comments", faker.random.words(5));
      cy.getButtonWithText("Save").click();

      //Add Allocated Part
      cy.get("#toolbarAddAllocatedPart").should("be.visible").click();
      cy.fillCombobox("Part/Material", "011001-1223343");
      cy.fillNumericTextBox(0, faker.datatype.number(1));
      cy.getButtonWithText("Save").click();

      //Request Part
      cy.get("#toolbarAddRequestedPart", { timeout: 10000 })
        .should("be.visible")
        .click();
      cy.fillCombobox("Technician Code", 8);
      cy.fillCombobox("Part Code", 8);
      cy.fillNumericTextBox(0, faker.datatype.number(100));
      cy.editTextarea("Comments", faker.random.words(5));
      cy.getButtonWithText("Save").click();

      //Request Training
      cy.get("#toolbarAddTrainingRequest").should("be.visible").click();
      cy.fillCombobox("Technician Code", 8);
      cy.fillCombobox("Program ID", 8);
      cy.fillSelect("Item Dropdown List", "Area Type");
      cy.fillCombobox("Task Type Code", 8);
      cy.EditInputElement("Email", faker.internet.email());
      cy.editTextarea("Comments", faker.random.words(5));
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
      cy.EditInputElement("State", faker.address.state());
      cy.EditInputElement("Zip", faker.address.zipCode());
      cy.EditInputElement("Suffix", faker.name.suffix());
      cy.EditInputElement("Nickname", faker.name.firstName());
      cy.EditInputElement("Spousename", faker.name.firstName());
      cy.EditInputElement("JobTitle", faker.name.jobTitle());
      cy.EditInputElement("Department", faker.commerce.department());
      cy.EditInputElement("Office", faker.random.words(1));
      cy.EditInputElement("Profession", faker.name.jobTitle());

      cy.EditInputElement("Company", faker.company.companySuffix());
      cy.EditInputElement("BusinessPhone", faker.phone.number("###-###-####"));
      cy.EditInputElement("BusinessFax", faker.phone.number("###-###-####"));
      cy.EditInputElement("ManagerName", faker.name.fullName());
      cy.EditInputElement("AssistantName", faker.name.fullName());
      cy.EditInputElement("Email", faker.internet.email());
      cy.EditInputElement("HomePhone", faker.phone.number("###-###-####"));
      cy.EditInputElement("MobilePhone", faker.phone.number("###-###-####"));
      cy.EditInputElement("Url", faker.internet.url());
      cy.fillDateInput("Birthday", new Date().toLocaleDateString("en-US"));
      cy.fillDateInput("Anniversary", new Date().toLocaleDateString("en-US"));
      cy.getButtonWithText("Save").click();

      //Add Note
      cy.get("#toolbarAddNote").should("be.visible").click();
      cy.EditInputElement("Title", faker.random.words(1));
      cy.editTextarea("Note", faker.random.words(5));
      cy.EditInputElement("OwnerName", faker.name.fullName());
      cy.getButtonWithText("Save").click();

      //Add Task
      cy.get("#toolbarAddTask").should("be.visible").click();
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

      cy.clickSaveAndCheckResponse();

      cy.clickDeleteAndCheckResponse();
    });
  }
);
