describe("Create Total View", () => {
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/TotalView/Index");
  });

  it("Create Total View", () => {
    cy.get(".k-icon.k-i-expand").eq(0).click();
    cy.get(".k-icon.k-i-expand").eq(1).click();
    cy.get("a[ng-href='#!/Facility/1012']").click();
  });

  it("Click On Brent", () => {
    cy.get("a[ng-href='#!/Facility/1006']").click();
  });

  it("Click On DSOB", () => {
    cy.get("a[ng-href='#!/Facility/1013']").should("be.visible").click();
  });

  it("Click On SaaS Facility", () => {
    cy.get("a[ng-href='#!/Facility/1008']").should("be.visible").click();
  });

  it("Click On TMA", () => {
    cy.get("a[ng-href='#!/Facility/1003']").should("be.visible").click();
  });
});
