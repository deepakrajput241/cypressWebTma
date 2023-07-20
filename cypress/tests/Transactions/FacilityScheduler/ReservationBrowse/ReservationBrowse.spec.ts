describe("Validate Reservation Browse", () => {
  const data = {
    queryName: "Accepted Status Result",
  };
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/ReservationRequestBrowse/Create/Identity");
  });

  it("Validate the List Result", () => {
    cy.wait(1000);
    cy.getButtonWithText("Reset Criteria").click();
    cy.get("select[ng-model='dataItem.searchOperatorId']")
      .eq(0)
      .select("this year");
    cy.getButtonWithText("List Results").click();
  });

  it("Create New Qeury, Saved it and Validate the Result", () => {
    cy.wait(500);
    cy.getButtonWithText("Reset Criteria").click();
    cy.get("select[ng-model='Settings.SelectedQueryId']").select(
      "No Query Selected"
    );
    cy.get("select[ng-model='dataItem.searchOperatorId']")
      .eq(0)
      .select("this year");
    cy.get("select[ng-model='dataItem.searchOperatorId']")
      .eq(0)
      .select("last year");
    cy.get("select[ng-model='dataItem.searchCriteriaValue']").select(
      "Accepted"
    );
    cy.getButtonWithText("Save Query").click();
    cy.EditInputElement("Name", "Accepted Status Result");
    cy.getButtonWithText("Save").click();
    cy.getButtonWithText("List Results").click();
    cy.get(".k-grid-content.k-auto-scrollable")
      .find("tr")
      .then((data) => {
        cy.wait(1000);
        cy.get("span[ng-bind='dataItem.Status']")
          .eq(Cypress._.random(0, data.length - 1))
          .should("have.text", "Accepted");
      });
  });

  it("Delete Query", () => {
    cy.get("select[ng-model='Settings.SelectedQueryId']").select(
      "Accepted Status Result"
    );
    cy.get(".glyphicons.glyphicons-bin").eq(0).click();
  });
});
