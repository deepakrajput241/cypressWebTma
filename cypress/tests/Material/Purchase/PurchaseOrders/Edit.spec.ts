import { faker } from "@faker-js/faker";

const data = {
  vendorCode: "3MMM",
  typeCode: "Auto-0",
  account: "1233214566",
  part: "011001",
};

it("Edit Purchase order", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/PurchaseOrder/Create/Identity");
  cy.openFlyoutAndSelectRandomValue("Vendor Code");
  cy.openFlyoutAndSelectRandomValue("Type Code");
  cy.get("#toolbarAddPurchaseOrderItem").click();
  cy.openFlyoutAndSelectRandomValue("Account");
  cy.openFlyoutAndSelectRandomValue("Part");
  cy.fillNumericTextBox(2, faker.datatype.number(10));
  cy.get("textarea[aria-label='Comment']").eq(1).type(faker.random.words(5));
  cy.getButtonWithText("Save").click();
  cy.clickSaveAndCheckResponse();

  cy.wait(500);
  cy.getButton("Edit").click();
  cy.openFlyoutAndSelectRandomValue("Vendor Code");
  cy.openFlyoutAndSelectRandomValue("Type Code");
  cy.clickSaveAfterEditAndCheckResponse();
});
