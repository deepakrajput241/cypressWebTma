import { faker } from "@faker-js/faker";

const data = {
  vendorCode: "3MMM",
  typeCode: "Auto-0",
  account: "1233214566",
  part: "011001",
};

it("Copy Purchase Order", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/PurchaseOrder");
  cy.wait(500);
  cy.getButton("Copy").click();
  cy.openFlyoutAndSelectRandomValue("Vendor Code");
  cy.openFlyoutAndSelectRandomValue("Type Code");
  cy.get("#toolbarAddPurchaseOrderItem").click();
  cy.openFlyoutAndSelectRandomValue("Account");
  cy.openFlyoutAndSelectRandomValue("Part");
  cy.fillNumericTextBox(2, faker.datatype.number(10));
  cy.get("textarea[aria-label='Comment']").eq(1).type(faker.random.words(5));
  cy.getButtonWithText("Save").click();

  cy.clickSaveAndCheckResponse();
});
