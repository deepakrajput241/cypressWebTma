describe("Create a Event Browser", () => {
  const data = {
    name: "Event Browser",
    repairCenter: "FAC",
  };

  beforeEach("Login to Web app", () => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/EventBrowse/Create/Identity");
  });

  it("Create Event Browser", () => {
    cy.getButtonWithText("Reset Criteria").click();
    cy.get("select[ng-model='Settings.SelectedQueryId']").select(
      "No Query Selected"
    );
    cy.getButtonWithText("Save Query").click();
    cy.fillInput("Query Name", "Event Browser");
    cy.fillCombobox("Repair Center Code", "1");
    cy.getButtonWithText("Save").click();
    cy.fillCombobox("Event Code", "Auto");
    cy.getButtonWithText("List Results").click();
  });

  it("Delete Added Query", () => {
    cy.getButtonWithText("Reset Criteria").click();
    cy.wait(1000);
    cy.get("select[ng-model='Settings.SelectedQueryId']").select(
      "Event Browser"
    );
    cy.get("a[name='DeleteQueryBtn']").click().wait(1000);
  });
});
