import { faker } from "@faker-js/faker";

it("Create new Funding Adjustments", { tags: "@smoke" }, () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/CJFundingRevision/Create/Identity");
  cy.get("select[name='WebTMAWorkflowId']").select(2);
  cy.get("input[name='Title']").type(faker.random.numeric(7));
  cy.openFlyoutAndSelectRandomValue("Type Code");
  cy.getButton("Save").click();
});
