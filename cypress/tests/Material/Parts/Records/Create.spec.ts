import { faker } from "@faker-js/faker";

describe("Create Part Record", () => {
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/Part/Create");
  });

  it("Part - Negative Cases", () => {
    cy.EditInputElement("Code", faker.datatype.number(9999999));
    cy.EditInputElement("Description", faker.random.words(2));
    cy.openFlyoutAndSelectRandomValue("Issue Unit");
    cy.openFlyoutAndSelectRandomValue("Order Unit");
    cy.fillNumericTextBox(1, faker.datatype.number({ min: 1, max: 10 }));
    cy.get("input[aria-label='What is a Part ?']").type(faker.random.words(2));
    cy.get("input[aria-label='2nd MFG']").type(faker.random.words(2));
    cy.clickAndCheckAlert("Save", "Type is required\r\n");

    cy.openFlyoutAndSelectRandomValue("Type");
    cy.get("input[aria-label='Issue Unit']").eq(0).clear();
    cy.clickAndCheckAlert("Save", "Issue Unit is required\r\n");

    cy.openFlyoutAndSelectRandomValue("Issue Unit");
    cy.get("input[aria-label='Order Unit']").eq(0).clear();
    cy.clickAndCheckAlert("Save", "Order Unit is required\r\n");

    cy.openFlyoutAndSelectRandomValue("Order Unit");
    cy.get("input[name='Code']").clear();
    cy.clickAndCheckAlert("Save", "Code is required\r\n");

    cy.EditInputElement("Code", faker.datatype.number(9999999));
    cy.get("input[name='Description']").clear();
    cy.clickAndCheckAlert("Save", "Description is required\r\n");

    cy.EditInputElement("Description", faker.random.words(2));
    cy.get(".k-formatted-value.k-input.ng-scope").eq(1).clear();
    cy.clickAndCheckAlert("Save", "Unit Qty is required\r\n");

    cy.fillNumericTextBox(1, faker.datatype.number({ min: 1, max: 10 }));
    cy.get("input[aria-label='What is a Part ?']").clear();
    cy.clickAndCheckAlert("Save", "What is a Part ? is required\r\n");

    cy.get("input[aria-label='What is a Part ?']").type(faker.random.words(2));
    cy.get("input[aria-label='2nd MFG']").clear();
    cy.clickAndCheckAlert("Save", "2nd MFG is required\r\n");
  });

  it("Create Part record with required field", { tags: "@smoke" }, () => {
    cy.EditInputElement("Code", faker.datatype.number(9999999));
    cy.EditInputElement("Description", faker.random.words(2));
    cy.openFlyoutAndSelectRandomValue("Type");
    cy.openFlyoutAndSelectRandomValue("Issue Unit");
    cy.openFlyoutAndSelectRandomValue("Order Unit");
    cy.fillNumericTextBox(1, faker.datatype.number({ min: 1, max: 10 }));
    cy.get("input[aria-label='What is a Part ?']").type(faker.random.words(2));
    cy.get("input[aria-label='2nd MFG']").type(faker.random.words(2));
    cy.clickSaveAndCheckResponse();
  });

  it("Create Part record with All fields", () => {
    cy.EditInputElement("Code", faker.datatype.number(9999999));
    cy.EditInputElement("Description", faker.random.words(2));
    cy.openFlyoutAndSelectRandomValue("Type");
    cy.EditInputElement("SICCode", faker.datatype.number(9999));
    cy.EditInputElement("AlternateCode", faker.datatype.number(99999));
    cy.EditInputElement("KeyNoun", faker.random.words(1));
    cy.fillNumericTextBox(0, faker.datatype.number(9999));
    cy.fillCheckbox("Serialized");
    cy.fillCheckbox("Supply Item");
    cy.fillCheckbox("Exclude from Purchase");
    cy.fillCheckbox("Exclude from Requestor");
    cy.fillCheckbox("Kit");
    cy.fillCheckbox("Hazardous");
    cy.fillCheckbox("CFC");
    cy.fillCheckbox("Tax Sales");
    cy.fillCheckbox("Tax Purchases");
    cy.openFlyoutAndSelectRandomValue("Issue Unit");
    cy.openFlyoutAndSelectRandomValue("Order Unit");
    cy.fillNumericTextBox(1, faker.datatype.number({ min: 1, max: 10 }));
    cy.get("input[aria-label='What is a Part ?']").type(faker.random.words(2));
    cy.get("input[aria-label='2nd MFG']").type(faker.random.words(2));
    cy.openFlyoutAndSelectRandomValue("Manufacturer");
    cy.EditInputElement("ManufacturerNumber", faker.datatype.number(99999));
    cy.EditInputElement("ModelNumber", faker.datatype.number(99999));
    cy.get("input[aria-label='Date In']").type(
      new Date().toLocaleDateString("en-US")
    );
    cy.get("input[aria-label='Shelf Life']").type(
      new Date().toLocaleDateString("en-US")
    );
    cy.fillNumericTextBox(2, faker.datatype.number(9999));
    cy.EditInputElement("WeightUnit", faker.datatype.number(99));
    cy.fillNumericTextBox(3, faker.datatype.number(9999));
    cy.fillNumericTextBox(4, faker.datatype.number(9999));
    cy.fillNumericTextBox(5, faker.datatype.number(9999));
    cy.editTextarea("Specifications", faker.random.words(5));

    cy.contains("Locations").click();
    cy.get("#toolbarAddLocation").click();
    cy.fillCombobox("Warehouse Code", 1);
    cy.fillCombobox("Technician Code", 1);
    cy.getButtonWithText("Save").click();

    cy.contains("Supplier").click();
    cy.get("#toolbarAddSupplier").click();
    cy.fillCombobox("Supplier Code", 1);
    cy.getButtonWithText("Save").click();

    cy.contains("Alternate").click().click();
    cy.get("#toolbarAddAlternate").click().wait(1000);
    cy.selectRandomCheckBoxFromGrid(
      1,
      "/html/body/pageslide[1]/div/div/div/div[2]/form/div/div[3]/div/div/div/div/div/div[2]/table/tbody/tr[1]/td[1]/input"
    );
    cy.getButtonWithText("Add Selected").click();

    cy.contains("Xref").click().click();
    cy.get("#toolbarAddItem").click();
    cy.selectRandomCheckBoxFromGrid(
      1,
      "/html/body/pageslide[1]/div/div/div/div[2]/form/div/div[3]/div/div/div/div/div/div[2]/table/tbody/tr[1]/td[1]/input"
    );
    cy.getButtonWithText("Add Selected").click();

    cy.clickSaveAndCheckResponse();
  });
});
