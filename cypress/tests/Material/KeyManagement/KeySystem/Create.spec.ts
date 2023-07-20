import { faker } from "@faker-js/faker";

it("Create Lock Shop with require field", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/KeySystem/Create");
  cy.EditInputElement("Code", faker.datatype.number(100));
  cy.EditInputElement("Description", faker.random.words(1));
  cy.fillCombobox("Lock Shop", "Auto-7");
  cy.get("a[id='toolbarAddLevelRow']").click();
  cy.EditInputElement("Symbol", faker.datatype.number(10));
  cy.getButtonWithText("Save").click();
  cy.clickSaveAndCheckResponse();
});
