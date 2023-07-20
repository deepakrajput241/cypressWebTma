import { faker } from "@faker-js/faker";

it("Edit CP Construction Type Data", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/Lookup/CPConstructionType/Create");
  cy.EditInputElement("Code", faker.datatype.number(999999));
  cy.EditInputElement("Description", faker.random.words(2));
  cy.clickSaveAndCheckResponse();

  cy.get("span[ng-bind='WindowTitle']:contains('Construction Types')").should(
    "be.visible"
  );
  cy.wait(500);
  cy.getButton("Edit").click();
  cy.EditInputElement("Code", faker.datatype.number(999999));
  cy.EditInputElement("Description", faker.random.words(2));
  cy.clickSaveAfterEditAndCheckResponse();
});
