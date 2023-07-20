describe("Search, Copy, Edit and Delete a Fuel And Oil", () => {
  let ID;

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
  });

  it("Copy Fuel and Oil Record", () => {
    cy.visit("/#!/FuelAndOil/1000/Identity");

    cy.getButton("Copy").click();
    cy.openFlyoutAndSelectRandomValue("Vehicle Tag");
    cy.openFlyoutAndSelectRandomValue("RC Name");
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "FuelAndOil/Create?copyId=?*",
      200
    ).then((id) => {
      ID = id;
    });
  });

  it("Edit Fuel and Oil Record", () => {
    cy.visit(`/#!/FuelAndOil/${ID}/Identity`);
    cy.getButton("Edit").click();
    cy.openFlyoutAndSelectRandomValue("Vehicle Tag");
    cy.openFlyoutAndSelectRandomValue("RC Name");
    cy.clickSaveAfterEditAndCheckResponse();
  });

  it("Delete Fuel and Oil Record", () => {
    cy.visit(`/#!/FuelAndOil/${ID}/Identity`);
    cy.clickDeleteAndCheckResponse();
  });
});
