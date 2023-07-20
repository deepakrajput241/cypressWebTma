it("should add UFI Export Data", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/UFIRegenerateOutput/Create");
  cy.fillSelect("Time Span DDL", "Last Year");
  cy.get("a[name='FetchRecord']").click();
  cy.get("tbody input:first").check();
  cy.intercept("POST", "/UFIRegenerateOutput/RegenerateUFI").as("request");
  cy.get("input[name='RegenerateUFIBtn']").click();
  cy.wait("@request").then(({ response }) => {
    expect(response.statusCode).to.eq(200);
    expect(response.body.Success).to.eq(true);
  });
});
