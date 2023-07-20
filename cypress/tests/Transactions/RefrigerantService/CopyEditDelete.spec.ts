describe("Search, Copy, Edit and Delete a Refrigerant Service", () => {
  let ID;

  beforeEach("Login to Web app", () => {
    cy.login(Cypress.env("user1"));
  });

  it("Create Refrigerant service", () => {
    cy.visit("/#!/RefrigerantService/Create/Identity");
    //Creating new record because in Copy it is throwing error.
    cy.fillCombobox("Technician Code", "Auto_01");
    cy.fillCombobox("Equipment Tag Number", "Auto");
    cy.fillCombobox("Refrigerant Tag Number", "R-101");
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "RefrigerantService/Create?*",
      200
    ).then((id) => {
      ID = id;
    });
  });

  it("Edit Refrigerant service", () => {
    cy.visit(`/#!/RefrigerantService/${ID}/Identity`);
    cy.get(
      "span[ng-bind='WindowTitle']:contains('Refrigerant Service')"
    ).should("be.visible");
    cy.getButton("Edit").click();
    cy.openFlyoutAndSelectRandomValue("Technician Code");
    cy.openFlyoutAndSelectRandomValue("Equipment Tag Number");
    cy.openFlyoutAndSelectRandomValue("Cylinder Tag");
    cy.clickSaveAfterEditAndCheckResponse();
  });

  it("Delete Refrigerant service", () => {
    cy.visit(`/#!/RefrigerantService/${ID}/Identity`);
    cy.clickDeleteAndCheckResponse();
  });
});
