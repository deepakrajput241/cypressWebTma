it("Create new Building Condition Browse", () => {
  cy.login(Cypress.env("user1"));

  cy.visit("/#!/CPBuildingCondition/Create/Identity");
  cy.wait(1000); // without wait it will throw error
  cy.getButtonWithText("Reset Criteria").click();
  cy.wait(1000); // without wait it will throw error
  cy.get(".k-input")
    .eq(1)
    .clear()
    .type("District Wide")
    .wait(500)
    .should("exist")
    .type("{downArrow}")
    .type("{enter}");
  cy.get(".k-input")
    .eq(2)
    .clear({ force: true })
    .click()
    .type("School District")
    .wait(1000)
    .type("{downArrow}")
    .type("{enter}");
  cy.get(".k-input")
    .eq(3)
    .clear({ force: true })
    .click()
    .type("Administration Building")
    .wait(1000)
    .type("{downArrow}")
    .type("{enter}");
  cy.getButtonWithText("List Results").click();
  cy.wait(1000);
  cy.get("input[ng-model='dataItem.selected']")
    .eq(0)
    .should("be.visible")
    .click();
});
