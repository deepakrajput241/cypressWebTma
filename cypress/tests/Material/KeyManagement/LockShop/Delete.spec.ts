import { faker } from "@faker-js/faker";

const data = { repairCenter: "Auto-01" };

it("Delete Lock Shop", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/LockShop/Create");
  cy.EditInputElement("Code", faker.datatype.number(9999999));
  cy.EditInputElement("Description", faker.random.words(2));
  cy.selectRepairCenter();
  cy.clickSaveAndCheckResponse();

  cy.wait(1000);
  cy.contains("a", "Identity").click();
  cy.clickDeleteAndCheckResponse();
});
