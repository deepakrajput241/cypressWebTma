import { faker } from "@faker-js/faker";

describe("Create Custodial Template - negative scenarios, Create and Delete", () => {
  let ID;

  const data = {
    type: "01",
    routineTask: "01-31",
    projectTask: "01-39",
    taskCode: "2424",
    area: "321321-560",
    repairCenter: "RC001",
    workOrderType: "Preventive Maintenance",
    priorityCode: "1",
    trade: "ability Oriental",
    department: "2",
    account: "1111 2222 3333 4444",
    technician: "101",
    rateSchedule: "1012",
    warehouseCode: "328264147",
    nextPmDate: faker.date.past().toLocaleDateString("en-US"),
  };
  beforeEach("Login to Web app", () => {
    cy.login(Cypress.env("user1"));
  });

  it("Custodial Template - Negative Cases", { tags: "@smoke" }, () => {
    cy.visit("/#!/CDTemplate/Create");
    cy.EditInputElement("Code", faker.datatype.number(99999));
    cy.EditInputElement("Description", faker.random.words(2));
    cy.clickAndCheckAlert("Save", "Type is required\r\n");

    cy.fillCombobox("Type", 2);
    cy.get("input[name='Code']").clear();
    cy.clickAndCheckAlert("Save", "Code is required\r\n");

    cy.EditInputElement("Code", faker.datatype.number(99999));
    cy.get("input[name='Description']").clear();
    cy.clickAndCheckAlert("Save", "Description is required\r\n");

    cy.EditInputElement("Description", faker.random.words(2));
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "/CDTemplate/Create?*",
      200,
      "Error",
      "Repair Centers\r\n\r\nAt least 1 record is required for RC Code\r\n"
    );
  });

  it(
    "Create Custodial Template with Required fields",
    { tags: "@smoke" },
    () => {
      cy.visit("/#!/CDTemplate/Create");
      cy.EditInputElement("Code", faker.datatype.number(99999));
      cy.EditInputElement("Description", faker.random.words(2));
      cy.fillCombobox("CD Template Type Code", "20");
      cy.selectRepairCenter();
      cy.clickAndCheckResponse("Save", "POST", "CDTemplate/Create*", 200);

      cy.clickDeleteAndCheckResponse();
    }
  );

  it("Create Custodial Template with All fields", () => {
    cy.visit("/#!/CDTemplate/Create");
    cy.EditInputElement("Code", faker.datatype.number(99999));
    cy.EditInputElement("Description", faker.random.words(2));
    cy.fillCombobox("Type", 2);
    cy.get("#toolbarAddRoutineTask").click();
    cy.openFlyoutAndSelectRandomValue("Task");
    cy.openFlyoutAndSelectRandomValue("Item");
    cy.fillNumericTextBox(2, faker.datatype.number(1000));
    cy.fillNumericTextBox(3, faker.datatype.number(1000));
    cy.fillNumericTextBox(4, faker.datatype.number(1000));
    cy.get("a[ng-click='saveRecord()']").click();
    cy.get("#toolbarAddProjectTask").click();
    cy.openFlyoutAndSelectRandomValue("Task");
    cy.openFlyoutAndSelectRandomValue("Item");
    cy.get(".k-formatted-value.k-input.ng-scope").eq(2).clear();
    cy.get(".k-formatted-value.k-input.ng-scope").eq(3).clear();
    cy.get(".k-formatted-value.k-input.ng-scope").eq(4).clear();
    cy.fillNumericTextBox(2, faker.datatype.number(1000));
    cy.fillNumericTextBox(3, faker.datatype.number(1000));
    cy.fillNumericTextBox(4, faker.datatype.number(1000));
    cy.get("a[ng-click='saveRecord()']").click();
    cy.selectRepairCenter();
    cy.xpath("//*[@role='tab' and text()='PMs']").click();
    cy.get("#DefaultAddPm").click();
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
    cy.fillNumericTextBox(0, faker.datatype.number(1000));
    cy.fillNumericTextBox(1, faker.datatype.number(1000));
    cy.fillInput("Next PM Date", data.nextPmDate);
    cy.fillNumericTextBox(2, faker.datatype.number(1000));
    cy.get("select[aria-label='Recurrence']").select(2);
    cy.getButtonWithText("Save").click();
    cy.xpath("//*[@role='tab' and text()='Item']").click();
    cy.get("#toolbarAddItem").click();
    cy.selectCheckBoxFromGrid(
      "/html/body/pageslide[1]/div/div/div/div[2]/form/div/div/div/div/div/div/div[2]/table/tbody/tr[1]/td[1]/input"
    );
    cy.get("a[ng-click='saveSelection()']").click();
    cy.clickAndCheckResponse("Save", "POST", "CDTemplate/Create*", 200).then(
      (id) => {
        ID = id;
      }
    );
  });

  it("Delete Custodial Template", () => {
    cy.visit(`/#!/CDTemplate/${ID}`);
    cy.clickDeleteAndCheckResponse();
  });
});
