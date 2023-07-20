it("Validate Inspection Check In, Check Out", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/WorkOrder");
  cy.get("span[ng-bind='WindowTitle']:contains('Work Order')").should(
    "be.visible"
  );
  cy.get("input[placeholder='Fast Find - Search']")
    .clear()
    .wait(500)
    .type("FM-12380")
    .wait(500);
  cy.get("#btnFastFind").click().wait(1000);
  cy.get("li[total-items='panelCtrl.navService.totalRecords']").eq(0).click();
  cy.get("a[name='GenInspectionSheetLink']").click();

  cy.get(".entryTitle:contains('Inspection')").should("be.visible");
  cy.xpath(
    "//*[@id='divContentEntryPanel1']/div/div[1]/div/div[2]/ul/li[1]/a"
  ).then(($body) => {
    if ($body.text().includes("Check In")) {
      cy.get("button[ng-click='checkIn()']").click();
    } else {
      cy.get("button[ng-click='checkOut()']").click();
    }
  });
});
