import { faker } from "@faker-js/faker";

describe("Create Contract", () => {
  const data = {
    repairCenterCode: "SGQ2EL",
    contractType: "385105",
    contractorCode: "INSP-ELEC",
  };

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/Contract/Create");
  });

  it("Contract - Negative Cases", () => {
    cy.EditInputElement("Number", faker.datatype.number(99999999));
    cy.get("input[aria-label='Start Date']")
      .should("be.visible")
      .type(new Date().toLocaleDateString("en-US"));
    cy.clickAndCheckAlert("Save", "End Date is required\r\n");

    cy.get("input[aria-label='End Date']").type(
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.get("input[aria-label='Start Date']").clear();
    cy.clickAndCheckAlert("Save", "Start Date is required\r\n");

    cy.get("input[aria-label='Start Date']")
      .should("be.visible")
      .type(new Date().toLocaleDateString("en-US"));
    cy.get("input[name='Number']").clear();
    cy.clickAndCheckAlert("Save", "Contract # is required\r\n");
  });

  it("Create Contract with Required fields", { tags: "@smoke" }, () => {
    cy.EditInputElement("Number", faker.datatype.number(99999999));
    cy.get("input[aria-label='Start Date']")
      .should("be.visible")
      .type(new Date().toLocaleDateString("en-US"));
    cy.get("input[aria-label='End Date']").type(
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.clickSaveAndCheckResponse();
  });

  it("Create Contract with All fields", () => {
    cy.EditInputElement("Number", faker.datatype.number(99999999));
    cy.openFlyoutAndSelectRandomValue("Repair Center Code");
    cy.openFlyoutAndSelectRandomValue("Contract Type");
    cy.get("input[aria-label='Request Date']").type(
      faker.date.recent().toLocaleDateString("en-US")
    );
    cy.openFlyoutAndSelectRandomValue("Contractor Code");
    cy.get("input[aria-label='Start Date']")
      .should("be.visible")
      .type(new Date().toLocaleDateString("en-US"));
    cy.get("input[aria-label='End Date']").type(
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.fillNumericTextBox(0, faker.datatype.number(999));
    cy.fillCheckbox("Track w/out Cost");
    cy.selectRadioBtnById("IsBidButtonList-0");
    cy.fillNumericTextBox(2, faker.datatype.number(999));
    cy.fillCheckbox("Track w/out Cost");
    cy.editTextarea("Agreement", faker.random.words(5));
    cy.fillNumericTextBox(3, faker.datatype.number(999));
    cy.fillNumericTextBox(4, faker.datatype.number(999));
    cy.fillNumericTextBox(5, faker.datatype.number(999));
    cy.fillNumericTextBox(6, faker.datatype.number(999));
    cy.get("#toolbarAddProject").click();
    cy.selectRandomCheckBoxFromGrid(
      4,
      "/html/body/pageslide[1]/div/div/div/div[2]/form/div/div[3]/div/div/div/div/div/div[2]/table/tbody/tr[1]/td[1]/input"
    );
    cy.getButtonWithText("Add Selected").click();
    cy.get("#toolbarAddContractBidder").click();
    cy.get("#IsFreeForm-1").click();
    cy.EditInputElement("Code", faker.datatype.number(99999));
    cy.EditInputElement("Name", faker.random.words(1));
    cy.EditInputElement("Address1", faker.address.streetAddress());
    cy.get("input[aria-label='Submit Date']").type(
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.fillNumericTextBox(8, faker.datatype.number(999));
    cy.getButtonWithText("Save").click();
    cy.get("#toolbarAddContractRating").click();
    cy.fillCombobox("Rating", 4);
    cy.get("input[aria-label='Date']").type(
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.EditInputElement("RatedBy", faker.name.firstName());
    cy.editTextarea("Comment", faker.random.words(5));
    cy.getButtonWithText("Save").click();
    cy.editTextarea("Comments", faker.random.words(5));

    cy.contains("Contract Item").click();
    cy.get("#toolbarAddItem").click();
    cy.selectRandomCheckBoxFromGrid(
      2,
      "/html/body/pageslide[1]/div/div/div/div[2]/form/div/div[3]/div/div/div/div/div/div[2]/table/tbody/tr[1]/td[1]/input"
    );
    cy.getButtonWithText("Add Selected").click();

    cy.contains("Services").click();
    cy.get("#toolbarAddSingleTaskType").click();
    cy.openFlyoutAndSelectRandomValue("Task Type");
    cy.openFlyoutAndSelectRandomValue("Rate Schedule");
    cy.getButtonWithText("Save").click();

    cy.get("#toolbarAddTaskTypes").click().wait(1000);
    cy.selectRandomCheckBoxFromGrid(
      1,
      "/html/body/pageslide[1]/div/div/div/div[2]/form/div/div/div/div/div/div[2]/table/tbody/tr[1]/td[1]/input"
    );
    cy.getButtonWithText("Save").click();

    cy.contains("Work Order Type").click();
    cy.get("#toolbarAddWorkOrderType").click();
    cy.selectRandomCheckBoxFromGrid(
      1,
      "/html/body/pageslide[1]/div/div/div/div[2]/form/div/div/div/div[2]/table/tbody/tr[1]/td[1]/input"
    );
    cy.getButtonWithText("Add Selected").click();
    cy.get("input[ng-model='dataItem.LaborPercentage']").type(
      faker.random.numeric(2)
    );
    cy.get("input[ng-model='dataItem.PartPercentage']").type(
      faker.random.numeric(2)
    );
    cy.get("input[ng-model='dataItem.OtherPercentage']").type(
      faker.random.numeric(2)
    );

    cy.contains("Device Type").click();
    cy.get("#toolbarAddDeviceType").click();
    cy.selectRandomCheckBoxFromGrid(
      1,
      "/html/body/pageslide[1]/div/div/div/div[2]/form/div/div/div/div[2]/table/tbody/tr[1]/td[1]/input"
    );
    cy.getButtonWithText("Add Selected").click();

    cy.contains("Attachment").click();
    cy.get("#toolbarAddContact").click();
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
    cy.EditInputElement("Department", faker.name.jobType(1));
    cy.EditInputElement("Office", faker.random.words(1));
    cy.EditInputElement("Profession", faker.name.jobType());

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
    cy.EditInputElement("OwnerName", faker.name.fullName());
    cy.getButtonWithText("Save").click();

    //Add Task
    cy.get("#toolbarAddTask").click();
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
  });
});
