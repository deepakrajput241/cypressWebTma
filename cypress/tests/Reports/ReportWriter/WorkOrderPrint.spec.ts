import { faker } from "@faker-js/faker";

it("Print Work Order", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/WorkOrder");
  cy.get("span[ng-bind='WindowTitle']:contains('Work Order')").should(
    "be.visible"
  );
  cy.wait(500);
  cy.get("a[ng-click='panelCtrl.setPane(4)']").click();
  cy.get("a[ng-click='panelCtrl.openPrintOptions(report)']").eq(0).click();
  cy.getButtonWithText("PDF").click();
  cy.getButtonWithText("Excel").click();

  //Email Report
  cy.wait(1000);
  cy.selectRadioBtnById("PrintOptionButton-3").click();
  cy.EditInputElement("EmailTO", "aish.tripund@gmail.com");
  cy.EditInputElement("EmailSubject", "Email Template Testing");
  cy.editTextarea("Email Body", faker.random.words(5));
  cy.getButtonWithText("Send").click();
});
