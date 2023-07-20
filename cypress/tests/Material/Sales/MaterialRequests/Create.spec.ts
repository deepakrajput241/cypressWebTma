import { faker } from "@faker-js/faker";

const data = {
  account: "1233214566",
  departmentName: "Cheese Amarillo",
  locationCode: "ADMIN-100",
  partCode: "011001-Auto-W1",
  partDescription: "Auto-Jewelery",
  requestor: "JL Banks",
  salesTypeDescription: "Audi",
  statusDescription: "Closed",
};

function addMaterialRequest() {
  cy.contains("Add Material Request Line").click();
  cy.fillCombobox("Part Code", data.partCode);
  cy.fillInput("Quantity", faker.random.numeric());
  cy.contains("button", "Save").click();
}

function fillRequiredFields() {
  addMaterialRequest();
}

describe("create Material Request", () => {
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/MaterialRequest/Create");
  });

  it("should not create Material Request without required fields", () => {
    // missing Department Name
    fillRequiredFields();
    cy.clearCombobox("Department Name");
    cy.clickSaveAndCheckAlert("Department Name is required\r\n");

    // missing Sales Type Description
    cy.reload();
    fillRequiredFields();
    cy.clearCombobox("Sales Type Description");
    cy.clickSaveAndCheckAlert("Sales Type Description is required\r\n");

    // missing Material Request
    cy.reload();
    cy.fillCombobox("Department Name", data.departmentName);
    cy.fillCombobox("Sales Type Description", data.salesTypeDescription);
    cy.clickSaveAndCheckAlert("At least one material request line is required");
  });

  it(
    "should create Material Request with required fields, and then delete it",
    { tags: "@smoke" },
    () => {
      cy.fillCombobox("Department Name", 1);
      cy.fillCombobox("Sales Type Description", 1);
      cy.get("#toolbarAddMaterialRequestLine").click();
      cy.fillCombobox("Part Code", 1);
      cy.fillNumericTextBox(0, faker.datatype.number(5));
      cy.getButtonWithText("Save").click();
      cy.clickSaveAndCheckResponse();

      cy.clickDeleteAndCheckResponse();
    }
  );

  it.skip("Create Material Request with All fields", () => {
    cy.fillCombobox("Department Name", 1);
    cy.fillCombobox("Sales Type Description", 1);
    cy.fillCombobox("Repair Center Name", 1);
    cy.fillCombobox("Status Description", 1);
    cy.EditInputElement("StatusNote", faker.random.words(1));
    cy.fillCombobox("Account #", 1);
    cy.fillCombobox("Requestor", 1);
    cy.EditInputElement("Email", faker.internet.email());
    cy.EditInputElement("RequestorPhone", faker.phone.number("###-###-####"));
    cy.EditInputElement("ReferenceNumber", faker.datatype.number(99999));
    cy.get("input[aria-label='Required Date']").type(
      faker.date.future().toLocaleDateString("en-US")
    );
    cy.EditInputElement("ShipMethod", faker.random.words(1));
    cy.get("#toolbarAddMaterialRequestLine").click();
    cy.fillCombobox("Part Code", 1);
    cy.fillNumericTextBox(0, faker.datatype.number(5));
    cy.wait(500);
    cy.getButtonWithText("Save").click();
    cy.get("select[aria-label='Ship To Location']").select("Building");
    cy.fillCombobox("Location Code", 1);
    cy.editTextarea("Delivery Notes", faker.random.words(5));
    cy.editTextarea("Comment", faker.random.words(5));
    cy.clickSaveAndCheckResponse();
  });
});
