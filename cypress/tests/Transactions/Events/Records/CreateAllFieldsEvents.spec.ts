import { faker } from "@faker-js/faker";

describe("Create Event - negative scenarios, Create and Delete", () => {
  let ID;

  const data = {
    typeDescription: "Rally",
    department: "ALTED",
    requestor:
      "5th Health Glendale mesh Analy Mouse Borders male Northwest Frozen",
    equipmentType: "BLDG",
    vehicleType: "CEAT",
    assetType: "GD",
    entityType: "Fountain",
    areaType: "ACH",
    floorType: "FLR",
    buildingType: "ACAD",
    deviceType: "Bio",
    itEquipmentType: "Desktop",
    repairCenter: "FAC",
  };

  beforeEach("Login to Web app", () => {
    cy.login(Cypress.env("user1"));
  });

  it("Events - Negative Case", { tags: "@smoke" }, () => {
    cy.visit("/#!/Event/Create");
    cy.openFlyoutAndSelectRandomValue("Type Description");
    cy.EditInputElement("Code", faker.datatype.number(99999999));
    cy.EditInputElement("Name", faker.name.firstName());
    cy.get(
      "input[aria-label='End Date'][k-options='dateTimeCtrl.dateOptions']"
    ).type(faker.date.future().toLocaleDateString("en-US"));
    cy.clickAndCheckAlert("Save", "Start Date is required\r\n");

    cy.get("tmadatetime[name='StartDate'] input")
      .eq(0)
      .clear()
      .type(faker.date.recent().toLocaleDateString("en-US"));
    cy.get("input[aria-label='Type Description']").eq(0).clear();
    cy.clickAndCheckAlert("Save", "Type Description is required\r\n");

    cy.openFlyoutAndSelectRandomValue("Type Description");
    cy.get("input[name='Code']").clear();
    cy.clickAndCheckAlert("Save", "Event Code is required\r\n");
  });

  it("Create Event with Required Field", { tags: "@smoke" }, () => {
    cy.visit("/#!/Event/Create");
    cy.EditInputElement("Code", faker.datatype.number(99999999));
    cy.fillCombobox("Event Type Description", "Concert");
    cy.get("tmadatetime[name='StartDate'] input")
      .eq(0)
      .type(faker.date.recent().toLocaleDateString("en-US"));
    cy.EditInputElement("Name", faker.name.findName());
    cy.get("tmadatetime[name='EndDate'] input")
      .eq(0)
      .type(faker.date.future().toLocaleDateString("en-US"));
    cy.selectRepairCenter();
    cy.contains("a", "Identity").click();
    cy.clickSaveAndCheckResponse();
  });

  it("Create Event with All Field", () => {
    cy.visit("/#!/Event/Create");
    cy.EditInputElement("Code", faker.datatype.number(99999999));
    cy.openFlyoutAndSelectRandomValue("Type Description");
    cy.get("tmadatetime[name='StartDate'] input")
      .eq(0)
      .type(faker.date.recent().toLocaleDateString("en-US"));
    cy.EditInputElement("Name", faker.name.firstName());
    cy.get("tmadatetime[name='EndDate'] input")
      .eq(0)
      .type(faker.date.future().toLocaleDateString("en-US"));
    cy.EditInputElement("StatusNote", faker.random.words(2));
    cy.editTextarea("Event Description", faker.random.words(5));
    cy.openFlyoutAndSelectRandomValue("Department");
    cy.EditInputElement("PrimaryContact", faker.name.firstName());
    cy.EditInputElement(
      "PrimaryContactPhone",
      faker.phone.number("###-###-####")
    );
    cy.EditInputElement("PrimaryContactFax", faker.datatype.number(1000));
    cy.EditInputElement("EmailAddress", faker.internet.email());
    cy.openFlyoutAndSelectRandomValue("Budget Account #");
    cy.EditInputElement("SecondaryContact", faker.name.firstName());
    cy.EditInputElement(
      "SecondaryContactPhone",
      faker.phone.number("###-###-####")
    );
    cy.EditInputElement("SecondaryContactFax", faker.datatype.number(1000));
    cy.openFlyoutAndSelectRandomValue("Requestor Name");
    cy.editTextarea("Comment", faker.random.words(5));

    cy.selectRepairCenter();

    cy.contains("Resources").click();
    cy.get("#toolbarAddResource").should("be.visible").click();
    cy.fillDateInput(
      "End Date",
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.get("select[aria-label='Item Dropdown List']").select(1);
    cy.get("input[name='GenericTypeCode_input']")
      .eq(0)
      .should("be.visible")
      .clear()
      .type("Auto-11")
      .wait(1000)
      .type("{downArrow}")
      .type("{enter}");
    cy.fillNumericTextBox(0, 1);
    cy.fillNumericTextBox(2, faker.datatype.number(1000));
    cy.editTextarea("Comments", faker.random.words(5));
    cy.fillCheckbox("Recurrence");
    cy.EditInputElement("DayOccurrences", faker.datatype.number(100));
    cy.fillNumericTextBox(3, faker.datatype.number(1000));
    cy.getButtonWithText("Save").click();
    cy.contains("Attendants").click();
    cy.fillCheckbox("Paper Service");
    cy.fillCheckbox("Purchase Paper Tablecloths");
    cy.fillCheckbox("Linen Required");
    cy.fillCheckbox("China Required");
    cy.EditInputElement("LinenType", faker.datatype.number(1000));
    cy.fillNumericTextBox(0, faker.datatype.number(1000));
    cy.fillNumericTextBox(1, faker.datatype.number(1000));
    cy.editTextarea("Menu Requirements", faker.random.words(5));
    cy.fillCheckbox("Attendants Requested / Required");
    cy.fillCheckbox("Bar Setup Required");
    cy.fillCheckbox("Waiter/Waitress");
    cy.fillCheckbox("Bartender");
    cy.fillCheckbox("Beer and/or Wine Requested");
    cy.fillCheckbox("White");
    cy.fillCheckbox("Red");
    cy.fillNumericTextBox(2, faker.datatype.number(1000));
    cy.fillNumericTextBox(3, faker.datatype.number(1000));
    cy.EditInputElement("WineType", faker.datatype.number(1000));
    cy.EditInputElement("BeerType", faker.datatype.number(1000));
    cy.contains("Setup & Food").click();
    cy.fillCheckbox("Coat Racks Required?");
    cy.fillNumericTextBox(0, faker.datatype.number(100));
    cy.fillCheckbox("Portable Chalkboards Required?");
    cy.fillNumericTextBox(1, faker.datatype.number(100));
    cy.fillNumericTextBox(2, faker.datatype.number(100));
    cy.fillCheckbox("Rectangular");
    cy.fillCheckbox("Round");
    cy.fillNumericTextBox(3, faker.datatype.number(100));
    cy.fillNumericTextBox(4, faker.datatype.number(100));
    cy.fillNumericTextBox(5, faker.datatype.number(100));
    cy.editTextarea("Other Requirements", faker.random.words(5));
    cy.selectRadioBtnById("FoodServiceType-0");
    cy.selectRadioBtnById("MealServiceType-2");
    cy.fillCheckbox("Internal Catering");
    cy.fillNumericTextBox(6, faker.datatype.number(100));
    cy.fillNumericTextBox(7, faker.datatype.number(100));
    cy.EditInputElement("FoodCaterer", faker.random.words(1));
    cy.get(
      "input[aria-label='Setup Date'][k-options='dateTimeCtrl.dateOptions']"
    ).type(faker.date.future().toLocaleDateString("en-US"));
    cy.get(
      "input[aria-label='Service Date'][k-options='dateTimeCtrl.dateOptions']"
    ).type(faker.date.future().toLocaleDateString("en-US"));
    //Floral & Electrical
    cy.contains("Floral & Electrical").click();
    cy.fillCheckbox("Bud Vases");
    cy.fillCheckbox("Podium Basket");
    cy.fillCheckbox("Table Centerpieces");
    cy.fillCheckbox("Buffet Table Centerpieces");
    cy.EditInputElement("FlowerPreference", faker.datatype.number(1000));
    cy.fillCheckbox("Additional Security Required");
    cy.fillNumericTextBox(0, faker.datatype.number(100));
    cy.fillCheckbox("110V Required?");
    cy.fillCheckbox("220V Required?");
    cy.fillCheckbox("Extension Cord Required?");
    cy.fillNumericTextBox(1, faker.datatype.number(100));
    cy.fillNumericTextBox(2, faker.datatype.number(100));
    cy.fillNumericTextBox(3, faker.datatype.number(100));
    cy.fillNumericTextBox(4, faker.datatype.number(100));
    cy.contains("Budget").click();
    cy.get("th[data-title='Work Order #']").should("be.visible").click();
    cy.fillNumericTextBox(1, faker.datatype.number(100));
    cy.fillNumericTextBox(2, faker.datatype.number(100));
    cy.fillNumericTextBox(3, faker.datatype.number(100));
    cy.fillNumericTextBox(4, faker.datatype.number(100));
    cy.fillNumericTextBox(5, faker.datatype.number(100));
    cy.fillNumericTextBox(6, faker.datatype.number(100));
    cy.fillNumericTextBox(7, faker.datatype.number(100));
    cy.clickAndCheckResponse("Save", "POST", "/Event/Create*", 200).then(
      (id) => {
        ID = id;
      }
    );
  });

  it("Delete Event Record", () => {
    cy.visit(`/#!/Event/${ID}`);
    cy.clickDeleteAndCheckResponse();
  });
});
