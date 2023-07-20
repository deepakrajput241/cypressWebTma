import { faker } from "@faker-js/faker";

it("Delete Requisition Record", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/PurchaseRequisition/Create");
  cy.fillCombobox("Type Code", 1);
  cy.get("#toolbarAddPurchaseReqItem").click();
  cy.fillCombobox("Speedtype", 1);
  cy.fillCombobox("Part Code", 1);
  cy.fillNumericTextBox(0, faker.datatype.number(10));
  cy.wait(500);
  cy.getButtonWithText("Save").click();

  cy.clickSaveAndCheckResponse();

  cy.wait(500);
  cy.clickDeleteAndCheckResponse();
});
