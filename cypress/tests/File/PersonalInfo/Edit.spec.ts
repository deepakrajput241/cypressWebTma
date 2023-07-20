import { faker } from "@faker-js/faker";

it("should edit Personal Info", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/PersonalInfo");
  // this page takes a while to load
  cy.wait(1000);
  cy.contains("Edit").click();
  cy.editInput("Phone", faker.phone.number("###-###-####"));
  cy.clickSaveAndCheckResponse();
});
