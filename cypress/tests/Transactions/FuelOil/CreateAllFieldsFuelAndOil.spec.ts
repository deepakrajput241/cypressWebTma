import { faker } from "@faker-js/faker";

describe("Create Fuel And Oil - negative scenarios, Create and Delete", () => {
  let ID;
  const data = {
    equipment: "111",
    vehicle: "158940A",
    repairCenter: "TMA",
    technician: "cmb",
    supplier: "ABLFNC",
    department: "AIED",
    budgetCode: "WH",
  };

  beforeEach("Login to Web app", () => {
    cy.login(Cypress.env("user1"));
  });

  it("Fuel And Oil - Negative Cases", { tags: "@smoke" }, () => {
    cy.visit("/#!/FuelAndOil/Create");
    cy.openFlyoutAndSelectRandomValue("RC Name");
    cy.clickAndCheckAlert("Save", "Vehicle Tag is required\r\n");

    cy.openFlyoutAndSelectRandomValue("Vehicle Tag");
    cy.get("input[aria-label='RC Name']").eq(0).clear();
    cy.clickAndCheckAlert("Save", "RC Name is required\r\n");
  });

  it("Create Fuel and Oil with Required Fields", { tags: "@smoke" }, () => {
    cy.visit("/#!/FuelAndOil/Create");
    cy.fillCombobox("Item Tag Number", "Auto");
    cy.fillCombobox("Repair Center Name", "Auto repair center");
    cy.clickSaveAndCheckResponse();
  });

  it("Create Fuel and Oil with All Fields", () => {
    cy.visit("/#!/FuelAndOil/Create");
    cy.wait(1000);
    cy.get("select[aria-label='ItemType']").should("be.visible").select(1);
    cy.openFlyoutAndSelectRandomValue("Vehicle Tag");
    cy.openFlyoutAndSelectRandomValue("Fuel Type Description");
    cy.openFlyoutAndSelectRandomValue("RC Name");
    cy.get("input[aria-label='Recipient']").type(faker.random.words(3));
    cy.openFlyoutAndSelectRandomValue("Technician Name");
    cy.openFlyoutAndSelectRandomValue("Supplier");
    cy.openFlyoutAndSelectRandomValue("Department");
    cy.openFlyoutAndSelectRandomValue("Account Charged");
    cy.openFlyoutAndSelectRandomValue("Account Credited");
    cy.openFlyoutAndSelectRandomValue("Budget Code");
    cy.fillNumericTextBox(2, faker.datatype.number(100));
    cy.fillNumericTextBox(3, faker.datatype.number(100));
    cy.fillNumericTextBox(4, faker.datatype.number(100));
    cy.fillNumericTextBox(5, faker.datatype.number(100));
    cy.fillNumericTextBox(6, faker.datatype.number(100));
    cy.fillNumericTextBox(7, faker.datatype.number(100));
    cy.fillNumericTextBox(8, faker.datatype.number(100));
    cy.fillNumericTextBox(9, faker.datatype.number(100));
    cy.fillNumericTextBox(14, faker.datatype.number(100));
    cy.clickAndCheckResponse("Save", "POST", "/FuelAndOil/Create*", 200).then(
      (id) => {
        ID = id;
      }
    );
  });

  it("Delete Fuel and Oil", () => {
    cy.visit(`/#!/FuelAndOil/${ID}`);
    cy.clickDeleteAndCheckResponse();
  });
});
