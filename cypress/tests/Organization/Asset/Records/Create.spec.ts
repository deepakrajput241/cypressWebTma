import { faker } from "@faker-js/faker";

describe("Create New Asset Records", () => {
  const data = {
    locationId: "ADMIN-100A",
    department: "Data Center",
    accountCode: "1111 2222 3333 4444",
    typeDesc: "Auto Account",
    vendorName: "3M",
    manufacturer: "3M",
    parentTag: "100",
    attachedToVehicle: "303039E",
    inventoryTechnician: "101",
    assignedTech: "Christopher Fairbanks",
  };

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/Asset/Create");
  });

  it("Asset Records - Negative Cases", () => {
    //Without Facility
    cy.EditInputElement("Description", faker.random.words(1));
    cy.openFlyoutAndSelectRandomValue("Type Description");
    cy.clickAndCheckAlert("Save", "Facility Name is required\r\n");

    //Without Type Description
    cy.openFlyoutAndSelectRandomValue("Facility Name");
    cy.get("input[aria-label='Type Description']").eq(0).clear();
    cy.clickAndCheckAlert("Save", "Type Description is required\r\n");

    //Without Description
    cy.openFlyoutAndSelectRandomValue("Type Description");
    cy.get("input[name='Description']").clear();
    cy.clickAndCheckAlert("Save", "Description is required\r\n");
  });

  it("Create Asset Record with required fields", { tags: "@smoke" }, () => {
    cy.EditInputElement("Description", faker.random.words(2));
    cy.openFlyoutAndSelectRandomValue("Facility Name");
    cy.openFlyoutAndSelectRandomValue("Type Description");
    cy.selectRepairCenter();
    cy.clickSaveAndCheckResponse();
  });

  it("Create Asset Record With All Fields", () => {
    cy.EditInputElement("Description", faker.random.words(2));
    cy.openFlyoutAndSelectRandomValue("Location ID");
    cy.openFlyoutAndSelectRandomValue("Type Description");
    cy.openFlyoutAndSelectRandomValue("Vendor Name");
    cy.openFlyoutAndSelectRandomValue("Manufacturer");
    cy.openFlyoutAndSelectRandomValue("Department");
    cy.openFlyoutAndSelectRandomValue("Account Code");
    cy.EditInputElement("ModelNumber", `Model${faker.datatype.number(100)}`);
    cy.EditInputElement("SerialNumber", faker.datatype.number(100));
    cy.EditInputElement("AdditionalDescription1", faker.random.words(3));
    cy.EditInputElement("AdditionalDescription2", faker.random.words(3));
    cy.EditInputElement("AltTagNumber", `Tag${faker.datatype.number(100)}`);
    cy.openFlyoutAndSelectRandomValue("Inventory Technician");
    cy.openFlyoutAndSelectRandomValue("Assigned Tech");
    cy.EditInputElement("Longitude", faker.datatype.number(100));
    cy.fillDateInput(
      "Warranty Expires",
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.get("input[aria-label='Registered Date']").type(
      new Date().toLocaleDateString("en-US")
    );
    cy.fillDateInput(
      "Inventory Date",
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.EditInputElement("AssignedTo", faker.random.words(1));
    cy.EditInputElement("LastInventoryLocation", faker.random.words(1));
    cy.openFlyoutAndSelectRandomValue("Condition at Inventory");
    cy.fillNumericTextBox(0, faker.datatype.number(100));
    cy.EditInputElement("SubLocation", faker.random.words(1));
    cy.EditInputElement("GISUniqueId", "11111111-1212-1212-1212-111111111111");
    cy.EditInputElement("Latitude", faker.datatype.number(100));
    cy.EditInputElement("Height", faker.datatype.number(100));
    cy.EditInputElement("Width", faker.datatype.number(100));
    cy.EditInputElement("Depth", faker.datatype.number(100));
    cy.EditInputElement("Finish", faker.datatype.number(100));
    cy.EditInputElement("Color", "White");
    cy.EditInputElement("SeatMaterial", faker.datatype.number(100));
    cy.EditInputElement("SeatColor", faker.color.rgb());
    cy.EditInputElement("SeatTrim", faker.datatype.number(100));
    cy.fillNumericTextBox(1, faker.datatype.number(100));
    cy.EditInputElement("SurfaceMaterial", faker.datatype.number(100));
    cy.EditInputElement("Trim", faker.datatype.number(100));
    cy.fillNumericTextBox(2, faker.datatype.number(100));
    cy.fillDateInput(
      "Purchased",
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.fillNumericTextBox(3, faker.datatype.number(100));
    cy.EditInputElement("ArtistName", faker.datatype.number(100));
    cy.EditInputElement("ArtType", faker.datatype.number(100));
    cy.fillCheckbox("Caster");
    cy.fillCheckbox("Swivel Chair");
    cy.fillCheckbox("Tilt Chair");
    cy.fillCheckbox("Arms");
    cy.EditInputElement("BackMaterial", faker.datatype.number(100));
    cy.EditInputElement("BackColor", "Black");
    cy.EditInputElement("BackTrim", faker.datatype.number(100));
    cy.EditInputElement("PrintNumber", faker.datatype.number(100));
    cy.EditInputElement("ArtHeight", faker.datatype.number(100));
    cy.EditInputElement("ArtWidth", faker.datatype.number(100));
    cy.EditInputElement("ArtDepth", faker.datatype.number(100));
    cy.EditInputElement("BaseColor", "Green");
    cy.EditInputElement("BaseTrim", faker.datatype.number(100));
    cy.EditInputElement("BaseType", faker.datatype.number(100));
    cy.editTextarea("Comment", faker.random.words(10));
    cy.editTextarea("Popup Message", faker.random.words(10));
    cy.selectRepairCenter();

    cy.contains("Meters").click();
    cy.get("#toolbarAddMeter").click();
    cy.EditInputElement("Name", `Auto${faker.datatype.number(100)}`);
    cy.EditInputElement("Description", faker.random.words(2));
    cy.fillNumericTextBox(0, faker.datatype.number(100));
    cy.fillNumericTextBox(1, faker.datatype.number(100));
    cy.fillNumericTextBox(2, faker.datatype.number(100));
    cy.fillNumericTextBox(3, faker.datatype.number(100));
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
    cy.fillDateInput(
      "Next PM Date",
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
    cy.get("a[ng-click='saveSelection()']").eq(0).click();

    cy.contains("Rates").click();
    cy.openFlyoutAndSelectRandomValue("Account");
    cy.fillNumericTextBox(0, faker.datatype.number(99999));
    cy.fillNumericTextBox(1, faker.datatype.number(99999));
    cy.fillNumericTextBox(2, faker.datatype.number(99999));
    cy.fillNumericTextBox(3, faker.datatype.number(99999));
    cy.fillNumericTextBox(4, faker.datatype.number(99999));
    cy.fillNumericTextBox(5, faker.datatype.number(99999));
    cy.fillNumericTextBox(6, faker.datatype.number(99999));
    cy.fillNumericTextBox(7, faker.datatype.number(99999));
    cy.fillNumericTextBox(8, faker.datatype.number(99999));
    cy.fillNumericTextBox(9, faker.datatype.number(99999));
    cy.fillCheckbox("Rentable");
    cy.fillCheckbox("Smoking");
    cy.EditInputElement("UsageUnit", `Unit${faker.datatype.number(99999)}`);

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
    cy.EditInputElement("CurrentJob", faker.random.words(1));
    cy.fillDateInput(
      "Time Out",
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.fillDateInput(
      "Time Due",
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.fillDateInput(
      "Time In",
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.getButtonWithText("Save").click();

    cy.clickSaveAndCheckResponse();
  });
});
