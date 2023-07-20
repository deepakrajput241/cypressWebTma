import { faker } from "@faker-js/faker";

it("Edit RI Inspection", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/RoomInspection/Create");
  cy.EditInputElement("Description", faker.random.words(2));
  cy.openFlyoutAndSelectRandomValue("Form Code");
  cy.openFlyoutAndSelectRandomValue("Repair Center Code");
  cy.openFlyoutAndSelectRandomValue("Result Type Code");
  cy.fillDateInput(
    "Inspection Date",
    faker.date.future().toLocaleDateString("en-US")
  );
  cy.clickSaveAndCheckResponse();

  cy.getButton("Edit").click();
  cy.EditInputElement("Description", faker.random.words(2));
  cy.openFlyoutAndSelectRandomValue("Repair Center Code");
  cy.clickSaveAfterEditAndCheckResponse();
});
