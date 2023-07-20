import { faker } from "@faker-js/faker";

describe("Create a Quick Post Other Charge", () => {
  const data = {
    workOrderNo: "123-123",
    supplier: "ABLFNC",
  };

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/QPOtherCharge/Create/Identity");
  });

  it(
    "Create Quick Post Other Charges with Required fields",
    { tags: "@smoke" },
    () => {
      cy.openFlyoutAndSelectRandomValue("Work Order #");
      cy.EditInputElement("Product", "Auto Test");
      cy.fillInput("Quantity", "1");
      cy.fillInput("UnitCost", "2");
      cy.getButtonWithText("Save").click();
      cy.getButton("Save").click();
    }
  );

  it("Create Quick Post Other Charges with All fields", () => {
    cy.openFlyoutAndSelectRandomValue("Work Order #");
    cy.EditInputElement("Product", "Auto Test");
    cy.EditInputElement("FreeTagNumber", faker.datatype.number(1000));
    cy.EditInputElement("Product", faker.commerce.product());
    cy.openFlyoutAndSelectRandomValue("Charge Type Desc");
    cy.get("select[aria-label='Unit']").select(1);
    cy.fillInput("Quantity", "1");
    cy.fillInput("Unit Cost", "2");
    cy.openFlyoutAndSelectRandomValue("Account #");
    cy.openFlyoutAndSelectRandomValue("Supplier");
    cy.EditInputElement("PONumber", faker.datatype.number(1000));
    cy.EditInputElement("InvoiceNumber", faker.datatype.number(1000));
    cy.get(
      "input[aria-label='Finish Date'][k-options='dateTimeCtrl.dateOptions']"
    ).type(faker.date.future().toLocaleDateString("en-US"));
    cy.get(
      "input[aria-label='Completion Date'][k-options='dateTimeCtrl.dateOptions']"
    ).type(faker.date.future().toLocaleDateString("en-US"));
    cy.fillCheckbox("Work Not Done");
    cy.fillCheckbox("Not Located");
    cy.fillCheckbox("Failed PM");
    cy.editTextarea("Other Charge Comment", faker.random.words(5));
    cy.editTextarea("General Comment", faker.random.words(5));
    cy.getButtonWithText("Save").click();
    cy.getButton("Save").click();
  });
});
