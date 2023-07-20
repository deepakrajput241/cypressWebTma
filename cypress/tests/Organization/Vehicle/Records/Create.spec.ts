import { faker } from "@faker-js/faker";

describe("Create Vehicle Record", () => {
  const data = {
    facilityName: "123",
    buildingName: "Auto_23971",
    department: "Data Center",
    typeDescription: "Fleet",
    vendor: "3M",
    manufacturerName: "3M",
    account: "1111 2222 3333 4444",
    conditionAtInventory: "Auto-Directives",
    assignedTech: "Allen Lopez",
    inventoryTechnician: "Andrew Sivanich",
    vehicleFunction: "Police vehicles",
  };

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/Vehicle/Create");
  });

  it("Vehicle Records - Negative Cases", () => {
    cy.EditInputElement("TagNumber", faker.datatype.number(999999));
    cy.EditInputElement("Description", faker.random.words(2));
    cy.openFlyoutAndSelectRandomValue("Facility Name");
    cy.clickAndCheckAlert("Save", "Type Description is required\r\n");

    cy.openFlyoutAndSelectRandomValue("Type Description");
    cy.get("input[aria-label='Facility Name']").eq(0).clear();
    cy.clickAndCheckAlert("Save", "Facility Name is required\r\n");

    cy.openFlyoutAndSelectRandomValue("Facility Name");
    cy.get("input[name='TagNumber']").clear();
    cy.clickAndCheckAlert("Save", "Tag # is required\r\n");

    cy.EditInputElement("TagNumber", faker.datatype.number(999999));
    cy.get("input[name='Description']").clear();
    cy.clickAndCheckAlert("Save", "Description is required\r\n");

    cy.EditInputElement("Description", faker.random.words(2));
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "/Vehicle/Create?*",
      200,
      "Error",
      "Repair Centers\r\n\r\nAt least 1 record is required for Repair Centers\r\n"
    );
  });

  it("Create Vehicle record with required fields", { tags: "@smoke" }, () => {
    cy.EditInputElement("TagNumber", faker.datatype.number(999999));
    cy.EditInputElement("Description", faker.random.words(2));
    cy.openFlyoutAndSelectRandomValue("Facility Name");
    cy.openFlyoutAndSelectRandomValue("Type Description");

    cy.selectRepairCenter();

    cy.contains("Linked Items").click();
    cy.get("#toolbarAddLinkedItem").click();
    cy.get("select[aria-label='Item Type']").select("Asset");
    cy.fillCombobox("Item Code", 1);
    cy.getButtonWithText("Save").click();
    cy.clickSaveAndCheckResponse();
  });

  it("Create Vehicle record with All fields", () => {
    cy.EditInputElement("TagNumber", faker.datatype.number(999999));
    cy.EditInputElement("Description", faker.random.words(2));
    cy.openFlyoutAndSelectRandomValue("Location ID");
    cy.openFlyoutAndSelectRandomValue("Facility Name");
    cy.openFlyoutAndSelectRandomValue("Type Description");
    cy.get("input[aria-label='Warranty Date']").type(
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.get("input[aria-label='Registered Date']").type(
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.openFlyoutAndSelectRandomValue("Vendor");
    cy.openFlyoutAndSelectRandomValue("Manufacturer Name");
    cy.get("input[aria-label='Purchase Date']").type(
      new Date().toLocaleDateString("en-US")
    );
    cy.openFlyoutAndSelectRandomValue("Account");
    cy.EditInputElement("VIN", faker.datatype.number(99999999));
    cy.fillNumericTextBox(0, faker.datatype.number(9999));
    cy.fillNumericTextBox(1, faker.datatype.number(9999));
    cy.fillNumericTextBox(2, faker.datatype.number(9999));
    cy.fillNumericTextBox(3, faker.datatype.number(9999));
    cy.get("input[aria-label='Last Tune Up Date']").type(
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.EditInputElement("StateTag", faker.datatype.number(999999));
    cy.get("input[aria-label='Last Inventory']").type(
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.openFlyoutAndSelectRandomValue("Condition at Inventory");
    cy.get("input[aria-label='Sch Replacement']").type(
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.get("input[aria-label='Last Emissions Test']").type(
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.get("input[aria-label='Next Emissions Test']").type(
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.get("input[aria-label='Last Safety Check']").type(
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.get("input[aria-label='Next Safety Check']").type(
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.EditInputElement("SubLocation", faker.address.city());
    cy.EditInputElement("LastInventoryLocation", faker.address.city());
    cy.openFlyoutAndSelectRandomValue("Inventory Technician");
    cy.fillNumericTextBox(4, faker.address.latitude());
    cy.fillNumericTextBox(5, faker.address.longitude());
    cy.EditInputElement("GISUniqueId", "11111111-1212-1212-1212-111111111111");
    cy.editTextarea("Popup Message", faker.random.words(5));
    cy.EditInputElement("EngineType", faker.random.words(1));
    cy.fillNumericTextBox(6, faker.datatype.number(9999));
    cy.fillNumericTextBox(7, faker.datatype.number(9999));
    cy.EditInputElement("BodyType", faker.random.words(1));
    cy.EditInputElement("ModelYear", new Date().getFullYear());
    cy.EditInputElement("ModelNumber", faker.datatype.number(999999));
    cy.EditInputElement("FleetNumber", faker.datatype.number(9999));
    cy.get("input[aria-label='Delivery Date']").type(
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.EditInputElement("FundType", faker.random.words(1));
    cy.openFlyoutAndSelectRandomValue("Vehicle Function");
    cy.EditInputElement("Ownership", faker.random.words(1));
    cy.EditInputElement("Make", faker.random.words(1));
    cy.EditInputElement("NumberCylinders", faker.datatype.number(100));
    cy.EditInputElement("Use", faker.random.words(1));
    cy.fillNumericTextBox(7, faker.datatype.number(100));
    cy.EditInputElement("TireSize", faker.datatype.number(999));
    cy.editTextarea("Comments", faker.random.words(5));

    cy.selectRepairCenter();

    cy.contains("Contractors").click();
    cy.get("#toolbarAddContractor").click();
    cy.get("#divItems").click().wait(1000);
    cy.get("a[name='Search']").should("be.visible").click();
    cy.selectRandomCheckBoxFromGrid(
      1,
      "/html/body/pageslide[1]/div/div/div/div[2]/form/div/div[3]/div/div/div/div/div/div[2]/table/tbody/tr[1]/td[1]/input"
    );
    cy.getButtonWithText("Add Selected").click();

    cy.contains("Linked Items").click();
    cy.get("#toolbarAddLinkedItem").click();
    cy.get("select[aria-label='Item Type']").select("Asset");
    cy.fillCombobox("Item Code", 1);
    cy.getButtonWithText("Save").click();

    cy.contains("Meters").click();
    cy.get("#toolbarAddMeter").click();
    cy.EditInputElement("Name", faker.datatype.number(99999));
    cy.EditInputElement("Description", faker.random.words(2));
    cy.fillNumericTextBox(0, faker.datatype.number(99));
    cy.fillNumericTextBox(1, faker.datatype.number(99));
    cy.fillNumericTextBox(2, faker.datatype.number(99));
    cy.fillNumericTextBox(3, faker.datatype.number(99));
    cy.fillCombobox("Technician Code", 1);
    cy.getButtonWithText("Save").click();

    cy.contains("PMs").click();
    cy.get("#DefaultAddPm").click();
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
    cy.get("input[aria-label='Next PM Date']").type(
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.fillNumericTextBox(2, faker.datatype.number(10));
    cy.get("select[aria-label='Recurrence']").select(2);
    cy.getButtonWithText("Save").click();

    cy.contains("Monitored Condition").click();
    cy.get("#toolbarAddCondition").click();
    cy.selectRandomCheckBoxFromGrid(
      1,
      "/html/body/pageslide[1]/div/div/div/div[2]/form/div/div/div/div[2]/table/tbody/tr[1]/td[1]/input"
    );
    cy.getButtonWithText("Add Selected").eq(0).click();

    cy.contains("Rates").click();
    cy.EditInputElement("UsageUnit", faker.random.words(1));
    cy.fillNumericTextBox(0, faker.datatype.number(999));
    cy.fillNumericTextBox(1, faker.datatype.number(9999));
    cy.fillNumericTextBox(2, faker.datatype.number(99999));
    cy.fillNumericTextBox(3, faker.datatype.number(999999));
    cy.fillNumericTextBox(4, faker.datatype.number(9999999));
    cy.fillNumericTextBox(5, faker.datatype.number(99999));
    cy.fillNumericTextBox(6, faker.datatype.number(9999));
    cy.fillNumericTextBox(7, faker.datatype.number(9999));
    cy.fillNumericTextBox(8, faker.datatype.number(99999));
    cy.fillCheckbox("Rentable");
    cy.fillCheckbox("Smoking");
    cy.fillNumericTextBox(9, faker.datatype.number(999));
    cy.fillNumericTextBox(10, faker.datatype.number(999));

    cy.contains("IT").click();
    cy.get("#toolbarAddQuestion").click();
    cy.selectRandomCheckBoxFromGrid(
      1,
      "/html/body/pageslide[1]/div/div/div/div[2]/form/div/div/div/div[2]/table/tbody/tr[1]/td[1]/input"
    );
    cy.getButtonWithText("Add Selected").click();

    cy.contains("Checkout").click();
    cy.get("#toolbarAddItem").click();
    cy.openFlyoutAndSelectRandomValue("Technician");
    cy.get(
      "input[aria-label='Time Out'][k-options='dateTimeCtrl.dateOptions']"
    ).type(faker.date.future().toLocaleDateString("en-US"));
    cy.getButtonWithText("Save").click();
    cy.clickSaveAndCheckResponse();
  });
});
