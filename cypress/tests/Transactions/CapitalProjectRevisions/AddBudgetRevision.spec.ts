import { faker } from "@faker-js/faker";

it("Create new Budget Revisions Record", { tags: "@smoke" }, () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/CJComponentRevision/Create/Identity");
  cy.get("input[name='Title']").type(faker.random.numeric(7));
  cy.get("select[name='WebTMAWorkflowId']").select(2);
  cy.openFlyoutAndSelectRandomValue("Type Code");
  cy.getButton("Save").click();
});
