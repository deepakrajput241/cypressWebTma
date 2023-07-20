import { faker } from "@faker-js/faker";
// see ticket E2E-432
describe.skip("edit, copy UFI Template Assignment", () => {
  beforeEach(() => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/UFITemplateAssignment");
  });

  it("should edit UFI Template Assignment", () => {
    cy.contains("Edit").click();
    cy.editInput("File Name Format", faker.lorem.slug(2));
    cy.clickSaveAndCheckResponse();
  });

  it("should copy UFI Template Assignment, and then delete it", () => {
    cy.contains("Copy").click();
    cy.fillSelect("Transaction Type", "Fuel & Oil");
    cy.clickSaveAndCheckResponse();

    cy.clickDeleteAndCheckResponse();
  });
});
