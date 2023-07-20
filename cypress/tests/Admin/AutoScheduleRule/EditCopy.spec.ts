import { faker } from "@faker-js/faker";

describe("edit, copy Auto-Schedule Rule", () => {
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("#!/AutoScheduleRule");
  });

  it("edit Auto-Schedule Rule", () => {
    cy.contains("Edit").click();
    cy.editInput("Description", faker.random.words(3));
    cy.clickSaveAndCheckResponse();
  });

  it("copy Auto-Schedule Rule, and then delete it", () => {
    cy.contains("Copy").click();
    cy.editInput("Description", faker.random.words(3));
    cy.clickSaveAndCheckResponse();

    cy.clickDeleteAndCheckResponse();
  });
});
