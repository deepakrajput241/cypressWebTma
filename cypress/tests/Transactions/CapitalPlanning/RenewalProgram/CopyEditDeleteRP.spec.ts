describe("Search, Copy, Edit and Delete a Renewal Program", () => {
  let renewalID;

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
  });

  it("Search for a record on Action menu and Copy", () => {
    cy.visit("/#!/CPRenewalItem/1/Identity");

    cy.getButton("Copy").click();
    cy.openFlyoutAndSelectRandomValue("Location");
    cy.openFlyoutAndSelectRandomValue("WE Type");
    cy.openFlyoutAndSelectRandomValue("Justification");
    cy.openFlyoutAndSelectRandomValue("Priority");
    cy.openFlyoutAndSelectRandomValue("UniFormat 1");
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "CPRenewalItem/Create?copyId=?*",
      200
    ).then((id) => {
      renewalID = id;
    });
    cy.clickDeleteAndCheckResponse();
  });

  it("Edit Renewal Program", () => {
    cy.visit(`/#!/CPRenewalItem/${renewalID}/Identity`);
    cy.getButton("Edit").click();
    cy.openFlyoutAndSelectRandomValue("Location");
    cy.openFlyoutAndSelectRandomValue("WE Type");
    cy.openFlyoutAndSelectRandomValue("Justification");
    cy.openFlyoutAndSelectRandomValue("Priority");
    cy.openFlyoutAndSelectRandomValue("UniFormat 1");
    cy.clickAndCheckResponse("Save", "POST", "CPRenewalItem/Edit?*", 200);
  });

  it("Delete Renewal Program", () => {
    cy.visit(`/#!/CPRenewalItem/${renewalID}/Identity`);
    cy.clickDeleteAndCheckResponse("Delete", "/CPRenewalItem/Delete/*");
  });
});
