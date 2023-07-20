import { faker } from "@faker-js/faker";

describe("Copy And Edit Key System record", () => {
  let ID;

  beforeEach(() => {
    cy.login(Cypress.env("user1"));
  });

  it("Copy Lock Shop", () => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/KeySystem/Create");
    cy.getButton("Copy").click();
    cy.EditInputElement("Code", faker.datatype.number(100));
    cy.EditInputElement("Description", faker.random.words(1));
    cy.clickAndCheckResponse(
      "Save",
      "POST",
      "/KeySystem/Create?copyId=?*",
      200
    ).then((id) => {
      ID = id;
    });
  });

  it("Edit LockShop", () => {
    cy.login(Cypress.env("user1"));
    cy.visit(`/#!/KeySystem/${ID}`);
    cy.get("span[ng-bind='WindowTitle']:contains('Key System')").should(
      "be.visible"
    );
    cy.wait(500);
    cy.contains("a", "Identity").click();
    cy.getButton("Edit").click();
    cy.EditInputElement("Code", faker.datatype.number(100));
    cy.EditInputElement("Description", faker.random.words(1));
    cy.clickSaveAfterEditAndCheckResponse();
  });
});
