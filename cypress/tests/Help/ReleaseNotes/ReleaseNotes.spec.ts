it("Navigates to release notes", () => {
  cy.login(Cypress.env("user1"));
  cy.visit(
    "/help/Content/A_Introduction%20Topics/What's%20New.htm?cshid=ReleaseNotes"
  );
  cy.contains("What's New").should("exist");
});
