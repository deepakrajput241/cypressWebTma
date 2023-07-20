import { faker } from "@faker-js/faker";

const data = {
  type: "Tool",
  facility: "123",
  locationId: "ADMIN-100A",
  department: "Communications",
  account: "1111 2222 3333 4444",
  manufacturer: "Tennant",
  vendor: "3M",
  sop: "Auto_101",
  assignedTech: "Gary Christnach",
  partsVendor: "1",
  ownerDepartment: "Wellness",
  condition: "Good",
  technician: "Briana Hanson",
};

describe("create Equipment", () => {
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/Equipment/Create");
  });

  it("should not create Equipment without required fields", () => {
    cy.EditInputElement("Tag Number", faker.random.numeric(5));
    cy.EditInputElement("Description", faker.random.words(5));
    cy.fillCombobox("Type", data.type);
    cy.clickSaveAndCheckAlert("Facility is required\r\n");

    cy.openFlyoutAndSelectRandomValue("Facility");
    cy.get("input[name='TagNumber']").clear();
    cy.clickSaveAndCheckAlert("Tag # is required\r\n");

    cy.EditInputElement("TagNumber", faker.datatype.number(999999999));
    cy.get("input[name='Description']").clear();
    cy.clickSaveAndCheckAlert("Description is required\r\n");

    cy.EditInputElement("Description", faker.random.words(1));
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "/Equipment/Create?*",
      200,
      "Error",
      "Repair Centers\r\n\r\nAt least 1 record is required for Equipment Repair Center Grid\r\n"
    );
  });

  it("should create Equipment with required fields", { tags: "@smoke" }, () => {
    cy.EditInputElement("TagNumber", faker.datatype.number(999999999));
    cy.EditInputElement("Description", faker.random.words(1));
    cy.fillCombobox("Type", "Auto-11");
    cy.fillCombobox("Facility Name", "Automation Facility");
    cy.selectRepairCenter();
    cy.clickSaveAndCheckResponse();
  });

  it.skip("Create Equipment Record with All fields", () => {
    cy.EditInputElement("TagNumber", faker.datatype.number(999999999));
    cy.EditInputElement("Description", faker.random.words(1));
    cy.openFlyoutAndSelectRandomValue("Type");
    cy.openFlyoutAndSelectRandomValue("Location ID");
    cy.fillCombobox("Facility Name", "Automation Facility");
    cy.openFlyoutAndSelectRandomValue("Building");
    cy.fillNumericTextBox(0, faker.datatype.number(999));
    cy.openFlyoutAndSelectRandomValue("Department");
    cy.openFlyoutAndSelectRandomValue("Account #");
    cy.openFlyoutAndSelectRandomValue("Status");
    cy.EditInputElement("StatusNote", faker.random.words());
    cy.EditInputElement("Make", faker.datatype.number(9999999));
    cy.EditInputElement("ModelNumber", faker.datatype.number(999999));
    cy.EditInputElement("SerialNumber", faker.datatype.number(999999));
    cy.openFlyoutAndSelectRandomValue("Manufacturer");
    cy.openFlyoutAndSelectRandomValue("Vendor Name");
    cy.EditInputElement("DeviceNumber", faker.datatype.number(99999));
    cy.EditInputElement("SecondaryId", faker.datatype.number(99999));
    cy.openFlyoutAndSelectRandomValue("Regulatory Category");
    cy.EditInputElement("DeliveryCode", faker.datatype.number(99));
    cy.openFlyoutAndSelectRandomValue("Lock-Out");
    cy.openFlyoutAndSelectRandomValue("SOP");
    cy.openFlyoutAndSelectRandomValue("Assigned Tech");
    cy.openFlyoutAndSelectRandomValue("Parts Vendor");
    cy.EditInputElement("ServiceContractPhone", faker.name.firstName());
    cy.get(
      "input[aria-label='Date'][k-options='dateTimeCtrl.dateOptions']"
    ).type(faker.date.future().toLocaleDateString("en-US"));
    cy.fillCheckbox("Building Asset");
    cy.fillCheckbox("Service Contract");
    cy.fillCheckbox("BMP");
    cy.fillCheckbox("Leased");
    cy.fillCheckbox("FAA Paperwork Required");
    cy.EditInputElement("GISUniqueId", "11111111-1212-1212-1212-111111111111");
    cy.EditInputElement("Latitude", faker.address.latitude());
    cy.EditInputElement("Longitude", faker.address.longitude());
    cy.EditInputElement("SubLocation", faker.address.city());
    cy.openFlyoutAndSelectRandomValue("Attached to Vehicle");
    cy.get("input[aria-label='Last Inventory']").type(
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.openFlyoutAndSelectRandomValue("Condition");
    cy.EditInputElement("LastInventoryLocation", faker.address.city());
    cy.openFlyoutAndSelectRandomValue("Technician");
    cy.get("input[aria-label='Base PM Date']").type(
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.get("input[aria-label='Last Certified']").type(
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.fillNumericTextBox(1, faker.datatype.number(999));
    cy.get("input[aria-label='Last Calibration']").type(
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.get("input[aria-label='Warranty Date']").type(
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.get("input[aria-label='Purchase Date']").type(
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.get("input[aria-label='Service Expires']").type(
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.get("input[aria-label='Registered Date']").type(
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.get("input[aria-label='Inspection Date']").type(
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.get("input[aria-label='Certificate Expires']").type(
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.fillNumericTextBox(2, faker.datatype.number(999));
    cy.fillNumericTextBox(3, faker.datatype.number(999));
    cy.fillNumericTextBox(4, faker.datatype.number(999));
    cy.fillNumericTextBox(5, faker.datatype.number(999));
    cy.fillNumericTextBox(6, faker.datatype.number(999));
    cy.fillNumericTextBox(7, faker.datatype.number(999));
    cy.get(
      "input[aria-label='Last Rating Date'][k-options='dateTimeCtrl.dateOptions']"
    ).type(faker.date.future().toLocaleDateString("en-US"));
    cy.editTextarea("Comments", faker.random.words(5));
    cy.editTextarea("Popup Message", faker.random.words(5));

    cy.selectRepairCenter();

    cy.contains("Misc").click();
    cy.EditInputElement("Part1Name", faker.random.words(1));
    cy.EditInputElement("Part1Model", faker.datatype.number(999999));
    cy.EditInputElement("Part1MFG", faker.random.words(1));
    cy.EditInputElement("Part1Type", faker.random.words(1));
    cy.EditInputElement("Part1Serial", faker.datatype.number(999999999));
    cy.EditInputElement("Part2Name", faker.random.words(1));
    cy.EditInputElement("Part2Model", faker.datatype.number(999999));
    cy.EditInputElement("Part2MFG", faker.random.words(1));
    cy.EditInputElement("Part2Type", faker.random.words(1));
    cy.EditInputElement("Part2Serial", faker.datatype.number(999999));
    cy.EditInputElement("Part3Name", faker.random.words(1));
    cy.EditInputElement("Part3Model", faker.datatype.number(999999));
    cy.EditInputElement("Part3MFG", faker.random.words(1));
    cy.EditInputElement("Part3Type", faker.random.words(1));
    cy.EditInputElement("Part3Serial", faker.datatype.number(999999));
    cy.EditInputElement("Part4Name", faker.random.words(1));
    cy.EditInputElement("Part4Model", faker.datatype.number(9999999));
    cy.EditInputElement("Part4MFG", faker.random.words(1));
    cy.EditInputElement("Part4Type", faker.random.words(1));
    cy.EditInputElement("Part4Serial", faker.datatype.number(999999));
    cy.EditInputElement("Belt1Name", faker.random.words(1));
    cy.EditInputElement("Belt1Size", faker.datatype.number(999));
    cy.fillNumericTextBox(0, faker.datatype.number(999));
    cy.EditInputElement("FilterInfo", faker.random.words(1));
    cy.EditInputElement("FilterSize", faker.datatype.number(9999));
    cy.EditInputElement("Belt2Name", faker.random.words(1));
    cy.EditInputElement("Belt2Size", faker.datatype.number(9999));
    cy.fillNumericTextBox(1, faker.datatype.number(999));
    cy.EditInputElement("FilterQuantity", faker.datatype.number(9999));
    cy.EditInputElement("FilterOther", faker.random.words(1));
    cy.openFlyoutAndSelectRandomValue("Refrigerant Type Code");
    cy.EditInputElement("Electrical1", faker.random.words(1));
    cy.EditInputElement("Electrical2", faker.random.words(1));
    cy.EditInputElement("Electrical3", faker.random.words(1));
    cy.EditInputElement("Steam", faker.random.words(1));
    cy.EditInputElement("ColdWater", faker.random.words(1));
    cy.EditInputElement("HotWater", faker.random.words(1));
    cy.EditInputElement("Sewer", faker.random.words(1));
    cy.EditInputElement("FreshAir", faker.random.words(1));
    cy.EditInputElement("Gas", faker.random.words(1));
    cy.EditInputElement("CompressedAir", faker.random.words(1));
    cy.EditInputElement("Vacuum", faker.random.words(1));
    cy.EditInputElement("Supplies", faker.random.words(1));
    cy.editTextarea("Service Precautions", faker.random.words(5));
    cy.editTextarea("Service Interruption Area", faker.random.words(5));

    cy.contains("Motor").click();
    cy.get("#toolbarAddMotor").click();
    cy.EditInputElement("TagNumber", faker.datatype.number(999999));
    cy.EditInputElement("Description", faker.random.words(1));
    cy.EditInputElement("Rpm", faker.random.words(1));
    cy.EditInputElement("Hp", faker.datatype.number(99999));
    cy.EditInputElement("ModelNumber", faker.datatype.number(99999));
    cy.EditInputElement("SerialNumber", faker.datatype.number(9999));
    cy.fillNumericTextBox(0, faker.datatype.number(999));
    cy.fillCombobox("Manufacturer", 1);
    cy.EditInputElement("Amperage", faker.datatype.number(99));
    cy.EditInputElement("Voltage", faker.datatype.number(99));
    cy.EditInputElement("FrameSize", faker.datatype.number(99));
    cy.EditInputElement("Phase", faker.datatype.number(99));
    cy.EditInputElement("BearingSize", faker.datatype.number(99));
    cy.EditInputElement("Lubricant", faker.datatype.number(99));
    cy.getButtonWithText("Save").click();

    cy.contains("Contractor").click();
    cy.get("#toolbarAddContractor").click();
    cy.get("#divItems").click().wait(1000);
    cy.get("a[name='Search']").should("be.visible").click();
    cy.selectRandomCheckBoxFromGrid(
      1,
      "/html/body/pageslide[1]/div/div/div/div[2]/form/div/div[3]/div/div/div/div/div/div[2]/table/tbody/tr[1]/td[1]/input"
    );
    cy.getButtonWithText("Add Selected").click();

    cy.contains("Meters").click();
    cy.get("#toolbarAddMeter").click();
    cy.EditInputElement("Name", faker.random.words(1));
    cy.EditInputElement("Description", faker.random.words(2));
    cy.fillNumericTextBox(0, faker.datatype.number(9999));
    cy.fillNumericTextBox(1, faker.datatype.number(9999));
    cy.fillNumericTextBox(2, faker.datatype.number(9999));
    cy.fillNumericTextBox(3, faker.datatype.number(9999));
    cy.openFlyoutAndSelectRandomValue("Technician Code");
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
    cy.getButtonWithText("Add Selected").click();

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
    cy.fillCheckbox("Rentable");
    cy.fillCheckbox("Smoking");
    cy.fillNumericTextBox(8, faker.datatype.number(99999));
    cy.fillNumericTextBox(9, faker.datatype.number(999));

    cy.contains("Checkout").click();
    cy.get("#toolbarAddItem").click();
    cy.openFlyoutAndSelectRandomValue("Technician");
    cy.get(
      "input[aria-label='Time Out'][k-options='dateTimeCtrl.dateOptions']"
    ).type(faker.date.future().toLocaleDateString("en-US"));
    cy.getButtonWithText("Save").click();

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
