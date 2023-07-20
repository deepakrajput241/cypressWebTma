describe("Create Inspection Browse", () => {
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/GeneralInspectionBrowse/Create");
  });

  it("Inspection Browse - Create new Query", () => {
    cy.get(".entryTitle").contains("Query");
    cy.wait(500);
    cy.get("select[ng-model='Settings.SelectedQueryId']")
      .should("be.visible")
      .select("GeneralInspection Browse - Default");
    cy.wait(1000);
    cy.getButtonWithText("Save Query As").click();
    cy.EditInputElement("Name", "Query 1");
    cy.getButtonWithText("Save").click();
    cy.wait(500);
  });

  it("Inspection Browse - Delete Query", () => {
    cy.get(".entryTitle").contains("Query");
    cy.wait(500);
    cy.get("select[ng-model='Settings.SelectedQueryId']")
      .should("be.visible")
      .select("Query 1");
    cy.get("a[name='DeleteQueryBtn']").should("be.visible").click();
  });

  it("Inspection Browse - List Results", () => {
    cy.get(".entryTitle").contains("Query");
    cy.wait(500);
    cy.getButtonWithText("List Results").click();
  });
});
