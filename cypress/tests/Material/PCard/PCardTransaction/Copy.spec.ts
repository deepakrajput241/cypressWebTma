const data = {
  vendor: "3MMM",
  transactionType: "Auto-1",
  card: "d111",
};

it("Copy P-Card Transaction", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/PCardTransaction/Create");
  cy.wait(500);
  cy.getButton("Copy").click();
  cy.fillCombobox("Vendor", 1);
  cy.fillCombobox("Transaction Type", 1);
  cy.fillCombobox("Card #", 1);
  cy.clickAndCheckResponse(
    "Save",
    "POST",
    "/PCardTransaction/Create?copyId=?*",
    200
  );
});
