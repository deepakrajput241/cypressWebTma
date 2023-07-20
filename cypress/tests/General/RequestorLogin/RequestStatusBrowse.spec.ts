it("Request Status Browse", () => {
  cy.login(Cypress.env("userRequestor"));
  cy.visit("/#!/RequestStatusBrowse/Index");
  cy.get(".k-icon.k-i-filter").eq(0).click();
  cy.get("input[data-bind='value:filters[0].value']").type("1092");
  cy.get("button[title='Filter']").eq(0).click();
  cy.get(".k-icon.k-i-filter").eq(0).click();
  cy.get("button[title='Clear']").eq(0).click();

  cy.get(".k-icon.k-i-filter").eq(1).click();
  cy.get("input[data-bind='value:filters[0].value']").eq(1).type("FM-2622");
  cy.get("button[title='Filter']").eq(1).click();
  cy.get(".k-icon.k-i-filter").eq(1).click();
  cy.get("button[title='Clear']").eq(1).click();

  cy.get(".k-link").eq(0).click();
  cy.get(".k-link").eq(1).click();
  cy.get(".k-link").eq(2).click();
  cy.get(".k-link").eq(3).click();
  cy.get(".k-link").eq(4).click();
});
