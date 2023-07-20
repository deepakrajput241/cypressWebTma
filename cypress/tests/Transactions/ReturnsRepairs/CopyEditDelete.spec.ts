describe("Search, Copy, Edit and Delete Return and Repair Record", () => {
  let ID;

  beforeEach("Login to the portal", () => {
    cy.login(Cypress.env("user1"));
  });

  it("Verify Copy Returns And Repairs function. ", () => {
    cy.visit("/#!/ReturnAndRepair");

    cy.wait(500);
    cy.getButton("Copy").click();
    cy.openFlyoutAndSelectRandomValue("Vendor Name");
    cy.openFlyoutAndSelectRandomValue("Type");
    cy.get("#toolbarAddItem").should("be.visible").click();
    cy.openFlyoutAndSelectRandomValue("Tag #");
    cy.getButtonWithText("Save").click();
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "ReturnAndRepair/Create?copyId=?*",
      200
    ).then((id) => {
      ID = id;
    });
  });

  it("Verify Edit Returns And Repairs function. ", () => {
    cy.visit(`/#!/ReturnAndRepair/${ID}`);
    cy.getButton("Edit").click();
    cy.openFlyoutAndSelectRandomValue("Vendor Name");
    cy.get("#toolbarAddItem").should("be.visible").click();
    cy.openFlyoutAndSelectRandomValue("Tag #");
    cy.getButtonWithText("Save").click();
    cy.clickSaveAfterEditAndCheckResponse();
  });

  it("Verify Delete Returns And Repairs function. ", () => {
    cy.visit(`/#!/ReturnAndRepair/${ID}`);
    cy.clickDeleteAndCheckResponse();
  });
});
