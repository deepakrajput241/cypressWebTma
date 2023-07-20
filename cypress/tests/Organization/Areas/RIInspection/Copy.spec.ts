import { faker } from "@faker-js/faker";

it("Copy RI Inspection", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("#!/RoomInspection/1000/Identity");

  cy.getButton("Copy").click();
  cy.EditInputElement("Description", faker.random.words(2));
  cy.openFlyoutAndSelectRandomValue("Repair Center Code");
  cy.clickSaveAndCheckResponse();
});
