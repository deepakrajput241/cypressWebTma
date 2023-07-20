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

it("Copy Sales Order record", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/SalesOrder");

  cy.wait(500);
  cy.getButton("Copy").click();
  cy.EditInputElement("Number", faker.datatype.number(999999999));
  cy.fillCombobox("Repair Center Name", "TMA");
  cy.clickSaveAndCheckResponse();
});
