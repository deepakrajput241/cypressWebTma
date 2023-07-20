import { faker } from "@faker-js/faker";
describe("Create Ground Routes", () => {
  let routeId;

  const data = {
    nextPmDate: faker.date.past().toLocaleDateString("en-US"),
    facilityName: "School District",
    buildingName: "1780 W. 7th St.",
    floorDescription: "03 Mezzanine Level",
    supervisorName: "dam Hanson",
    groundsKeeperName: "Adam Szymanski",
    shift: "1st Shift",
    taskCode: "2424",
    repairCenter: "Facilities",
    workOrderType: "Preventive Maintenance",
    woSubType: "PMsub",
    priorityCode: "1",
    trade: "Admin",
    department: "American Indian Education Program",
    accountNo: "1",
    technician: "101",
    rateSchedule: "SR",
    warehouseCode: "8419328",
  };

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
  });

  it("Ground Route - Negative Cases", { tags: "@smoke" }, () => {
    cy.visit("#!/GRNRoute/Create");
    cy.EditInputElement("Code", faker.datatype.number(99999));
    cy.EditInputElement("Description", faker.random.words(1));
    cy.clickAndCheckAlert("Save", "Supervisor Name is required\r\n");

    cy.openFlyoutAndSelectRandomValue("Supervisor Name");
    cy.get("input[name='Code']").clear();
    cy.clickAndCheckAlert("Save", "Code is required\r\n");

    cy.EditInputElement("Code", faker.datatype.number(99999));
    cy.get("input[name='Description']").clear();
    cy.clickAndCheckAlert("Save", "Description is required\r\n");
  });

  it("Create Ground Route with required fields", { tags: "@smoke" }, () => {
    cy.visit("#!/GRNRoute/Create");
    cy.EditInputElement("Code", faker.datatype.number(99999));
    cy.EditInputElement("Description", faker.random.words(1));
    cy.openFlyoutAndSelectRandomValue("Supervisor Name");
    cy.clickAndCheckResponse("Save", "POST", "GRNRoute/Create*", 200);
  });

  it("Create Ground Route with All fields", () => {
    cy.visit("#!/GRNRoute/Create");
    cy.EditInputElement("Code", faker.datatype.number(99999));
    cy.EditInputElement("Description", faker.random.words(1));
    cy.openFlyoutAndSelectRandomValue("Supervisor Name");
    cy.openFlyoutAndSelectRandomValue("Groundskeeper Name");
    cy.fillCombobox("Facility Name", data.facilityName);
    cy.openFlyoutAndSelectRandomValue("Shift");
    cy.get("#toolbarAddArea").click();
    cy.get(
      "#divContentEntryPanel1 > div > div.psContentDiv > form > div:nth-child(3) > div > div > dl > dd > select"
    ).select(2);
    cy.get(".k-grid-content.k-auto-scrollable");
    cy.selectRandomCheckBoxFromGrid(
      1,
      "/html/body/pageslide[1]/div/div/div/div[2]/form/div[2]/div[3]/div/div/div/div/div/div[2]/table/tbody/tr[1]/td[1]/input"
    );
    cy.get("a[ng-click='customSave()']").click();
    cy.xpath("//*[@role='tab' and text()='PMs']").click().wait(1500);
    cy.get("#DefaultAddPm").should("be.visible").click();
    cy.fillCombobox("Task Code", 3);
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
    cy.fillInput("Next PM Date", data.nextPmDate);
    cy.fillNumericTextBox(2, faker.datatype.number(12));
    cy.get("select[aria-label='Recurrence']").select(2);
    cy.getButtonWithText("Save").click();
    cy.clickAndCheckResponse("Save", "POST", "GRNRoute/Create*", 200).then(
      (id) => {
        routeId = id;
      }
    );
  });

  it("Delete Ground Routes", () => {
    cy.visit(`/#!/GRNRoute/${routeId}`);
    cy.clickDeleteAndCheckResponse();
  });
});
