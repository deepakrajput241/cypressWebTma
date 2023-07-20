import { faker } from "@faker-js/faker";

it("Create new Meeting Minute Record", { tags: "@smoke" }, () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/CJMeeting/Create/Identity");
  cy.get("input[name='Title']").type(faker.random.numeric(6));
  cy.openFlyoutAndSelectRandomValue("Type Code");
  cy.getButton("Save").click();
});
