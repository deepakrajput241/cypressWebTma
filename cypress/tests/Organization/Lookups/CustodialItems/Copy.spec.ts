import { faker } from "@faker-js/faker";

describe("Copy And Edit Custodial Item record", () => {
  let ID;

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
  });

  it("Copy Custodial Item record", () => {
    cy.visit("/#!/Lookup/CDItem");

    cy.getButton("Copy").click();
    cy.EditInputElement("Description", faker.random.words(5));
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "/CDItem/Create?copyId=?*",
      200
    ).then((id) => {
      ID = id;
    });
  });

  it("Edit Custodial Item record", () => {
    cy.visit(`/#!/Lookup/CDItem/${ID}`);
    cy.get("span[ng-bind='WindowTitle']:contains('Custodial Items')").should(
      "be.visible"
    );
    cy.wait(500);
    cy.contains("a", "Identity").click();
    cy.getButton("Edit").click();
    cy.EditInputElement("Description", faker.random.words(5));
    cy.clickSaveAfterEditAndCheckResponse();
  });
});
