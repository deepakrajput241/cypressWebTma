import { faker } from "@faker-js/faker";

function clickOnAddItem() {
  cy.get("#toolbarAddGroupItem").should("be.visible").click();
  cy.wait(1000);
  for (var i = 1; i <= 2; i++) {
    cy.get(".k-grid-content.k-auto-scrollable")
      .find("tr")
      .then((row) =>
        cy
          .xpath(
            `//*[@id="itemSelection"]/div[2]/table/tbody/tr[${Cypress._.random(
              0,
              row.length - 1
            )}]/td[1]`
          )
          .click()
      );
  }
  cy.getButtonWithText("Add Selected").click();
}

it("Delete Group Record", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/Group/Create");
  cy.EditInputElement("TagNumber", faker.datatype.number(999999999));
  cy.EditInputElement("Description", faker.random.words(5));
  clickOnAddItem();
  cy.selectRepairCenter();
  cy.clickSaveAndCheckResponse();

  cy.wait(1000);
  cy.contains("a", "Identity").click();
  cy.clickDeleteAndCheckResponse();
});
