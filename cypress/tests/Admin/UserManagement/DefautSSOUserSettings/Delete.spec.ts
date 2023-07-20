import { faker } from "@faker-js/faker";

const data = {
  behavior: "Connect As",
  user: "Automation",
  repairCenter: "Auto-01",
};

it("Delete Repair center for Batch Management RC", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/SSOGroupSetting/Create");
  cy.get("a[id='toolbarAddColumn']").click();
  cy.EditInputElement("Description", faker.random.words(5));
  cy.EditInputElement("GroupName", faker.random.words(5));
  cy.openFlyoutAndSelectRandomValue("User");
  cy.getButtonWithText("Save").click();

  cy.get(".k-grid-content.k-auto-scrollable")
    .find("tr")
    .then((row) => {
      cy.get("span[class='glyphicons glyphicons-bin']")
        .eq(Cypress._.random(1, row.length - 1))
        .click();
    });
});
