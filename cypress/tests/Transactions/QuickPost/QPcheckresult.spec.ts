import { faker } from "@faker-js/faker";

it(
  "Create Quick post Check Result with Required fields",
  { tags: "@smoke" },
  () => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/QPCheckResult/Create/Identity");
    cy.fillCombobox("WO #", "FM-1048");
    cy.get("input[aria-label='Technician Code']")
      .eq(0)
      .click()
      .type("101")
      .wait(500)
      .type("{downArrow}{enter}");
    cy.get("input[name='btnCheckResultSearch'][class='k-button']").click();
    cy.get("input[ng-model='dataItem.Value']")
      .eq(0)
      .clear()
      .type(faker.datatype.number(100));
    cy.get("textarea[ng-model='vm.ngModel']")
      .eq(0)
      .clear()
      .type(faker.random.words(5));
    cy.getButton("Save").click();
  }
);
