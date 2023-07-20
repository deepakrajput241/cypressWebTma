describe("Validate RI Review Assignments", () => {
  const data = { repairCenter: "FAC" };

  function selectCheckbox() {
    cy.get("input[ng-model='dataItem.selected']").should("be.visible");
    cy.get(".k-grid-content.k-auto-scrollable")
      .find("tr")
      .then((row) => {
        cy.get("input[ng-model='dataItem.selected']")
          .eq(Cypress._.random(1, row.length))
          .click();
      });
  }

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/RoomInspectionReviewAssignments/Create/Identity");
  });

  it("Remove Inspector", () => {
    cy.fillCombobox("Repair Center", data.repairCenter);
    cy.get("#Actions-1").click();
    selectCheckbox();
    cy.get("div[ng-bind='actionItem.Langstring']").click();
  });

  it("Replace Inspector", () => {
    cy.fillCombobox("Repair Center", data.repairCenter);
    cy.get("#Actions-2").click();
    selectCheckbox();
    cy.fillCombobox("New Inspector", 1);
    cy.get("div[ng-bind='actionItem.Langstring']").click();
  });

  it("Add Inspector", () => {
    cy.fillCombobox("Repair Center", data.repairCenter);
    cy.get("#Actions-3").click();
    selectCheckbox();
    cy.fillCombobox("New Inspector", 1);
    cy.get("div[ng-bind='actionItem.Langstring']").click();
  });
});
