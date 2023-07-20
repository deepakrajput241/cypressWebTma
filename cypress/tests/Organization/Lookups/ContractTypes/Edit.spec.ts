import { faker } from "@faker-js/faker";

it("Create new Contract Type Data", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/Lookup/ContractType/Create");
  cy.EditInputElement("Code", faker.datatype.number(9999999));
  cy.EditInputElement("Description", faker.random.words(5));
  cy.clickSaveAndCheckResponse();

  cy.get("span[ng-bind='WindowTitle']:contains('Contract Types')").should(
    "be.visible"
  );
  cy.wait(500);
  cy.getButton("Edit").click();
  cy.EditInputElement("Code", faker.datatype.number(1000000));
  cy.EditInputElement("Description", faker.random.words(5));
  cy.clickSaveAfterEditAndCheckResponse();
});
