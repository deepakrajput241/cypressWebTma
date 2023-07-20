describe("Area/Template Mass Update", () => {
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/RIAreaTemplateMassUpdate/Create");
  });

  it("List Results", () => {
    cy.wait(500);
    cy.get(".entryTitle:contains('Query')").should("be.visible");
    cy.getButtonWithText("Reset Criteria").click();
    cy.getButtonWithText("List Results").click();
  });

  it("Save Query", () => {
    cy.wait(500);
    cy.get(".entryTitle:contains('Query')").should("be.visible");
    cy.getButtonWithText("Reset Criteria").click();
    cy.get("select[ng-model='Settings.SelectedQueryId']").select(
      "RI Area Template Mass Update - Default"
    );
    const indexDelete = [1, 1, 1];
    for (var i = 0; i < indexDelete.length; i++) {
      cy.xpath(
        `//ul[@class='k-group k-treeview-lines']//li[${indexDelete[i]}]//a[@title='Delete']`
      ).click();
    }
    cy.get("select[ng-model='Settings.SelectedQueryId']").select(
      "RI Area Template Mass Update - Default"
    );
    cy.wait(500);
    cy.getButtonWithText("Save Query As").click();
    cy.fillCombobox("Repair Center Code", 2);
    cy.get(".entryTitle:contains('Save Query')").should("be.visible");
    cy.get("input[name='Name']")
      .eq(0)
      .click({ force: true })
      .clear()
      .wait(500)
      .type("Area Template Mass Update Query");
    cy.getButtonWithText("Save").click();
    cy.wait(500);
  });

  it("Remove Query", () => {
    cy.wait(500);
    cy.get(".entryTitle:contains('Query')").should("be.visible");
    cy.get("select[ng-model='Settings.SelectedQueryId']")
      .should("be.visible")
      .select("Area Template Mass Update Query");
    cy.get("a[name='DeleteQueryBtn']").click();
  });
});
