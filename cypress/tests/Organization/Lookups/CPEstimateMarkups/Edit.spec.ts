import { faker } from "@faker-js/faker";

it("Edit CP Estimate Markup record", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/Lookup/CPEstimateMarkup/Create");
  cy.EditInputElement("Code", faker.datatype.number(9999999));
  cy.EditInputElement("Description", faker.random.words(2));
  cy.fillNumericTextBox(0, faker.datatype.number(100));
  cy.clickSaveAndCheckResponse();

  cy.get("span[ng-bind='WindowTitle']:contains('Estimate Markups')").should(
    "be.visible"
  );
  cy.wait(500);
  cy.getButton("Edit").click();
  cy.EditInputElement("Code", faker.datatype.number(9999999));
  cy.EditInputElement("Description", faker.random.words(2));
  cy.clickSaveAfterEditAndCheckResponse();
});
