it("should copy Tool Transfer", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("#!/ToolTransfer");
  cy.contains("Copy").click();
  cy.selectCheckBoxFromGrid(
    "/html/body/div[1]/div[3]/div/ui-view/div/form/div/div/div[1]/div/div[6]/div/div/div/tma-data-grid/div/div[2]/table/tbody/tr[1]/td[1]"
  );
  cy.clickSaveAndCheckResponse();
});
