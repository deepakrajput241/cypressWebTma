describe("Search, Copy, Edit and Delete a Audit", () => {
  let auditId;

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
  });

  it("Search for a record on Action menu and Copy", () => {
    cy.visit("/#!/CPAudit");

    cy.getButton("Copy").click();
    cy.openFlyoutAndSelectRandomValue("Facility");
    cy.openFlyoutAndSelectRandomValue("Condition");
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "CPAudit/Create?copyId=?*",
      200
    ).then((id) => {
      auditId = id;
    });
  });

  it("Edit Audit Record", () => {
    cy.visit(`/#!/CPAudit/${auditId}/Identity`);
    cy.getButton("Edit").click();
    cy.openFlyoutAndSelectRandomValue("Facility");
    cy.openFlyoutAndSelectRandomValue("Condition");
    cy.clickSaveAfterEditAndCheckResponse();
  });

  it("Delete Audit Record", () => {
    cy.visit(`/#!/CPAudit/${auditId}/Identity`);
    cy.clickDeleteAndCheckResponse();
  });
});
