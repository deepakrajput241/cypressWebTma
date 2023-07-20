import { faker } from "@faker-js/faker";

it("Create new Progress Reports", { tags: "@smoke" }, () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/CJProgressReport/Create/Identity");
  cy.get("input[name='Title']").type(faker.random.numeric(6));
  cy.openFlyoutAndSelectRandomValue("Workflow Code");
  cy.openFlyoutAndSelectRandomValue("Report Type Code");
  cy.get("input[aria-label='Date']")
    .eq(0)
    .type(new Date().toLocaleDateString("en-US"));
  cy.getButton("Save").click();
});
