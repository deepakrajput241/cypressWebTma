import { faker } from "@faker-js/faker";

const data = {
  lockShopCode: "Auto-7",
  keySystem: "AutoSystem",
  description: faker.random.words(5),
  key: "Auto-7-AutoSystem-AutoK",
};

it("Edit Key Interchangeable Core record", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/InterchangeableCore/Create");
  cy.fillCombobox("Lock Shop", data.lockShopCode);
  cy.fillCombobox("Key System", data.keySystem);
  cy.fillInput("Description", data.description);
  cy.fillCombobox("Key Number", data.key);
  cy.clickSaveAndCheckResponse();

  cy.wait(500);
  cy.getButton("Edit").click();
  cy.EditInputElement("Description", data.description);
  cy.clickSaveAfterEditAndCheckResponse();
});
