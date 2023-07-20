describe("Create a Custodial Labor Estimate", () => {
  const data = {
    districtName: "District Name",
  };
  beforeEach("Login to Web app", () => {
    cy.login(Cypress.env("user1"));
  });

  it("Create Custodial Labor Estimate with required fields", () => {
    cy.visit("/#!/CDLaborEstimate/Create/Identity");
    cy.fillCombobox("District Name", "District Name");

    cy.get("input[class='k-button']").eq(0).click();
  });
});
