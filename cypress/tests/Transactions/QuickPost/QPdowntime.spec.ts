import { faker } from "@faker-js/faker";

it("Create Quick Post Down Time with All fields", { tags: "@smoke" }, () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/QPDownTime/Create");
  cy.get("select[aria-label = 'Item Type']").select("Biomed").wait(2000);
  cy.getButtonWithText("Cancel").click();
  cy.get("#toolbarAddDownTime").should("be.visible").click();
  cy.get("select[aria-label = 'Item Type']").select("Biomed").wait(2000);
  cy.fillCombobox("Item Tag Number", 1);
  cy.fillCombobox("Down Time Type", 1);
  cy.get(
    "input[aria-label='Down Time'][k-options='dateTimeCtrl.dateOptions']"
  ).type(faker.date.future().toLocaleDateString("en-US"));
  cy.get(
    "input[aria-label='Actual Up Time'][k-options='dateTimeCtrl.dateOptions']"
  ).type(faker.date.future().toLocaleDateString("en-US"));
  cy.getButtonWithText("Save").click();
  cy.getButton("Save").click();
});
