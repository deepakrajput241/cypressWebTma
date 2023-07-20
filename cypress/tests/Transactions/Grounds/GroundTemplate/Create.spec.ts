import { faker } from "@faker-js/faker";
describe("Create Grounds Templates", () => {
  let tempId;
  const data = {
    type: "test",
    task: "Ground1168",
    taskCode: "2424",
    area: "ADMIN-100",
    repairCenter: "Facilities",
    workOrderType: "Preventive Maintenance",
    woSubType: "PMSub",
    priorityCode: "1",
    trade: "Alarm Monitors",
    department: "American Indian Education Program",
    accountNo: "1",
    technician: "101",
    rateSchedule: "SR",
    warehouseCode: "8419328",
  };

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
  });

  it("Ground Template - Negative Cases", { tags: "@smoke" }, () => {
    cy.visit("#!/GRNTemplate/Create");
    cy.EditInputElement("Code", faker.datatype.number(9999999));
    cy.EditInputElement("Description", faker.random.words(2));
    cy.clickAndCheckAlert("Save", "Type is required\r\n");

    cy.openFlyoutAndSelectRandomValue("Type");
    cy.get("input[name='Code']").clear();
    cy.clickAndCheckAlert("Save", "Code is required\r\n");

    cy.EditInputElement("Code", faker.datatype.number(9999999));
    cy.get("input[name='Description']").clear();
    cy.clickAndCheckAlert("Save", "Description is required\r\n");

    cy.EditInputElement("Description", faker.random.words(2));
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "/GRNTemplate/Create?*",
      200,
      "Error",
      "Repair Centers\r\n\r\nAt least 1 record is required for RC\r\n"
    );
  });

  it("Create Ground Template with Required fields", { tags: "@smoke" }, () => {
    cy.visit("#!/GRNTemplate/Create");
    cy.EditInputElement("Code", faker.datatype.number(9999999));
    cy.EditInputElement("Description", faker.random.words(2));
    cy.fillCombobox("Type", 2);
    cy.selectRepairCenter();
    cy.clickSaveAndCheckResponse();
  });

  it("Create Ground Template with All fields", () => {
    cy.visit("#!/GRNTemplate/Create");
    cy.EditInputElement("Code", faker.datatype.number(9999999));
    cy.EditInputElement("Description", faker.random.words(2));
    cy.openFlyoutAndSelectRandomValue("Type");
    // this.addTask();
    cy.selectRepairCenter();
    cy.contains("Items").click();
    cy.get("#toolbarAddItem").should("be.visible").click();
    cy.selectCheckBoxFromGrid(
      "/html/body/pageslide[1]/div/div/div/div[2]/form/div/div/div/div/div/div/div[2]/table/tbody/tr[1]/td[1]/input"
    );
    cy.wait(2000);
    cy.get("a[ng-click='saveSelection()']").should("be.visible").click();
    cy.contains("PM").click();
    cy.get("#DefaultAddPm").should("be.visible").click();
    cy.fillCombobox("Task Code", 3);
    cy.fillCombobox("Item Code", 3);
    cy.fillCombobox("Repair Center", 3);
    cy.fillCombobox("Work Order Type", 3);
    cy.fillCombobox("Priority Code", 3);
    cy.fillCombobox("Trade", 3);
    cy.fillCombobox("Department", 3);
    cy.fillCombobox("Account #", 3);
    cy.fillCombobox("Technician Code", 3);
    cy.fillCombobox("Rate Schedule", 3);
    cy.fillCombobox("Warehouse Code", 3);
    cy.fillCheckbox("Charge");
    cy.fillNumericTextBox(0, faker.datatype.number(10));
    cy.fillNumericTextBox(1, faker.datatype.number(10));
    cy.get("input[aria-label='Next PM Date']").type(
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.fillNumericTextBox(2, faker.datatype.number(10));
    cy.get("select[aria-label='Recurrence']").select(2);
    cy.getButtonWithText("Save").click();
    cy.clickAndCheckResponse("Save", "POST", "GRNTemplate/Create*", 200).then(
      (id) => {
        tempId = id;
      }
    );
  });

  it("Delete Ground Template", () => {
    cy.visit(`/#!/GRNTemplate/${tempId}`);
    cy.clickDeleteAndCheckResponse();
  });
});
