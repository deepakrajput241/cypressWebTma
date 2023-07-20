const data = {
  departmentName: "Account Centers",
  salesTypeDescription: "Audi",
  requestor: "JL Banks",
  partDescription: "Auto test Description",
};

it("Copy Material Request record", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/MaterialRequest");

  cy.wait(500);
  cy.getButton("Copy").click();
  cy.fillCombobox("Department Name", 1);
  cy.fillCombobox("Sales Type Description", 1);
  cy.clickSaveAndCheckResponse();
});
