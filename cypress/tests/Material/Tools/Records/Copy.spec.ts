import { faker } from "@faker-js/faker";

it("should copy Tool, and then delete it", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("#!/Tool");
  cy.contains("Copy").click();
  cy.editInput("Tag #", faker.random.numeric(5));
  cy.clickSaveAndCheckResponse();

  cy.clickDeleteAndCheckResponse();
});
