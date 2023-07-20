import { faker } from "@faker-js/faker";

describe("Create Biomed Records", () => {
  const data = {
    deviceType: "Bio",
    facilityName: "123",
    building: "Auto_39342",
    departmentName: "Data Center",
    type: "Architect",
    vendor: "3M",
    manufacturerName: "3M",
    attachedToVehicle: "Tag001",
    system: "Producer",
    account: "1111 2222 3333 4444",
    sop: "Auto_320",
    assignedTechnician: "Christian Butler",
    ownerDepartment: "Automation Department",
  };

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/CEEquipment/Create");
  });

  it("Biomed Records - Negative Cases", () => {
    cy.EditInputElement("Name", faker.random.words(2));
    cy.fillCombobox("Facility Name", "Automation Facility");
    cy.clickAndCheckAlert(
      "Save",
      "Device Type is required\r\nDevice Name is required\r\n"
    );

    cy.fillCombobox("Device Type", "Auto_47");
    cy.get("input[aria-label='Facility Name']").eq(0).clear();
    cy.clickAndCheckAlert("Save", "Facility Name is required\r\n");

    cy.fillCombobox("Facility Name", "Automation Facility");
    cy.get("input[name='Name']").clear();
    cy.fillCombobox("Device Type", "Auto_47");
    cy.clickAndCheckAlert("Save", "Make is required\r\n");

    cy.EditInputElement("Name", faker.random.words(2));
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "/CEEquipment/Create?*",
      200,
      "Error",
      "Repair Centers\r\n\r\nAt least 1 record is required for Repair Centers\r\n"
    );
  });

  it("Create Biomed Record with required fields", { tags: "@smoke" }, () => {
    cy.EditInputElement("Name", faker.datatype.number(9999999));
    cy.fillCombobox("Device Type", "Auto_47");
    cy.fillCombobox("Facility Name", "Automation Facility");
    cy.selectRepairCenter();
    cy.clickSaveAndCheckResponse();
  });

  it("Create Biomed Record with All fields", () => {
    cy.EditInputElement("Name", faker.datatype.number(9999999));
    cy.openFlyoutAndSelectRandomValue("Device Type");
    cy.EditInputElement("ModelNumber", faker.datatype.number(999999));
    cy.EditInputElement("SerialNumber", faker.datatype.number(999999));
    cy.openFlyoutAndSelectRandomValue("Location ID");
    cy.get("input[aria-label='Facility Name']")
      .eq(0)
      .type("Facility Name")
      .wait(500)
      .type("{downArrow}{enter}");
    cy.openFlyoutAndSelectRandomValue("Building Name");
    cy.openFlyoutAndSelectRandomValue("Department Name");
    cy.fillNumericTextBox(0, faker.datatype.number(10));
    cy.openFlyoutAndSelectRandomValue("Type");
    cy.openFlyoutAndSelectRandomValue("Status");
    cy.EditInputElement("StatusNote", faker.random.words(1));
    cy.openFlyoutAndSelectRandomValue("Vendor");
    cy.openFlyoutAndSelectRandomValue("Manufacturer Name");
    cy.openFlyoutAndSelectRandomValue("System");
    cy.openFlyoutAndSelectRandomValue("Parent Control ID");
    cy.openFlyoutAndSelectRandomValue("Account");
    cy.fillCheckbox("Critical Alarms");
    cy.fillCheckbox("BMP");
    cy.fillCheckbox("Leased(Y/N)");
    cy.openFlyoutAndSelectRandomValue("Lock-out #");
    cy.openFlyoutAndSelectRandomValue("SOP #");
    cy.openFlyoutAndSelectRandomValue("Assigned Technician");
    cy.openFlyoutAndSelectRandomValue("Regulatory Category");
    cy.EditInputElement("Longitude", faker.address.longitude());
    cy.EditInputElement("Latitude", faker.address.latitude());
    cy.openFlyoutAndSelectRandomValue("Service Cont #");
    // cy.openFlyoutAndSelectRandomValue("Owner's Department");
    cy.EditInputElement("PropertyId", faker.datatype.number(9999999));
    cy.EditInputElement("SiteNumber", faker.datatype.number(9999999));
    cy.EditInputElement("SiteNumber", faker.datatype.number(9999999));
    cy.EditInputElement("SubLocation", faker.address.city());
    cy.EditInputElement("GISUniqueId", "11111111-1212-1212-1212-111111111111");
    cy.get("input[aria-label='Base PM Date']").type(
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.get("input[aria-label='Date Purchased']").type(
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.get("input[aria-label='Warranty Date']").type(
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.get("input[aria-label='Registered Date']").type(
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.get("input[aria-label='Lease Expires']").type(
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.EditInputElement("LeaseNumber", faker.datatype.number(999999));
    cy.editTextarea("Popup Message", faker.random.words(5));
    cy.editTextarea("Comments", faker.random.words(5));
    cy.selectRepairCenter();

    cy.contains("Misc").click();
    cy.get("input[aria-label='Last Inv. Date']").type(
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.get("input[aria-label='Condition at Inventory']").type(
      faker.random.words(1)
    );
    cy.EditInputElement("LastInventoryLocation", faker.random.words(1));
    cy.EditInputElement("OriginalPONumber", faker.datatype.number(999999));
    cy.openFlyoutAndSelectRandomValue("Inv. Technician");
    cy.fillCheckbox("Not Located");
    cy.get("input[aria-label='Not Located Date']").type(
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.fillCheckbox("Creates");
    cy.fillCheckbox("Critical Life Support");
    cy.fillCheckbox("Stores");
    cy.fillCheckbox("Transmits");
    cy.EditInputElement("HippaFrequency", faker.datatype.number(999999));
    cy.editTextarea("HIPAA Comments", faker.random.words(5));
    cy.EditInputElement("SoftwareVersion", faker.datatype.number(999));
    cy.EditInputElement("IPAddress", faker.internet.ipv4());
    cy.EditInputElement("PortNumber", faker.internet.port());
    cy.fillCheckbox("RF Emitting");
    cy.EditInputElement("Frequency", faker.datatype.number(99999));
    cy.fillNumericTextBox(0, faker.datatype.number(9999));
    cy.fillNumericTextBox(1, faker.datatype.number(9999));
    cy.fillNumericTextBox(2, faker.datatype.number(9999));
    cy.fillNumericTextBox(3, faker.datatype.number(9999));
    cy.fillNumericTextBox(4, faker.datatype.number(24));
    cy.fillNumericTextBox(5, faker.datatype.number(9999));

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

    cy.contains("Monitored Condition").click();
    cy.get("#toolbarAddCondition").click();
    cy.selectRandomCheckBoxFromGrid(
      1,
      "/html/body/pageslide[1]/div/div/div/div[2]/form/div/div/div/div[2]/table/tbody/tr[1]/td[1]/input"
    );
    cy.getButtonWithText("Add Selected").eq(0).click();

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
    cy.fillNumericTextBox(0, `${faker.datatype.number(10)}`);
    cy.fillNumericTextBox(1, `${faker.datatype.number(10)}`);
    cy.get("input[aria-label='Next PM Date']").type(
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.fillNumericTextBox(2, `${faker.datatype.number(10)}`);
    cy.get("select[aria-label='Recurrence']").select(2);
    cy.getButtonWithText("Save").click();

    cy.contains("Rates").click();
    cy.openFlyoutAndSelectRandomValue("Account");
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
    cy.EditInputElement("UsageUnit", faker.random.words(1));

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

    cy.contains("IT Security").click();
    cy.fillCheckbox("Wired");
    cy.fillCheckbox("DHCP");
    cy.fillCheckbox("IT Tagged");
    cy.fillCheckbox("Wireless");
    cy.EditInputElement("WiredIP", faker.internet.ipv4());
    cy.EditInputElement("WirelessIP", faker.internet.ipv4());
    cy.EditInputElement("Hostname", faker.random.words(1));
    cy.openFlyoutAndSelectRandomValue("Login Type");
    cy.openFlyoutAndSelectRandomValue("Supply Type");
    cy.EditInputElement("CyberRanking", faker.datatype.number(999));
    cy.EditInputElement("AeTitle", faker.random.words(1));
    cy.EditInputElement("WiredMAC", faker.internet.ipv4());
    cy.EditInputElement("WirelessMAC", faker.internet.ipv4());
    cy.openFlyoutAndSelectRandomValue("SSID");
    cy.openFlyoutAndSelectRandomValue("Operating System");
    cy.EditInputElement("Port", faker.internet.port());
    cy.EditInputElement("SecurityCategory", faker.random.words(1));
    cy.EditInputElement("ISEProfile", faker.random.words(1));
    cy.fillCheckbox("Antivirus Installed");
    cy.fillCheckbox("Encrypted");
    cy.fillCheckbox("Physical Computer");
    cy.fillCheckbox("Certificate Capable");
    cy.fillCheckbox("MDS Available");
    cy.fillCheckbox("Domain Joined");
    cy.fillCheckbox("Embedded Device");
    cy.fillCheckbox("Patch Exemption");
    cy.fillCheckbox("Mobile Device");
    cy.editTextarea("Risk Mitigation and Special Notes", faker.random.words(5));
    cy.clickSaveAndCheckResponse();
  });
});
