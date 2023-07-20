import { faker } from "@faker-js/faker";

it("Delete Technician Records", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/Technician/Create");
  cy.EditInputElement("Code", faker.datatype.number(99999999));
  cy.EditInputElement("FirstName", faker.name.firstName());
  cy.EditInputElement("LastName", faker.name.lastName());
  cy.fillNumericTextBox(0, faker.datatype.number(1000));
  cy.openFlyoutAndSelectRandomValue("Shift");
  cy.get("#toolbarAddTrade").should("be.visible").click();
  cy.selectRandomCheckBoxFromGrid(
    3,
    "/html/body/pageslide[1]/div/div/div/div[2]/form/div/div/div/div[2]/table/tbody/tr[1]/td[1]/input"
  );
  cy.get(".k-button.ng-scope:nth-child(1)").click();
  cy.selectRepairCenter();
  cy.clickSaveAndCheckResponse();

  cy.wait(1000);
  cy.contains("a", "Identity").click();
  cy.clickDeleteAndCheckResponse();
});
