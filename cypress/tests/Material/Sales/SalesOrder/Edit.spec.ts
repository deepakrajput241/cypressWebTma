import { faker } from "@faker-js/faker";

const data = {
  departmentName: "Data Center",
  salesTypeDescription: "Audi",
  repairCenterName: "Auxilliary",
  salesPersonId: "120663",
  requestorName: "JL Banks",
  account: "1233214566",
  rateScheduleCode: "10125",
  taxName: "Auto-ADP",
  status: "Re-opened",
  assignedTechnicianCode: "125707",
  partCode: "011001-1223343",
  salesLineType: "Auto test",
  unitMeasure: "Auto-100",
};

it("Edit Sales Order record", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/SalesOrder/Create");
  cy.EditInputElement("Number", faker.datatype.number(999999999));
  cy.fillCombobox("Department Name", "Data Center");
  cy.fillCombobox("Sales Type Description", "SOM");
  cy.fillCombobox("Repair Center Name", "Auxilliary");
  cy.openFlyoutAndSelectRandomValue("Sales Person ID");
  cy.get("#toolbarAddSalesOrderLine").click();
  cy.get(".entryTitle:contains('Sales Order Entry')").should("be.visible");
  cy.clickCheckbox("Taxable");
  cy.get("textarea[aria-label='Comment']").eq(1).type(faker.random.words(5));
  cy.selectValueFromPOpup("Account", 1);
  cy.fillCombobox("Part Code", "1007-Auto-001");
  cy.fillNumericTextBox(4, "1");
  cy.wait(500);
  cy.getButtonWithText("Save").click({ force: true });
  cy.clickSaveAndCheckResponse();

  cy.wait(500);
  cy.getButton("Edit").click();
  cy.EditInputElement("Number", faker.datatype.number(999999999));
  cy.fillCombobox("Repair Center Name", "TMA");
  cy.get("dd input[aria-label='Shipping Info']").clear().type("FedEx");
  cy.clickSaveAfterEditAndCheckResponse();
});
