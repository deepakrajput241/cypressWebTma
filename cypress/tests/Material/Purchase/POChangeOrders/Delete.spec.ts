const data = {
  po: "123123",
  buyer: "120663",
  poChangeStatus: "Re-opened",
  poLine: "1 - 022592031147 (Water)",
  account: "1233214566",
  workOrder: "1001-1001",
};

it("Delete PO Change Order", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/POChangeOrder/Create/Identity");
  cy.fillCombobox("PO #", 1);
  cy.fillCombobox("Buyer", 1);
  cy.get("#toolbarAddItem").click();
  cy.fillCombobox("PO Line#", 2);
  cy.wait(500);
  cy.getButtonWithText("Save").click();
  cy.clickSaveAndCheckResponse();

  cy.clickDeleteAndCheckResponse();
});
