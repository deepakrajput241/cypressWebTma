import { faker } from "@faker-js/faker";

const data = {
  lockShopCode: "Auto-7",
  keySystem: "AutoSystem",
  description: faker.random.words(3),
  key: "Auto-7-AutoSystem-AutoK",
};

it("Copy Key Interchangeable Core record", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/InterchangeableCore");
  cy.wait(500);
  cy.getButton("Copy").click();
  cy.EditInputElement("Description", data.description);
  cy.clickSaveAndCheckResponse();
});
