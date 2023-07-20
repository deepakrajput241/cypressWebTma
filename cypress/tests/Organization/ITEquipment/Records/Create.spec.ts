import { faker } from "@faker-js/faker";

describe("Create New IT Equipment Records", () => {
  const data = {
    facilityName: "123",
    buildingName: "Auto_89653",
    typeDesc: "Desktop",
    department: "Data Center",
    vendor: "3M",
    manufacturer: "3M",
    account: "1111 2222 3333 4444",
    assignedTo: "Angela Vreeland",
    conditionAtInventory: "Auto-primary",
    assignedTech: "Bianka Howard",
    partVendor: "3M",
  };

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/ITEquipment/Create/Identity");
  });

  it("IT Equipment Record - Negative Cases", () => {
    cy.EditInputElement("TagNumber", faker.datatype.number(999999999));
    cy.EditInputElement("Description", faker.random.words(2));
    cy.openFlyoutAndSelectRandomValue("Facility Name");
    cy.clickAndCheckAlert("Save", "Type Desc is required\r\n");

    cy.openFlyoutAndSelectRandomValue("Type Desc");
    cy.get("input[aria-label='Facility Name']").eq(0).clear();
    cy.clickAndCheckAlert("Save", "Facility Name is required\r\n");

    cy.openFlyoutAndSelectRandomValue("Facility Name");
    cy.get("input[name='TagNumber']").clear();
    cy.clickAndCheckAlert("Save", "Tag # is required\r\n");

    cy.EditInputElement("TagNumber", faker.datatype.number(999999999));
    cy.get("input[name='Description']").clear();
    cy.clickAndCheckAlert("Save", "Description is required\r\n");

    cy.EditInputElement("Description", faker.random.words(2));
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "/ITEquipment/Create?*",
      200,
      "Error",
      "Repair Centers\r\n\r\nAt least 1 record is required for IT Equipment Repair Center Grid\r\n"
    );
  });

  it(
    "Create New IT Equipment Record with Required fields",
    { tags: "@smoke" },
    () => {
      cy.EditInputElement("TagNumber", faker.datatype.number(999999999));
      cy.EditInputElement("Description", faker.random.words(2));
      cy.openFlyoutAndSelectRandomValue("Facility Name");
      cy.openFlyoutAndSelectRandomValue("Type Desc");
      cy.selectRepairCenter();
      cy.clickSaveAndCheckResponse();
    }
  );

  it("Create New IT Equipment With All Fields", () => {
    cy.EditInputElement("TagNumber", faker.datatype.number(99999)).wait(1500);
    cy.EditInputElement("Description", faker.random.word(2));
    cy.EditInputElement("ModelNumber", faker.datatype.number(99999));
    cy.EditInputElement("SerialNumber", faker.datatype.number(99999));
    cy.openFlyoutAndSelectRandomValue("Location ID");
    cy.openFlyoutAndSelectRandomValue("Facility Name");
    cy.openFlyoutAndSelectRandomValue("Department");
    cy.fillNumericTextBox(0, faker.datatype.number(99999));
    cy.openFlyoutAndSelectRandomValue("Type Desc");
    cy.openFlyoutAndSelectRandomValue("Vendor");
    cy.openFlyoutAndSelectRandomValue("Manufacturer");
    cy.openFlyoutAndSelectRandomValue("Account #");
    cy.EditInputElement("SubLocation", faker.random.words(2));
    cy.openFlyoutAndSelectRandomValue("Status");
    cy.EditInputElement("StatusNote", faker.random.words(1));
    cy.fillCheckbox("BMP");
    cy.fillCheckbox("Leased");
    cy.fillCheckbox("Out of Service");
    cy.fillCheckbox("Service Contract");
    cy.EditInputElement("PONumber", faker.datatype.number(99999));
    cy.get("input[aria-label='Date Purchased']").type(
      new Date().toLocaleDateString("en-US")
    );
    cy.EditInputElement("LifeExpectancy", faker.datatype.number(99));
    cy.EditInputElement("IPAddress", faker.internet.ipv4());
    cy.EditInputElement("MACAddress", faker.internet.ipv4());
    cy.openFlyoutAndSelectRandomValue("Assigned To");
    cy.get("input[aria-label='Last Inventory']").type(
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.openFlyoutAndSelectRandomValue("Condition at Inventory");
    cy.openFlyoutAndSelectRandomValue("Assigned Tech");
    cy.get("input[aria-label='Warranty Date']").type(
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.get("input[aria-label='Registered Date']").type(
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.EditInputElement(
      "ServiceContractPhone",
      faker.phone.number("###-###-####")
    );
    cy.get("input[aria-label='Service Expires']").type(
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.EditInputElement("MajorTag", faker.datatype.number(99999));
    cy.openFlyoutAndSelectRandomValue("Tag Number");
    cy.openFlyoutAndSelectRandomValue("Part Vendor");
    cy.EditInputElement("LastInventoryLocation", faker.address.city());
    cy.openFlyoutAndSelectRandomValue("Inv. Technician");
    cy.get("#toolbarAddHardware").click();
    cy.fillCombobox("Hardware Type", 2);
    cy.fillCombobox("Description", 2);
    cy.EditInputElement("Value", faker.datatype.number(99999));
    cy.getButtonWithText("Save").click();
    cy.get("#toolbarAddSoftware").click();
    cy.openFlyoutAndSelectRandomValue("Publisher");
    cy.getButtonWithText("Save").click();
    cy.editTextarea("Popup Message", faker.random.words(5));
    cy.editTextarea("Comment", faker.random.words(5));

    cy.selectRepairCenter();

    cy.wait(1000);
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
    cy.wait(1000);
    cy.getButtonWithText("Save").click();

    cy.contains("Monitored Condition").click();
    cy.get("#toolbarAddCondition").click();
    cy.selectRandomCheckBoxFromGrid(
      1,
      "/html/body/pageslide[1]/div/div/div/div[2]/form/div/div/div/div[2]/table/tbody/tr[1]/td[1]/input"
    );
    cy.getButtonWithText("Add Selected").click();

    cy.contains("Checkout").click();
    cy.get("#toolbarAddItem").click();
    cy.openFlyoutAndSelectRandomValue("Technician");
    cy.EditInputElement("CurrentJob", faker.random.words(1));
    cy.get(
      "input[aria-label='Time Out'][k-options='dateTimeCtrl.dateOptions']"
    ).type(faker.date.future().toLocaleDateString("en-US"));
    cy.get(
      "input[aria-label='Time Due'][k-options='dateTimeCtrl.dateOptions']"
    ).type(faker.date.future().toLocaleDateString("en-US"));
    cy.get(
      "input[aria-label='Time In'][k-options='dateTimeCtrl.dateOptions']"
    ).type(faker.date.future().toLocaleDateString("en-US"));
    cy.getButtonWithText("Save").click();

    cy.contains("Rates").click();
    cy.fillCheckbox("Rentable");
    cy.fillCheckbox("Smoking");
    cy.wait(1500);
    cy.fillNumericTextBox(1, faker.datatype.number(99999));
    cy.fillNumericTextBox(2, faker.datatype.number(99999));
    cy.fillNumericTextBox(3, faker.datatype.number(99999));
    cy.fillNumericTextBox(4, faker.datatype.number(99999));
    cy.fillNumericTextBox(5, faker.datatype.number(99999));
    cy.fillNumericTextBox(6, faker.datatype.number(99999));
    cy.fillNumericTextBox(7, faker.datatype.number(99999));
    cy.fillNumericTextBox(0, faker.datatype.number(99999));

    cy.contains("IT").click();
    cy.get("#toolbarAddQuestion").click();
    cy.selectRandomCheckBoxFromGrid(
      1,
      "/html/body/pageslide[1]/div/div/div/div[2]/form/div/div/div/div[2]/table/tbody/tr[1]/td[1]/input"
    );
    cy.getButtonWithText("Add Selected").click();

    cy.clickSaveAndCheckResponse();
  });
});
