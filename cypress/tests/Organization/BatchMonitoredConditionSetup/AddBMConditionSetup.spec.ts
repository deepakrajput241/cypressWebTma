function SelectValueFromGrid() {
  for (var i = 0; i <= 2; i++) {
    cy.xpath("//*[@id='itemSelection']/div[2]")
      .find("tr")
      .then((row) => {
        cy.log(row.length);
        cy.xpath(
          `//*[@id="itemSelection"]/div[2]/table/tbody/tr[${Cypress._.random(
            0,
            row.length
          )}]/td[1]`
        ).click();
      });
  }
}

it("Create Batch Monitored Condition Setup Record", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/BatchCMSetup/Create");
  cy.get("#toolbarAddItem").should("be.visible").click();
  SelectValueFromGrid();
  cy.getButtonWithText("Add Selected").click();
  cy.getButton("Save").click();
});
