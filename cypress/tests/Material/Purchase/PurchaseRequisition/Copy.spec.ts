import { faker } from "@faker-js/faker";

const data = {
  vendorCode: "3MMM",
  departmentCode: "AIED",
  typeCode: "Auto-0",
  requestor: "JL Banks",
  buyerCode: "120663",
  repairCenterCode: "Auto-01",
  projectNumber: "4325",
  taxRateName: "Auto-Tax-01",
  status: "Re-opened",
  accountCredited: "1233214566",
  part: "011001",
  budgetCode: "1020630",
};

it("Copy Requisition Record", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/PurchaseRequisition");
  cy.wait(500);
  cy.getButton("Copy").click();
  cy.fillCombobox("Type Code", 1);
  cy.get("#toolbarAddPurchaseReqItem").click();
  cy.fillCombobox("Speedtype", 1);
  cy.fillCombobox("Part Code", 1);
  cy.fillNumericTextBox(0, faker.datatype.number(10));
  cy.wait(500);
  cy.getButtonWithText("Save").click();
  cy.clickSaveAndCheckResponse();
});
