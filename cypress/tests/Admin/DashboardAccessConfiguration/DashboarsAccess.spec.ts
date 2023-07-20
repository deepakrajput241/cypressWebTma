it("Edit Dashboard Access", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("#!/MyPageConfig");

  cy.wait(500);
  cy.getButton("Edit").click();
  cy.get("a[id='toolbarAddUser']").click();
  cy.wait(1000);
  cy.selectRandomCheckBoxFromGrid(
    2,
    "/html/body/pageslide[1]/div/div/div/div[2]/form/div/div/div/div[2]/table/tbody/tr[1]/td[1]/input"
  );
  cy.getButtonWithText("Add Selected").click();
  cy.clickSaveAfterEditAndCheckResponse();
});
