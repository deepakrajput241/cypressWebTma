import { faker } from "@faker-js/faker";

describe("edit, copy Notification And Escalation", () => {
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("#!/Notification");
  });

  it("should edit Notification and Escalation", () => {
    cy.contains("Edit").click();
    cy.editTextarea("Append to Email", faker.lorem.words(10));
    cy.clickSaveAndCheckResponse();
  });

  it("should copy Notification and Escalation, and then delete it", () => {
    cy.contains("Copy").click();
    cy.editTextarea("Append to Email", faker.lorem.words(10));
    cy.clickSaveAndCheckResponse();

    cy.clickDeleteAndCheckResponse();
  });
});
