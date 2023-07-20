import { faker } from "@faker-js/faker";

it("Delete Contract", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/Contract/Create/Identity");
  cy.EditInputElement("Number", faker.datatype.number(99999999));
  cy.get("input[aria-label='Start Date']")
    .should("be.visible")
    .type(new Date().toLocaleDateString("en-US"));
  cy.get("input[aria-label='End Date']").type(
    faker.date.future().toLocaleDateString("en-US")
  );
  cy.clickSaveAndCheckResponse();

  cy.clickDeleteAndCheckResponse();
});
