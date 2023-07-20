import { faker } from "@faker-js/faker";

describe("Create Equipment Make/Model", () => {
  const data = { equipmentType: "Tool", manufacturer: "3M" };

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/EquipmentMakeModel/Create");
  });

  it("Equipment Make/Model - Negative Cases", () => {
    cy.EditInputElement("MakeName", faker.random.words(1));
    cy.EditInputElement("ModelNumber", faker.datatype.number(9999999));
    cy.fillCombobox("Equipment Type", "Auto-11");
    cy.clickAndCheckAlert("Save", "Manufacturer is required\r\n");

    cy.fillCombobox("Manufacturer", "3M");
    cy.get("input[aria-label='Equipment Type']").eq(0).clear();
    cy.clickAndCheckAlert("Save", "Equipment Type is required\r\n");

    cy.fillCombobox("Equipment Type", "Auto-11");
    cy.get("input[name='MakeName']").clear();
    cy.clickAndCheckAlert("Save", "Make is required\r\n");

    cy.EditInputElement("MakeName", faker.random.words(1));
    cy.get("input[name='ModelNumber']").clear();
    cy.clickAndCheckAlert("Save", "Model # is required\r\n");

    cy.EditInputElement("ModelNumber", faker.datatype.number(9999999));
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "/EquipmentMakeModel/Create?*",
      200,
      "Error",
      "Repair Centers\r\n\r\nAt least 1 record is required for Repair Center\r\n"
    );
  });

  it(
    "Create Equipment Make/Model with required fields",
    { tags: "@smoke" },
    () => {
      cy.EditInputElement("MakeName", faker.random.words(1));
      cy.EditInputElement("ModelNumber", faker.datatype.number(9999999));
      cy.fillCombobox("Equipment Type", "Auto-11");
      cy.fillCombobox("Manufacturer", "3M");
      cy.selectRepairCenter();
      cy.clickSaveAndCheckResponse();
    }
  );

  it("Create Equipment with All fields", () => {
    cy.EditInputElement("MakeName", faker.random.words(1));
    cy.EditInputElement("ModelNumber", faker.datatype.number(9999999));
    cy.fillCombobox("Equipment Type", "Auto-11");
    cy.fillCombobox("Manufacturer", "3M");
    cy.editTextarea("Description", faker.random.words(5));
    cy.fillNumericTextBox(0, faker.datatype.number(9999));
    cy.fillNumericTextBox(1, faker.datatype.number(9999));
    cy.fillNumericTextBox(2, faker.datatype.number(9999));
    cy.fillNumericTextBox(3, faker.datatype.number(9999));
    cy.get("input[aria-label='In Production']").type(
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.get("input[aria-label='Out Service']").type(
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.get("input[aria-label='In Service']").type(
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.get("input[aria-label='Out Production']").type(
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.openFlyoutAndSelectRandomValue("SOP #");
    cy.openFlyoutAndSelectRandomValue("Regulatory Cat");

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

    cy.contains("Requirement").click();
    cy.get("#toolbarAddRequirement").click();
    cy.fillCombobox("Task", 2);
    cy.fillCombobox("Part", 2);
    cy.getButtonWithText("Save").click();

    cy.clickSaveAndCheckResponse();
  });
});
