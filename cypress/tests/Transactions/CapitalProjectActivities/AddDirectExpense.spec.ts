import { faker } from "@faker-js/faker";

it("Create new Direct Expense Record", { tags: ["@smoke"] }, () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/CJDirectExpense/Create");
  cy.openFlyoutAndSelectRandomValue("Workflow Code");
  cy.get("input[name='Title']").type(faker.random.numeric(5));
  cy.openFlyoutAndSelectRandomValue("Expense Type");
  cy.getButton("Save").click();
});
