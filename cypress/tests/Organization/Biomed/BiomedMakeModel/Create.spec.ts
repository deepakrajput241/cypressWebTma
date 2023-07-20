import { faker } from "@faker-js/faker";

describe("Create Biomed Make/Model", () => {
  const data = {
    deviceType: "1",
    manufacturer: "3M",
    sop: "Auto_320",
    regulatoryCat: "OSHA",
    woTypeCode: "SR",
  };

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/CeEquipmentMakeModel/Create");
  });

  it("Biomed Make/Model - Negative Cases", () => {
    cy.EditInputElement("MakeName", faker.random.words(1));
    cy.EditInputElement("ModelNumber", faker.datatype.number(100));
    cy.fillCombobox("Device Type", "Auto_47");
    cy.clickAndCheckAlert("Save", "Manufacturer is required\r\n");

    cy.fillCombobox("Manufacturer", "3M");
    cy.get("input[aria-label='Device Type']").eq(0).clear();
    cy.clickAndCheckAlert("Save", "Device Type is required\r\n");

    cy.fillCombobox("Device Type", "Auto_47");
    cy.get("input[name='MakeName']").clear();
    cy.clickAndCheckAlert("Save", "Make Name is required\r\n");

    cy.EditInputElement("MakeName", faker.random.words(1));
    cy.get("input[name='ModelNumber']").clear();
    cy.clickAndCheckAlert("Save", "Model # is required\r\n");

    cy.EditInputElement("ModelNumber", faker.datatype.number(100));
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "/CeEquipmentMakeModel/Create?*",
      200,
      "Error",
      "Repair Centers\r\n\r\nAt least 1 record is required for CeEquipment RepairCenter\r\n"
    );
  });

  it(
    "Create Biomed Make/Model with required fields",
    { tags: "@smoke" },
    () => {
      cy.EditInputElement("MakeName", faker.random.words(1));
      cy.EditInputElement("ModelNumber", faker.datatype.number(100));
      cy.fillCombobox("Device Type", "Auto_47");
      cy.fillCombobox("Manufacturer", "3M");
      cy.selectRepairCenter();
      cy.clickSaveAndCheckResponse();
    }
  );

  it("Create Biomed Make/Model with All fields", () => {
    cy.EditInputElement("MakeName", faker.random.words(1));
    cy.EditInputElement("ModelNumber", faker.datatype.number(9999999));
    cy.fillCombobox("Device Type", "Auto_47");
    cy.fillCombobox("Manufacturer", "3M");
    cy.fillNumericTextBox(0, faker.datatype.number(9999));
    cy.fillNumericTextBox(1, faker.datatype.number(9999));
    cy.fillNumericTextBox(2, faker.datatype.number(12));
    cy.fillNumericTextBox(3, faker.datatype.number(99999));
    cy.fillCheckbox("Service Manual");
    cy.fillCheckbox("Operator Manual");
    cy.EditInputElement("ServiceManualLocation", faker.address.city());
    cy.EditInputElement("OperatorManualLocation", faker.address.city());
    cy.get("input[aria-label='In Production']").type(
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.get("input[aria-label='In Service']").type(
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.get("input[aria-label='Out Production']").type(
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.get("input[aria-label='Out Service']").type(
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.openFlyoutAndSelectRandomValue("SOP #");
    cy.openFlyoutAndSelectRandomValue("Regulatory Cat");
    cy.fillCheckbox("Creates");
    cy.fillCheckbox("Critical Life Support");
    cy.fillCheckbox("Stores");
    cy.fillCheckbox("Transmits");
    cy.fillNumericTextBox(4, faker.datatype.number(99));
    cy.editTextarea("Comments", faker.random.words(5));
    cy.openFlyoutAndSelectRandomValue("Check-In Task");
    cy.openFlyoutAndSelectRandomValue("WO Type Code");
    cy.openFlyoutAndSelectRandomValue("WO Priority");
    cy.fillCheckbox("RF Emitting");
    cy.fillNumericTextBox(5, faker.datatype.number(99999));
    cy.fillNumericTextBox(6, faker.datatype.number(99999));
    cy.fillNumericTextBox(7, faker.datatype.number(99999));
    cy.fillNumericTextBox(8, faker.datatype.number(99999));
    cy.fillNumericTextBox(9, faker.datatype.number(99999));
    cy.fillNumericTextBox(4, faker.datatype.number(99999));
    cy.EditInputElement("Frequency", faker.datatype.number(99));
    cy.selectRepairCenter();

    cy.contains("Risk Factor").click();
    cy.openFlyoutAndSelectRandomValue("Risk Formula");

    cy.contains("PMs").click();
    cy.get("#toolbarAddPM").click();
    cy.fillCombobox("Task Code", 1);
    cy.fillNumericTextBox(0, faker.datatype.number(9999));
    cy.fillCombobox("RC Name", 1);
    cy.fillCombobox("WO Type", 1);
    cy.fillCombobox("Priority Code", 1);
    cy.fillCombobox("Trade", 1);
    cy.fillCombobox("Technician/Crew Code", 1);
    cy.fillCombobox("Department", 1);
    cy.fillCombobox("Account #", 1);
    cy.fillCombobox("Rate Schedule", 1);
    cy.fillCombobox("Warehouse Code", 1);
    cy.fillCheckbox("Charge");
    cy.fillNumericTextBox(1, faker.datatype.number(10));
    cy.EditInputElement("DaysToComplete", faker.datatype.number(99));
    cy.fillNumericTextBox(2, faker.datatype.number(10));
    cy.fillNumericTextBox(3, faker.datatype.number(10));
    cy.get("select[aria-label='Offset Dropdown']").select(2);
    cy.get("select[aria-label='Due Every Drop Down']").select(2);
    cy.get("input[aria-label='Season Start']").type(
      faker.date.recent().toLocaleDateString("en-US")
    );
    cy.get("input[aria-label='Season End']").type(
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.getButtonWithText("Save").click();

    cy.contains("Rates").click();
    cy.get("#toolbarAddRate").click();
    cy.fillCombobox("WO Type Code", 1);
    cy.fillCombobox("Charge Type Code", 1);
    cy.fillNumericTextBox(0, faker.datatype.number(9999));
    cy.getButtonWithText("Save").click();

    cy.contains("Requirement").click();
    cy.get("#toolbarAddRequirement").click();
    cy.fillCombobox("Task", 2);
    cy.fillCombobox("Part", 2);
    cy.getButtonWithText("Save").click();

    cy.clickSaveAndCheckResponse();
  });
});
