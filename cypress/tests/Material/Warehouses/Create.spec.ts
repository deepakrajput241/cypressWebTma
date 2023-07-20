import { faker } from "@faker-js/faker";

const data = {
  account: "1233214566",
  shipLocationType: "Region",
  billLocationType: "Region",
  regionCode: "A10803",
  repairCenter: "Auto-01",
  deliveryInstructions: "Region",
};

describe("Warehouses creation", () => {
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/Warehouse/Create");
  });

  it("Test Negative cases", { tags: "@smoke" }, () => {
    cy.get("span[ng-bind='WindowTitle']:contains('Warehouses')").should(
      "be.visible"
    );
    cy.wait(1000);
    cy.clickAndCheckAlert("Save", "Code is required\r\nName is required\r\n");

    //Without Code
    cy.EditInputElement("Name", faker.random.words(2));
    cy.clickAndCheckAlert("Save", "Code is required\r\n");

    //Without Name
    cy.get("input[name='Name']").clear();
    cy.EditInputElement("Code", faker.datatype.number(9999999));
    cy.clickAndCheckAlert("Save", "Name is required\r\n");
  });

  it("Verify User can create New WareHouse with full information", () => {
    cy.EditInputElement("Code", faker.datatype.number(9999999));
    cy.EditInputElement("Name", faker.random.words(2));
    cy.EditInputElement("Address1", faker.address.streetAddress());
    cy.EditInputElement("Address2", faker.address.secondaryAddress());
    cy.EditInputElement("City", faker.address.city());
    cy.EditInputElement("State", faker.address.stateAbbr());
    cy.EditInputElement("Phone", faker.phone.number("###-###-####"));
    cy.EditInputElement("Fax", faker.phone.number("###-###-####"));
    cy.fillNumericTextBox(0, faker.datatype.number(9999));
    cy.EditInputElement("ManagerName", faker.random.words(3));
    cy.EditInputElement("Email", faker.internet.email());
    cy.fillCombobox("Account #", "1234567890");
    cy.get("select[aria-label='Ship To Type Dropdown List']").select(
      data.shipLocationType
    );
    cy.editTextarea("Delivery Instructions", data.deliveryInstructions);
    cy.get("select[aria-label='Bill To Type']").select(data.billLocationType);
    cy.selectRepairCenter();
    cy.get("[buttonname='Save']").trigger("mouseover").click({ force: true });
  });

  it("Create Warehouse with Required fields", { tags: "@smoke" }, () => {
    cy.EditInputElement("Code", faker.datatype.number(9999999));
    cy.EditInputElement("Name", faker.random.words(2));
    cy.selectRepairCenter();
    cy.clickAndCheckResponse("Save", "POST", "/Warehouse/Create?*", 200);
  });
});
