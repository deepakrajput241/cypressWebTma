import { faker } from "@faker-js/faker";

const data = {
  behavior: "Connect As",
  user: "Automation",
  repairCenter: "Auto-01",
};

it("Edit Default SSO User Settings", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/SSOGroupSetting/Create");
  cy.get(".k-grid-content.k-auto-scrollable")
    .find("tr")
    .then((row) => {
      cy.get("span[class='glyphicons glyphicons-edit']")
        .eq(Cypress._.random(1, row.length - 1))
        .click();
    });
  cy.get(".k-formatted-value.k-input.ng-scope").eq(0).clear();
  cy.EditInputElement("Description", faker.random.words(5));
  cy.fillNumericTextBox(0, faker.datatype.number(20));
  cy.getButtonWithText("Save").click();
});
