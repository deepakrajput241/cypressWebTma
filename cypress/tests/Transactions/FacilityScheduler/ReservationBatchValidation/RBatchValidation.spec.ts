it("Create Batch Validation Record", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/ReservationBatchValidation/Create/Identity");
  cy.getButtonWithText("Reset Criteria").click();
  cy.get("select[ng-model='Settings.SelectedQueryId']").select(
    "No Query Selected"
  );
  cy.getButtonWithText("Save Query").click();
  cy.EditInputElement("Name", "Accepted Status Result");
  cy.getButtonWithText("Save").click();
  cy.getButtonWithText("List Results").click();
  //Select Checkbox
  cy.wait(1500); //Without wait, it will throw error
  cy.get("#General")
    .find("tr")
    .then((row) =>
      cy
        .get("input[ng-model='dataItem.selected']")
        .eq(Cypress._.random(0, row.length - 1))
        .click()
    );
  cy.get("input[name='ValidateBtn']").should("be.visible").click();
  cy.get(".entryTitle:contains('Accept/Reject Reservation')").should(
    "be.visible"
  );
  cy.get("a[aria-label='Accept']").should("be.visible").click();
});
