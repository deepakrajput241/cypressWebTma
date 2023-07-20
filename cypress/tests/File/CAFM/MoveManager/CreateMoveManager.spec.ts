it("Create Move Manager Record", () => {
  const data = {
    moveNumber: "Move1001",
    managerCode: "125707",
    requestor: "Johnathon Boyer",
  };

  cy.login(Cypress.env("user1"));
  cy.visit("/#!/MoveManager/Create/Identity");
  cy.EditInputElement("Number", data.moveNumber);
  cy.get("input[aria-label='Move Manager Code']")
    .eq(0)
    .clear()
    .type(data.managerCode)
    .wait(500)
    .type("{downArrow}{enter}");
  cy.get("input[aria-label='Request Date']")
    .eq(0)
    .type(new Date().toLocaleDateString("en-US"));
  cy.get("input[aria-label='Requestor']")
    .eq(0)
    .clear()
    .type(data.requestor)
    .wait(500)
    .type("{downArrow}{enter}");
  cy.getButton("Save").click();
});
