it("should print IT Equipment record", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/ITEquipment");
  cy.get("span[ng-bind='WindowTitle']:contains('IT Equipment')").should(
    "be.visible"
  );
  cy.wait(2000);
  // this page load seems to need extra time
  cy.contains("a", "Print", { timeout: 6000 }).click();
  // the modal needs time to load
  cy.wait(2000);
  // check for network request
  cy.intercept("GET", "/ReportRender/Render/*").as("request");
  cy.get("a[aria-label='PDF']").should("be.visible").click();
  cy.wait("@request").then(({ response }) => {
    expect(response.statusCode).to.eq(200);
  });
});
