it("Create record with required fields for Training Taken", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/TrainingTaken/Create/Identity");
  cy.fillCombobox("Class Code", "0108");
  cy.wait(1000);
  cy.get("select[aria-label='Trainer']").should("be.visible").select(1);
  cy.get("input[aria-label='Technician Code']")
    .eq(0)
    .type("519713")
    .wait(500)
    .type("{enter}");
  cy.getButton("Save").click();
});
