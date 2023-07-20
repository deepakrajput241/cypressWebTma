import { faker } from "@faker-js/faker";

it("Validate Part Inventory Tab details", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/Warehouse/1953/PartInventory");

  cy.contains("Part Inventory").click();
  cy.getButton("Edit").click();
  cy.get("input[ng-model='dataItem.MinimumLevel']")
    .wait(500)
    .clear()
    .type(faker.datatype.number({ min: 1, max: 5 }));
  cy.get("input[ng-model='dataItem.MaximumLevel']")
    .wait(500)
    .clear()
    .type(faker.datatype.number({ min: 51, max: 100 }));
  cy.getButton("Save").click();
});
