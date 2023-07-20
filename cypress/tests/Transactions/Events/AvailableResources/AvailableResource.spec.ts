it("Search Event Resource", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/AvailableRooms/Create/Identity");
  cy.get("select[name='ItemCategoryTypeId']").select("Building");
  cy.fillCombobox("Item Type", "127623579");
  cy.get("a[name='SetQueryBtn']").click();
  cy.get("span[ng-bind='dataItem.TagNumber']")
    .eq(0)
    .invoke("text")
    .then((text) => expect(text).to.equal("Auto_45734"));
});
