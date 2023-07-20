// see ticket E2E-431
describe.skip("validate Post To General Ledger", () => {
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/PostGeneralLedger/Create");
  });

  it("should Post To General Ledger with 'Post To General Ledger' option", () => {
    cy.get("tbody input:first").check();
    cy.intercept("POST", "/PostGeneralLedger/PostToGeneralLedger").as(
      "postRequest"
    );
    cy.get("input[name='PostToGeneralBtn']").click();
    cy.wait("@postRequest").then(({ response }) => {
      expect(response.statusCode).to.eq(200);
      expect(response.body.Success).to.eq(true);
    });
  });

  it("should Post To General Ledger with 'Release for Review' option", () => {
    cy.fillRadio("PostOrReleaseOption", "1");
    cy.get("tbody input:first").check();
    cy.intercept("POST", "/PostGeneralLedger/ReleaseSubledgerBatch").as(
      "releaseRequest"
    );
    cy.get("input[name='ReleaseButton']").click();
    cy.wait("@releaseRequest").then(({ response }) => {
      expect(response.statusCode).to.eq(200);
      // the server doesn't return anything on a successful release
    });
  });
});
