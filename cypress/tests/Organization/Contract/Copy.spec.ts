import { faker } from "@faker-js/faker";

it("Copy Contract", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/Contract/1153/Identity");

  cy.wait(500);
  cy.getButton("Copy").click();
  cy.EditInputElement("Number", faker.datatype.number(99999999));
  cy.get("input[aria-label='Start Date']")
    .should("be.visible")
    .type(new Date().toLocaleDateString("en-US"));
  cy.get("input[aria-label='End Date']").type(
    faker.date.future().toLocaleDateString("en-US")
  );
  cy.clickSaveAndCheckResponse();
});
