import { faker } from "@faker-js/faker";

const data = {
  repairCenterName: "Auto-01",
  departmentName: "AIED",
  taxName: "Auto-ADP",
  buyerCode: "120663",
  status: "Re-opened",
  account: "1233214566",
  part: "011001",
  vendorCode: "3MMM",
};

it("Copy a Request For Quote", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/Quote");

  cy.wait(500);
  cy.getButton("Copy").click();
  cy.get("#toolbarAddQuoteItem").click();
  cy.fillCombobox("Account", 2);
  cy.fillCombobox("Part", 2);
  cy.fillNumericTextBox(0, faker.datatype.number(10));
  cy.getButtonWithText("Save").click();
  cy.clickSaveAndCheckResponse();
});
