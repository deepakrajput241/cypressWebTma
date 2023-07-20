import { faker } from "@faker-js/faker";

describe("Copy And Edit CPPM Budget Categories", () => {
  let categoryId;

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
  });

  it("Search and Copy CPPM Budget Categories Data", () => {
    cy.visit("/#!/Lookup/CJBudgetCategory");

    cy.wait(500);
    cy.getButton("Copy").click();
    cy.EditInputElement("Code", faker.datatype.number(99999999));
    cy.EditInputElement("Description", faker.random.words(2));
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "/CJBudgetCategory/Create?copyId=?*",
      200
    ).then((id) => {
      categoryId = id;
    });
  });

  it("Edit CPPM Budget Categories", () => {
    cy.visit(`/#!/Lookup/CJBudgetCategory/${categoryId}`);
    cy.get(
      "span[ng-bind='WindowTitle']:contains('CPPM Budget Categories')"
    ).should("be.visible");
    cy.wait(1000);
    cy.contains("a", "Identity").click();
    cy.getButton("Edit").click();
    cy.EditInputElement("Code", faker.datatype.number(99999999));
    cy.EditInputElement("Description", faker.random.words(2));
    cy.clickSaveAfterEditAndCheckResponse();
  });
});
