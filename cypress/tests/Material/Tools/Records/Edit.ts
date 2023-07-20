import { faker } from "@faker-js/faker";

it("should edit Tool", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("#!/Tool");
  cy.contains("Edit").click;
  cy.editInput("Tag #", faker.random.numeric(5));
  cy.clickSaveAfterEditAndCheckResponse();
});
