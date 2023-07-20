import { faker } from "@faker-js/faker";

it("should edit UFI Segment", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/UFISegment");
  cy.contains("Edit").click();
  // we don't want to edit the first segment as it is used in other tests
  cy.get("tbody a").eq(8).click();
  cy.editInput("Segment Name", faker.lorem.word());
  cy.contains("button", "Save").click();
  cy.clickSaveAndCheckResponse();
});
