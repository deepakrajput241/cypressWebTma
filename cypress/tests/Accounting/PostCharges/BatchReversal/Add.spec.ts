// see ticket E2E-430
it.skip("should add Batch Reversal Record", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/BatchReversal/Create");
  cy.get("tbody input:first").click();
  // what we wanted here was cy.clickAndCheckResponse but the "Reverse" button caused issues so we reproduced the command below
  cy.intercept("POST", "/BatchReversal/BatchReverse").as("request");
  cy.get("[name='BatchReverseBtn']").click();
  cy.wait("@request").then(({ response }) => {
    expect(response.statusCode).to.eq(200);
    expect(response.body.Success).to.eq(true);
  });
});
