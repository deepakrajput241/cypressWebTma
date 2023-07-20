import { faker } from "@faker-js/faker";

const data = {
  user: "Automation",
  repairCenter: "Auto-01",
  department: "Auto-01",
};

it("Delete Group for User", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/UserGroup/Create/Identity");
  cy.EditInputElement("Name", faker.datatype.number(99999));
  cy.EditInputElement("Description", faker.random.words(4));
  cy.get("a[id='toolbarAddUser']").click();
  cy.get(".k-grid-content.k-auto-scrollable")
    .find("tr")
    .then((row) =>
      cy
        .xpath(
          `/html/body/pageslide[1]/div/div/div/div[2]/form/div/div/div/div[2]/table/tbody/tr[${Cypress._.random(
            2,
            row.length
          )}]/td[1]/input`
        )
        .click()
    );
  cy.getButtonWithText("Add Selected").click();
  cy.get("a[id='toolbarAddLdapGroup']").click();
  cy.EditInputElement("LdapGroupName", "Auto test");
  cy.getButtonWithText("Save").click();
  cy.selectRepairCenter();
  cy.clickSaveAndCheckResponse();

  cy.get("span[ng-bind='WindowTitle']:contains('Groups')").should("be.visible");
  cy.wait(1500);
  cy.contains("a", "Identity").click();
  cy.clickDeleteAndCheckResponse();
});
